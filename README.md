# Trivia Astronómica 🌌 — Sociedad Astronómica de Guadalajara (SAG)

Aplicación web para eventos y stands interactivos de la **Sociedad Astronómica de Guadalajara**.

## Características Principales
- **Intento Único por Dispositivo (`localStorage`):** Evita que un participante vuelva a jugar inmediatamente para intentar ganar premios múltiples. Si el usuario reabre la página, se le muestra su intento registrado y su ticket de resultado.
- **Diseño Gala Cósmica:** Interfaz moderna con *Glassmorphism*, fondo animado de estrellas en `canvas 2D`, sombras fluorescentes y tipografías *Outfit* y *Plus Jakarta Sans*.
- **Efectos de Sonido Sintetizados:** Sonidos integrados con la *Web Audio API* para respuestas correctas, incorrectas y fanfarria de victoria (no requiere archivos `.mp3` adicionales).
- **Banco de 30 Preguntas:** Categorizadas en 3 niveles (*Básico*, *Intermedio* y *Avanzado*). Cada partida toma 1 pregunta aleatoria de cada categoría.
- **Ticket Digital VIP de Canje:** Genera un pase de validación con código único de registro (ej. `SAG-8F92-K4`), fecha/hora exacta y resumen de aciertos para validación directa en el stand sin necesidad de código QR.

---

## Cómo Ejecutar Localmente
1. Descarga e descomprime el archivo `.zip`.
2. Abre `index.html` directamente en cualquier navegador moderno (Chrome, Edge, Safari, Firefox).
3. **No requiere servidor local, Node.js ni bases de datos.**
---

## Uso en Stand / Eventos
- Los visitantes abren el enlace desde sus propios celulares o en una tablet del stand.
- Al completar la trivia, muestran su pantalla con el **Pase Digital de Validación**.
- El personal del stand verifica la puntuación y el código único para entregar el sticker o pin oficial.
