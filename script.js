const $ = id => document.getElementById(id);
let selected = [], index = 0, points = 0, responses = [], player = '';

function show(id) {
  for (const section of ['start', 'game', 'result']) {
    $(section).classList.toggle('hidden', section !== id);
  }
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function begin() {
  player = $('player').value.trim().slice(0, 35) || 'Explorador espacial';
  // Una pregunta básica, una intermedia y una avanzada; orden aleatorio.
  selected = shuffle(['Básico', 'Intermedio', 'Avanzado'].map(level =>
    shuffle(QUESTIONS.filter(question => question.level === level))[0]
  ));
  index = 0;
  points = 0;
  responses = [];
  show('game');
  render();
}

function render() {
  const q = selected[index];
  $('progress').textContent = `Pregunta ${index + 1} de 3 · ${q.level}`;
  $('score').textContent = `⭐ ${points} aciertos`;
  $('question').textContent = q.q;
  $('feedback').textContent = '';
  $('next').classList.add('hidden');
  $('choices').replaceChildren();
  shuffle(q.options.map((option, originalIndex) => ({ option, originalIndex }))).forEach(({ option, originalIndex }) => {
    const button = document.createElement('button');
    button.className = 'choice';
    button.textContent = option;
    button.onclick = () => answer(originalIndex);
    $('choices').append(button);
  });
}

function answer(choice) {
  const q = selected[index];
  const correct = choice === q.answer;
  if (correct) points++;
  responses.push({ question: q.q, chosen: q.options[choice], correct: q.options[q.answer], ok: correct });

  [...$('choices').children].forEach(button => {
    button.disabled = true;
    if (button.textContent === q.options[q.answer]) button.classList.add('correct');
    else if (button.textContent === q.options[choice]) button.classList.add('wrong');
  });

  $('score').textContent = `⭐ ${points} aciertos`;
  $('feedback').textContent = correct ? '¡Correcto! 🌟' : `La respuesta correcta es: ${q.options[q.answer]}`;
  $('next').textContent = index === 2 ? 'Ver resultado →' : 'Siguiente pregunta →';
  $('next').classList.remove('hidden');
}

function next() {
  if (index < 2) {
    index++;
    render();
  } else {
    finish();
  }
}

function finish() {
  show('result');
  const winner = points >= 2;
  $('result-title').textContent = winner ? `¡Felicidades, ${player}! 🎉` : `¡Buen intento, ${player}! 🌠`;
  $('final-score').textContent = `${points} / 3`;
  $('result-message').textContent = winner
    ? '¡Ganaste un pin o sticker! Muestra esta pantalla a los organizadores.'
    : 'Sigue explorando el universo. ¡Gracias por participar!';
  $('review').replaceChildren();
  responses.forEach((response, i) => {
    const item = document.createElement('p');
    item.className = 'review-item';
    item.textContent = `${i + 1}. ${response.ok ? '✅' : '❌'} ${response.question} — ${response.correct}`;
    $('review').append(item);
  });
}

$('begin').onclick = begin;
$('next').onclick = next;
$('restart').onclick = () => show('start');
