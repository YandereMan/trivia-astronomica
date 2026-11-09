// Elementos UI
const $ = id => document.getElementById(id);

// Claves para el almacenamiento local (intento único)
const STORAGE_COMPLETED_KEY = 'sag_trivia_completed_v2';
const STORAGE_USER_DATA_KEY = 'sag_trivia_user_data_v2';

// Estado global de la partida
let selectedQuestions = [];
let currentIndex = 0;
let points = 0;
let userResponses = [];
let playerName = '';

// Sistema de Audio Sintetizado (Web Audio API)
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playTone(freq, type, duration, delay = 0) {
  try {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + duration);
  } catch (e) {
    // Ignorar si el audio no está permitido por el navegador
  }
}

function playSound(type) {
  initAudio();
  if (type === 'click') {
    playTone(440, 'sine', 0.08);
  } else if (type === 'correct') {
    playTone(523.25, 'triangle', 0.1, 0);   // C5
    playTone(659.25, 'triangle', 0.1, 0.08); // E5
    playTone(783.99, 'triangle', 0.2, 0.16); // G5
  } else if (type === 'wrong') {
    playTone(220, 'sawtooth', 0.15, 0);
    playTone(180, 'sawtooth', 0.25, 0.12);
  } else if (type === 'win') {
    playTone(523.25, 'sine', 0.12, 0);
    playTone(659.25, 'sine', 0.12, 0.1);
    playTone(783.99, 'sine', 0.12, 0.2);
    playTone(1046.50, 'sine', 0.4, 0.3);
  }
}

// Fondo de Estrellas Animado
function initStarfield() {
  const canvas = $('starfield');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2,
    alpha: Math.random(),
    speed: 0.005 + Math.random() * 0.015
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(s => {
      s.alpha += s.speed;
      if (s.alpha > 1 || s.alpha < 0) s.speed = -s.speed;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(s.alpha)})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// Control de Pantallas
function showScreen(screenId) {
  ['start', 'blocked', 'game', 'result'].forEach(id => {
    const el = $(id);
    if (el) el.classList.toggle('hidden', id !== screenId);
  });
}

// Mezcla aleatoria de arreglos
function shuffle(arr) {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

// Verificación de Intento Único vía LocalStorage
function checkPriorAttempt() {
  const isCompleted = localStorage.getItem(STORAGE_COMPLETED_KEY) === 'true';
  if (isCompleted) {
    const rawData = localStorage.getItem(STORAGE_USER_DATA_KEY);
    if (rawData) {
      try {
        const data = JSON.parse(rawData);
        renderBlockedScreen(data);
        showScreen('blocked');
        return true;
      } catch (e) {
        // En caso de error de parseo
      }
    }
  }
  return false;
}

function renderBlockedScreen(data) {
  const blockedInfo = $('blocked-info');
  const winner = data.points >= 2;
  
  blockedInfo.innerHTML = `
    <div class="summary-box">
      <div class="summary-row">
        <span>Explorador(a):</span>
        <strong>${escapeHtml(data.player)}</strong>
      </div>
      <div class="summary-row">
        <span>Puntuación obtenida:</span>
        <strong class="${winner ? 'text-success' : ''}">${data.points} / 3 aciertos</strong>
      </div>
      <div class="summary-row">
        <span>Código de registro:</span>
        <code class="code-badge">${data.code}</code>
      </div>
      <div class="summary-row">
        <span>Estado del premio:</span>
        <strong>${winner ? '🏆 Elegible para premio' : '🌠 Participación completada'}</strong>
      </div>
    </div>
  `;

  $('view-saved-ticket').onclick = () => {
    playSound('click');
    renderResultScreenFromData(data);
    showScreen('result');
  };
}

// Iniciar Trivia
function beginGame(e) {
  if (e) e.preventDefault();
  
  if (checkPriorAttempt()) return;

  const nameInput = $('player').value.trim();
  playerName = nameInput.slice(0, 35) || 'Explorador Espacial';

  playSound('click');

  // Selección de 1 pregunta por cada nivel de dificultad (Básico, Intermedio, Avanzado)
  const basic = shuffle(QUESTIONS.filter(q => q.level === 'Básico'))[0];
  const inter = shuffle(QUESTIONS.filter(q => q.level === 'Intermedio'))[0];
  const advan = shuffle(QUESTIONS.filter(q => q.level === 'Avanzado'))[0];

  selectedQuestions = [basic, inter, advan];
  currentIndex = 0;
  points = 0;
  userResponses = [];

  showScreen('game');
  renderQuestion();
}

// Renderizar Pregunta Actual
function renderQuestion() {
  const q = selectedQuestions[currentIndex];

  // Actualizar topbar e indicadores
  $('level-text').textContent = q.level;
  $('level-badge').className = `level-indicator level-${q.level.toLowerCase()}`;
  $('score').textContent = `${points} / 3`;
  $('question-number').textContent = `Pregunta ${currentIndex + 1} de 3`;
  $('progress-bar').style.width = `${((currentIndex + 1) / 3) * 100}%`;

  // Texto de la pregunta
  $('question').textContent = q.q;

  // Limpiar retroalimentación y botón siguiente
  const feedback = $('feedback');
  feedback.className = 'feedback-banner hidden';
  feedback.textContent = '';
  $('next').classList.add('hidden');

  // Opciones de respuesta
  const choicesContainer = $('choices');
  choicesContainer.replaceChildren();

  const shuffledOptions = shuffle(q.options.map((opt, idx) => ({ opt, originalIdx: idx })));

  shuffledOptions.forEach(({ opt, originalIdx }) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.type = 'button';
    btn.innerHTML = `<span class="choice-text">${escapeHtml(opt)}</span>`;
    btn.onclick = () => selectAnswer(originalIdx, btn);
    choicesContainer.appendChild(btn);
  });
}

// Procesar Selección de Respuesta
function selectAnswer(chosenIndex, selectedBtn) {
  const q = selectedQuestions[currentIndex];
  const isCorrect = chosenIndex === q.answer;

  if (isCorrect) {
    points++;
    playSound('correct');
  } else {
    playSound('wrong');
  }

  // Registrar respuesta
  userResponses.push({
    question: q.q,
    chosen: q.options[chosenIndex],
    correct: q.options[q.answer],
    isCorrect: isCorrect,
    level: q.level
  });

  // Deshabilitar todos los botones de respuesta
  const allBtns = $('choices').children;
  Array.from(allBtns).forEach(btn => {
    btn.disabled = true;
    const btnText = btn.querySelector('.choice-text').textContent;

    if (btnText === q.options[q.answer]) {
      btn.classList.add('correct');
    } else if (btn === selectedBtn && !isCorrect) {
      btn.classList.add('wrong');
    }
  });

  // Actualizar Puntuación en pantalla
  $('score').textContent = `${points} / 3`;

  // Mostrar Banner de Feedback
  const feedback = $('feedback');
  feedback.classList.remove('hidden');
  if (isCorrect) {
    feedback.className = 'feedback-banner success';
    feedback.innerHTML = `<span>✨ ¡Excelente! Respuesta correcta.</span>`;
  } else {
    feedback.className = 'feedback-banner error';
    feedback.innerHTML = `<span>❌ Incorrecto. La respuesta correcta es: <strong>${escapeHtml(q.options[q.answer])}</strong></span>`;
  }

  // Configurar botón siguiente
  const nextBtn = $('next');
  $('next-text').textContent = currentIndex === 2 ? 'Ver Pase de Resultados' : 'Siguiente Pregunta';
  nextBtn.classList.remove('hidden');
}

// Avanzar o Finalizar
function handleNext() {
  playSound('click');
  if (currentIndex < 2) {
    currentIndex++;
    renderQuestion();
  } else {
    finishGame();
  }
}

// Generar Código Único de Ticket
function generateTicketCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'SAG-';
  for (let i = 0; i < 6; i++) {
    if (i === 3) code += '-';
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Finalizar Trivia y Guardar Resultado en LocalStorage
function finishGame() {
  const winner = points >= 2;
  if (winner) playSound('win');

  const now = new Date();
  const dateFormatted = now.toLocaleDateString('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const code = generateTicketCode();

  const gameData = {
    player: playerName,
    points: points,
    total: 3,
    winner: winner,
    code: code,
    date: dateFormatted,
    responses: userResponses
  };

  // MARCAR COMO COMPLETADO E IMPEDIR MÁS INTENTOS
  try {
    localStorage.setItem(STORAGE_COMPLETED_KEY, 'true');
    localStorage.setItem(STORAGE_USER_DATA_KEY, JSON.stringify(gameData));
  } catch (e) {
    console.warn('No se pudo guardar en localStorage', e);
  }

  renderResultScreenFromData(gameData);
  showScreen('result');
}

// Renderizar Pantalla de Resultados a partir de Datos
function renderResultScreenFromData(data) {
  const winner = data.winner;

  // Cabecera de resultados
  const badgeStatus = $('badge-status');
  if (winner) {
    badgeStatus.className = 'badge-status winner';
    badgeStatus.textContent = '🏆 ¡GANADOR(A) DE PREMIO!';
    $('result-title').textContent = `¡Felicidades, ${data.player}! 🎉`;
    $('result-subtitle').textContent = 'Has demostrado amplios conocimientos astronómicos.';
  } else {
    badgeStatus.className = 'badge-status participant';
    badgeStatus.textContent = '🌠 ¡GRACIAS POR PARTICIPAR!';
    $('result-title').textContent = `¡Buen intento, ${data.player}!`;
    $('result-subtitle').textContent = 'Sigue explorando las maravillas de nuestro universo.';
  }

  // Datos del Ticket
  $('ticket-player').textContent = data.player;
  $('ticket-score').textContent = `${data.points} / ${data.total}`;
  
  let rank = 'Cadete Espacial';
  if (data.points === 3) rank = 'Navegante Cósmico 🌟';
  else if (data.points === 2) rank = 'Explorador Estelar 🚀';
  $('ticket-rank').textContent = rank;

  $('ticket-code').textContent = data.code;
  $('ticket-date').textContent = data.date;

  const ticketTag = $('ticket-tag');
  if (winner) {
    ticketTag.className = 'ticket-badge-tag valid';
    ticketTag.textContent = 'PREMIO AUTORIZADO';
  } else {
    ticketTag.className = 'ticket-badge-tag normal';
    ticketTag.textContent = 'PARTICIPACIÓN REGISTRADA';
  }

  // Resumen de Preguntas
  const reviewContainer = $('review');
  reviewContainer.replaceChildren();

  data.responses.forEach((resp, idx) => {
    const item = document.createElement('div');
    item.className = `review-item ${resp.isCorrect ? 'correct' : 'wrong'}`;
    item.innerHTML = `
      <div class="review-status">${resp.isCorrect ? '✅' : '❌'}</div>
      <div class="review-details">
        <div class="review-q">${idx + 1}. [${resp.level}] ${escapeHtml(resp.question)}</div>
        <div class="review-ans">Tu respuesta: <strong>${escapeHtml(resp.chosen)}</strong></div>
        ${!resp.isCorrect ? `<div class="review-correct">Correcta: <strong>${escapeHtml(resp.correct)}</strong></div>` : ''}
      </div>
    `;
    reviewContainer.appendChild(item);
  });
}

// Utilidad para prevenir XSS
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Inicialización de Eventos al Cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  initStarfield();

  // Verificar si ya se jugó antes
  const hasPlayed = checkPriorAttempt();

  if (!hasPlayed) {
    showScreen('start');
  }

  // Formulario de inicio
  const form = $('start-form');
  if (form) {
    form.addEventListener('submit', beginGame);
  }

  // Evento botón siguiente
  const nextBtn = $('next');
  if (nextBtn) {
    nextBtn.addEventListener('click', handleNext);
  }
});
