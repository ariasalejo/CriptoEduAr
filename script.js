// API de CoinGecko para obtener precios de criptomonedas
const API_URL = "https://api.coingecko.com/api/v3";

// Alternar entre modo claro y oscuro
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Cargar el tema desde localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Obtener el precio actual de la criptomoneda seleccionada
async function fetchPrice(crypto, currency) {
    try {
        const response = await fetch(`${API_URL}/simple/price?ids=${crypto}&vs_currencies=${currency}`);
        const data = await response.json();
        return data[crypto][currency];
    } catch (error) {
        console.error('Error al obtener el precio:', error);
        return null;
    }
}

// Función para mostrar el resultado de la calculadora
async function calculatePrice(event) {
    event.preventDefault();
    const crypto = document.getElementById('crypto').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const currency = document.getElementById('currency').value;

    if (!amount || amount <= 0) {
        alert('Por favor, ingresa una cantidad válida.');
        return;
    }

    const price = await fetchPrice(crypto, currency);
    if (price) {
        const total = (price * amount).toFixed(2);
        document.getElementById('result').innerText = `El valor de ${amount} ${crypto.toUpperCase()} es ${total} ${currency.toUpperCase()}.`;
    } else {
        document.getElementById('result').innerText = 'Error al obtener el precio. Inténtalo de nuevo.';
    }
}

// Evento para calcular el precio al enviar el formulario
document.getElementById('crypto-calculator').addEventListener('submit', calculatePrice);

// Función para obtener noticias cripto
async function fetchCryptoNews() {
    try {
        const response = await fetch('https://newsdata.io/api/1/news?apikey=YOUR_API_KEY&q=crypto');
        const data = await response.json();
        const newsList = document.getElementById('news-list');

        data.results.slice(0, 5).forEach(news => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${news.link}" target="_blank">${news.title}</a>`;
            newsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al obtener noticias:', error);
    }
}

// Función para crear gráfico de precios con Chart.js
async function createPriceChart(crypto) {
    try {
        const response = await fetch(`${API_URL}/coins/${crypto}/market_chart?vs_currency=usd&days=7`);
        const data = await response.json();

        const prices = data.prices.map(entry => entry[1]);
        const dates = data.prices.map(entry => new Date(entry[0]).toLocaleDateString());

        const ctx = document.getElementById('priceChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: `Precio de ${crypto.toUpperCase()} (USD)`,
                    data: prices,
                    borderColor: '#8e44ad',
                    backgroundColor: 'rgba(142, 68, 173, 0.2)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true },
                    tooltip: { enabled: true }
                }
            }
        });
    } catch (error) {
        console.error('Error al cargar el gráfico:', error);
    }
}

// Alerta de precio
document.getElementById('set-alert').addEventListener('click', () => {
    const alertPrice = parseFloat(document.getElementById('price-alert').value);
    if (isNaN(alertPrice) || alertPrice <= 0) {
        alert('Ingresa un precio válido para la alerta.');
        return;
    }
    alert(`Alerta de precio establecida en $${alertPrice}`);
});

// Carga inicial de datos al cargar la página
window.onload = () => {
    createPriceChart('bitcoin');
    fetchCryptoNews();
};
