// Carrusel
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    const offset = -currentSlide * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

// Información de criptomonedas
async function mostrarInfo(coin) {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
    const data = await response.json();
    const price = data[coin].usd;
    document.getElementById('crypto-info').innerHTML = `
        <h2>Información de ${coin.toUpperCase()}</h2>
        <p>Precio actual: $${price} USD</p>
    `;
}
const API_URL = "https://api.coingecko.com/api/v3";
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=criptomonedas&language=es&apiKey=45b326355e6646eb91a52c48776d369b`;



