const API_URL = "https://api.coingecko.com/api/v3";
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=criptomonedas&language=es&apiKey=45b326355e6646eb91a52c48776d369b`;

const ctx = document.getElementById('cryptoChart').getContext('2d');
let cryptoChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Precio en USD',
            data: [],
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    }
});

async function mostrarInfo(crypto) {
    const response = await fetch(`${API_URL}/coins/${crypto}`);
    const data = await response.json();
    document.getElementById('crypto-info').innerHTML = `
        <h3>${data.name}</h3>
        <p>Precio actual: $${data.market_data.current_price.usd} USD</p>
        <p>Capitalización de mercado: $${data.market_data.market_cap.usd} USD</p>
        <p>${data.description.en.substring(0, 300)}...</p>
    `;
    actualizarGrafico(crypto);
}

async function actualizarGrafico(crypto) {
    const response = await fetch(`${API_URL}/coins/${crypto}/market_chart?vs_currency=usd&days=7`);
    const data = await response.json();
    const prices = data.prices.map(entry => entry[1]);
    const dates = data.prices.map(entry => new Date(entry[0]).toLocaleDateString());

    cryptoChart.data.labels = dates;
    cryptoChart.data.datasets[0].data = prices;
    cryptoChart.update();
}

async function cargarNoticias() {
    const response = await fetch(NEWS_API_URL);
    const data = await response.json();
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '';

    data.articles.forEach(article => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
        newsList.appendChild(li);
    });
}

window.onload = cargarNoticias;
