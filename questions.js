// Cada pregunta tiene cuatro opciones y el índice (0-3) de la respuesta correcta.
const QUESTIONS = [
{q:'¿Cuál es el planeta más grande del sistema solar?',options:['Saturno','Júpiter','Neptuno','Urano'],answer:1},
{q:'¿Qué estrella está más cerca de la Tierra, aparte del Sol?',options:['Sirio','Betelgeuse','Próxima Centauri','Vega'],answer:2},
{q:'¿En qué galaxia se encuentra el sistema solar?',options:['Andrómeda','Vía Láctea','Triángulo','Sombrero'],answer:1},
{q:'¿Qué planeta es conocido como el planeta rojo?',options:['Venus','Marte','Mercurio','Júpiter'],answer:1},
{q:'¿Qué instrumento se utiliza para observar objetos astronómicos lejanos?',options:['Microscopio','Sismógrafo','Telescopio','Barómetro'],answer:2},
{q:'¿Cuál es el satélite natural de la Tierra?',options:['Europa','Titán','La Luna','Fobos'],answer:2},
{q:'¿Qué planeta es famoso por sus anillos más visibles?',options:['Saturno','Marte','Venus','Mercurio'],answer:0},
{q:'¿Qué es una constelación?',options:['Un planeta en formación','Un patrón aparente de estrellas en el cielo','Un tipo de galaxia','Una luna helada'],answer:1},
{q:'¿Qué causa principalmente las estaciones del año en la Tierra?',options:['La distancia al Sol','La inclinación del eje terrestre','Las fases lunares','Las mareas'],answer:1},
{q:'¿Qué astro se encuentra en el centro de nuestro sistema solar?',options:['La Tierra','Júpiter','El Sol','La Luna'],answer:2},
{q:'¿Qué es un año luz?',options:['Una unidad de tiempo','Una unidad de distancia','La edad de una estrella','Un tipo de órbita'],answer:1},
{q:'¿Cuál es el planeta más cercano al Sol?',options:['Venus','Tierra','Mercurio','Marte'],answer:2},
{q:'¿Qué planeta tiene la Gran Mancha Roja?',options:['Júpiter','Neptuno','Saturno','Urano'],answer:0},
{q:'¿Cómo se llama nuestra galaxia vecina grande más conocida?',options:['Andrómeda','Sombrero','Remolino','Centauro A'],answer:0},
{q:'¿Qué fenómeno ocurre cuando la Luna se interpone entre el Sol y la Tierra?',options:['Eclipse lunar','Eclipse solar','Solsticio','Equinoccio'],answer:1},
{q:'¿Cuál fue el primer ser humano en viajar al espacio?',options:['Neil Armstrong','Valentina Tereshkova','Yuri Gagarin','Buzz Aldrin'],answer:2},
{q:'¿Cuál fue el primer ser humano en pisar la Luna?',options:['Yuri Gagarin','Neil Armstrong','Alan Shepard','Michael Collins'],answer:1},
{q:'¿Qué planeta rota casi de lado respecto a su órbita?',options:['Urano','Mercurio','Marte','Venus'],answer:0},
{q:'¿Qué tipo de objeto es el Sol?',options:['Planeta','Estrella','Galaxia','Cometa'],answer:1},
{q:'¿Qué es una supernova?',options:['Un satélite','Una explosión estelar','Un planeta pequeño','Una lluvia de meteoros'],answer:1},
{q:'¿Qué nombre recibe un fragmento espacial que llega al suelo terrestre?',options:['Meteoro','Meteorito','Cometa','Asteroide'],answer:1},
{q:'¿Qué mantiene a los planetas en órbita alrededor del Sol?',options:['El magnetismo terrestre','La gravedad','El viento solar solamente','La luz'],answer:1},
{q:'¿Cuál es la luna más grande de Saturno?',options:['Europa','Ganímedes','Titán','Ío'],answer:2},
{q:'¿Qué telescopio espacial fue lanzado en 1990?',options:['James Webb','Hubble','Kepler','Gaia'],answer:1},
{q:'¿Cuál es el planeta más caliente en promedio?',options:['Mercurio','Venus','Marte','Júpiter'],answer:1},
{q:'¿Qué describe la teoría del Big Bang?',options:['El origen de la Luna','La evolución temprana del universo desde un estado caliente y denso','La formación exclusiva del Sol','La explosión de una estrella'],answer:1},
{q:'¿Qué es el horizonte de sucesos de un agujero negro?',options:['Una superficie sólida','El límite más allá del cual no puede escapar la luz','Una estrella cercana','Una órbita de la Luna'],answer:1},
{q:'¿Qué es el corrimiento al rojo cosmológico?',options:['El cambio de color de Marte','El aumento de longitud de onda de luz debido a la expansión del universo','Una aurora roja','Un eclipse'],answer:1},
{q:'¿Qué luna de Júpiter tiene intensa actividad volcánica?',options:['Ío','Europa','Calisto','Ganímedes'],answer:0},
{q:'¿Qué misión llevó por primera vez humanos a la superficie lunar?',options:['Apolo 8','Apolo 11','Apolo 13','Voyager 1'],answer:1}
];

// Clasificación para que cada partida incluya una pregunta de cada nivel.
QUESTIONS.forEach((question, index) => {
  question.level = index < 10 ? 'Básico' : index < 20 ? 'Intermedio' : 'Avanzado';
});
