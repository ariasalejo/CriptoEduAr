// Función para mostrar información de criptomonedas
async function mostrarInfo(coin) {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true`);
    const data = await response.json();
    const price = data[coin].usd;
    const marketCap = data[coin].usd_market_cap;

    let description = "";
    switch (coin) {
        case "bitcoin":
            description = "Bitcoin es la primera criptomoneda descentralizada, creada en 2009 por Satoshi Nakamoto.";
            break;
        case "ethereum":
            description = "Ethereum es una plataforma blockchain que permite la creación de contratos inteligentes y aplicaciones descentralizadas.";
            break;
        case "binancecoin":
            description = "Binance Coin es la criptomoneda de la plataforma Binance, utilizada para pagar tarifas de transacción y participar en ventas de tokens.";
            break;
        case "cardano":
            description = "Cardano es una plataforma blockchain que busca ofrecer seguridad y escalabilidad a través de un enfoque científico.";
            break;
        case "solana":
            description = "Solana es una blockchain de alto rendimiento diseñada para aplicaciones descentralizadas y finanzas descentralizadas (DeFi).";
            break;
        default:
            description = "Información no disponible.";
    }

    document.getElementById('crypto-info').innerHTML = `
        <h2>Información de ${coin.toUpperCase()}</h2>
        <p>Precio actual: $${price} USD</p>
        <p>Capitalización de mercado: $${marketCap.toLocaleString()} USD</p>
        <p>${description}</p>
    `;
}

// Cargar noticias desde NewsAPI
async function cargarNoticias() {
    const apiKey = "45b326355e6646eb91a52c48776d369b"
    const url = `https://newsapi.org/v2/everything?q=criptomonedas&language=es&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const newsList = document.getElementById('news-list');

        if (data.articles && data.articles.length > 0) {
            newsList.innerHTML = data.articles.slice(0, 5).map(article => `
                <li>
                    <a href="${article.url}" target="_blank">${article.title}</a>
                    <p>${article.description}</p>
                </li>
            `).join('');
        } else {
            newsList.innerHTML = "<li>No se encontraron noticias.</li>";
        }
    } catch (error) {
        console.error("Error al cargar noticias:", error);
        document.getElementById('news-list').innerHTML = "<li>Error al cargar noticias.</li>";
    }
}

// Gráfico de precios
function inicializarGrafico() {
    const ctx = document.getElementById('cryptoChart').getContext('2d');
    const cryptoChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Precio de Bitcoin',
                data: [ 60000, 70000, 80000, 85000, 90000, 95000, 100000,
                borderColor: '#007BFF',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarNoticias();
    inicializarGrafico();
});