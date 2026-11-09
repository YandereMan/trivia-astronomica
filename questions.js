// Banco de preguntas clasificadas por dificultad (10 Básicas, 10 Intermedias, 10 Avanzadas)
const QUESTIONS = [
  // --- Nivel Básico ---
  { q: '¿Cuál es el planeta más grande del sistema solar?', options: ['Saturno', 'Júpiter', 'Neptuno', 'Urano'], answer: 1 },
  { q: '¿Qué planeta es conocido comúnmente como el "Planeta Rojo"?', options: ['Venus', 'Marte', 'Mercurio', 'Júpiter'], answer: 1 },
  { q: '¿Cuál es la estrella más cercana a la Tierra?', options: ['Próxima Centauri', 'Sirio', 'El Sol', 'Alfa Centauri'], answer: 2 },
  { q: '¿En qué galaxia se encuentra ubicado nuestro sistema solar?', options: ['Andrómeda', 'Vía Láctea', 'Triángulo', 'Sombrero'], answer: 1 },
  { q: '¿Cuál es el satélite natural de la Tierra?', options: ['Europa', 'Titán', 'La Luna', 'Fobos'], answer: 2 },
  { q: '¿Qué planeta es famoso por su vistoso sistema de anillos brillantes?', options: ['Saturno', 'Marte', 'Venus', 'Mercurio'], answer: 0 },
  { q: '¿Qué instrumento astronómico se utiliza para observar objetos lejanos?', options: ['Microscopio', 'Sismógrafo', 'Telescopio', 'Barómetro'], answer: 2 },
  { q: '¿Qué astro ocupa el centro del sistema solar?', options: ['La Tierra', 'Júpiter', 'El Sol', 'La Luna'], answer: 2 },
  { q: '¿Cuál es el planeta más cercano al Sol?', options: ['Venus', 'Tierra', 'Mercurio', 'Marte'], answer: 2 },
  { q: '¿Qué tipo de cuerpo celeste es el Sol?', options: ['Planeta gigante', 'Estrella', 'Galaxia', 'Cometa'], answer: 1 },

  // --- Nivel Intermedio ---
  { q: '¿Qué estrella está más cerca del sistema solar, aparte del Sol?', options: ['Sirio', 'Betelgeuse', 'Próxima Centauri', 'Vega'], answer: 2 },
  { q: '¿Qué causa principalmente las estaciones del año en la Tierra?', options: ['La distancia variable al Sol', 'La inclinación del eje terrestre', 'Las fases de la Luna', 'El magnetismo solar'], answer: 1 },
  { q: '¿Qué es un año luz en física y astronomía?', options: ['Una medida de tiempo astronómico', 'Una unidad de distancia que recorre la luz en un año', 'La duración de la vida estelar', 'La velocidad de la Tierra'], answer: 1 },
  { q: '¿Qué planeta posee una tormenta gigante conocida como la Gran Mancha Roja?', options: ['Júpiter', 'Neptuno', 'Saturno', 'Urano'], answer: 0 },
  { q: '¿Qué fenómeno ocurre cuando la Luna se posiciona entre el Sol y la Tierra?', options: ['Eclipse lunar', 'Eclipse solar', 'Solsticio de verano', 'Equinoccio'], answer: 1 },
  { q: '¿Quién fue el primer ser humano en viajar al espacio exterior?', options: ['Neil Armstrong', 'Valentina Tereshkova', 'Yuri Gagarin', 'Buzz Aldrin'], answer: 2 },
  { q: '¿Quién fue el primer ser humano en caminar sobre la superficie lunar?', options: ['Yuri Gagarin', 'Neil Armstrong', 'Alan Shepard', 'Michael Collins'], answer: 1 },
  { q: '¿Qué planeta orbita sobre su eje con una inclinación extrema de casi 98°?', options: ['Urano', 'Mercurio', 'Marte', 'Venus'], answer: 0 },
  { q: '¿Qué es una supernova?', options: ['Un satélite helado', 'La explosión catastrófica de una estrella', 'Un planeta enano', 'Una lluvia de meteoros'], answer: 1 },
  { q: '¿Qué nombre recibe un fragmento de roca espacial que impacta la superficie terrestre?', options: ['Meteoro', 'Meteorito', 'Cometa', 'Asteroide'], answer: 1 },

  // --- Nivel Avanzado ---
  { q: '¿Qué mantiene a los planetas atrapados en sus órbitas alrededor del Sol?', options: ['La fuerza magnética', 'La curvatura espacio-temporal de la gravedad', 'El viento solar', 'La energía oscura'], answer: 1 },
  { q: '¿Cuál es la luna más grande del planeta Saturno?', options: ['Europa', 'Ganímedes', 'Titán', 'Ío'], answer: 2 },
  { q: '¿Qué legendario telescopio espacial fue puesto en órbita en el año 1990?', options: ['James Webb', 'Hubble', 'Kepler', 'Gaia'], answer: 1 },
  { q: '¿Cuál es el planeta con la temperatura promedio más alta del sistema solar?', options: ['Mercurio', 'Venus', 'Marte', 'Júpiter'], answer: 1 },
  { q: '¿Qué describe primordialmente la teoría del Big Bang?', options: ['La formación de la Luna', 'La evolución del universo desde un estado primitivo denso y caliente', 'La muerte final del Sol', 'El nacimiento de la galaxia Andrómeda'], answer: 1 },
  { q: '¿Qué define el "horizonte de sucesos" de un agujero negro?', options: ['Una capa de materia sólida', 'El límite de no retorno de donde ni la luz puede escapar', 'La órbita de sus estrellas vecinas', 'Un disco de gas brillante'], answer: 1 },
  { q: '¿En qué consiste el "corrimiento al rojo" cosmológico?', options: ['En el color característico de Marte', 'En el estiramiento de la longitud de onda debido a la expansión del universo', 'En las auroras boreales', 'En los eclipses lunares'], answer: 1 },
  { q: '¿Qué luna joviana es el cuerpo con mayor actividad volcánica activa del sistema solar?', options: ['Ío', 'Europa', 'Calisto', 'Ganímedes'], answer: 0 },
  { q: '¿Qué histórica misión de la NASA logró el primer alunizaje humano en 1969?', options: ['Apolo 8', 'Apolo 11', 'Apolo 13', 'Voyager 1'], answer: 1 },
  { q: '¿Cómo se llama nuestra galaxia espiral gigante más cercana?', options: ['Andrómeda', 'Sombrero', 'Triángulo', 'Centauro A'], answer: 0 }
];

// Asignar el nivel correspondiente según el índice de la pregunta
QUESTIONS.forEach((q, idx) => {
  q.level = idx < 10 ? 'Básico' : idx < 20 ? 'Intermedio' : 'Avanzado';
});
