// Efecto de brillo al hacer clic en secciones neon
document.querySelectorAll('.neon-box').forEach(section => {
  section.addEventListener('click', () => {
    section.classList.add('active-glow');
    setTimeout(() => section.classList.remove('active-glow'), 400);
  });
});

// Botón rojo "Comenzar Ahora" - redirecciona
const btnRojo = document.querySelector('.btn-rojo');
if (btnRojo) {
  btnRojo.addEventListener('click', () => {
    window.open('https://youtube.com/@criptoeduar?si=ZWQsuHjPXS3TzgMV', '_blank');
  });
}

// Scroll suave para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      destino.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
