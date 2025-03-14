// Modo Oscuro
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Información oculta e impactante
const cryptoInfo = {
    bitcoin: {
        name: "Bitcoin (BTC)",
        details: `
            <strong>Bitcoin (BTC)</strong><br>
            - <em>Origen:</em> Creado en 2009 por Satoshi Nakamoto, cuya identidad sigue siendo un misterio.<br>
            - <em>Caso de uso:</em> Primera criptomoneda descentralizada, diseñada como dinero digital resistente a la censura.<br>
            - <em>Curiosidad:</em> Solo existirán 21 millones de bitcoins, lo que lo hace escaso y valioso.<br>
            - <em>Impacto:</em> En 2010, alguien compró 2 pizzas con 10,000 BTC, valoradas hoy en más de $200 millones.<br>
        `,
    },
    ethereum: {
        name: "Ethereum (ETH)",
        details: `
            <strong>Ethereum (ETH)</strong><br>
            - <em>Origen:</em> Lanzado en 2015 por Vitalik Buterin, un programador prodigio.<br>
            - <em>Caso de uso:</em> Plataforma para contratos inteligentes y aplicaciones descentralizadas (dApps).<br>
            - <em>Curiosidad:</em> Ethereum introdujo el concepto de "gas", que es el costo computacional para ejecutar transacciones.<br>
            - <em>Impacto:</em> La red Ethereum ha sido fundamental para el auge de las NFTs y DeFi.<br>
        `,
    },
    binancecoin: {
        name: "Binance Coin (BNB)",
        details: `
            <strong>Binance Coin (BNB)</strong><br>
            - <em>Origen:</em> Creado en 2017 por Binance, uno de los exchanges más grandes del mundo.<br>
            - <em>Caso de uso:</em> Se utiliza para reducir tarifas en el exchange de Binance y participar en lanzamientos de tokens.<br>
            - <em>Curiosidad:</em> Originalmente basado en Ethereum, pero migró a su propia blockchain llamada Binance Smart Chain.<br>
            - <em>Impacto:</em> Binance quema periódicamente BNB, reduciendo su suministro total y aumentando su valor.<br>
        `,
    },
    cardano: {
        name: "Cardano (ADA)",
        details: `
            <strong>Cardano (ADA)</strong><br>
            - <em>Origen:</em> Desarrollado por Charles Hoskinson, cofundador de Ethereum.<br>
            - <em>Caso de uso:</em> Blockchain centrado en la sostenibilidad, escalabilidad y seguridad.<br>
            - <em>Curiosidad:</em> Es la primera blockchain construida con un enfoque científico basado en investigación académica.<br>
            - <em>Impacto:</em> Cardano se enfoca en soluciones reales, como proyectos de identidad digital en África.<br>
        `,
    },
    solana: {
        name: "Solana (SOL)",
        details: `
            <strong>Solana (SOL)</strong><br>
            - <em>Origen:</em> Fundado en 2017 por Anatoly Yakovenko, exingeniero de Qualcomm.<br>
            - <em>Caso de uso:</em> Blockchain de alta velocidad diseñado para aplicaciones descentralizadas.<br>
            - <em>Curiosidad:</em> Utiliza un mecanismo único llamado "Proof of History" para mejorar la eficiencia.<br>
            - <em>Impacto:</em> Solana ha sido criticado por problemas de centralización, pero sigue siendo popular en DeFi y NFTs.<br>
        `,
    },
};

// Mostrar información de la criptomoneda seleccionada
async function loadCryptoInfo(crypto) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}`);
        const data = await response.json();

        const generalDetails = `
            <strong>${data.name} (${data.symbol.toUpperCase()})</strong><br>
            Precio actual: $${data.market_data.current_price.usd.toFixed(2)} USD<br>
            Capitalización de mercado: $${data.market_data.market_cap.usd.toLocaleString()} USD<br>
            Cambio en 24h: ${data.market_data.price_change_percentage_24h.toFixed(2)}%<br>
        `;

        const hiddenDetails = cryptoInfo[crypto]?.details || "No hay información adicional disponible.";
        return generalDetails + hiddenDetails;
    } catch (error) {
        console.error('Error al cargar datos de la criptomoneda:', error);
        return 'Ocurrió un error al cargar la información.';
    }
}

document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();
        const crypto = e.target.getAttribute('data-crypto');
        const info = await loadCryptoInfo(crypto);
        document.getElementById('crypto-details').innerHTML = info;
    });
});

// Gráfico de Precios
async function createPriceChart(crypto = 'bitcoin') {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=7`);
        const data = await response.json();
        const prices = data.prices.map(price => price[1]);
        const dates = data.prices.map(price => new Date(price[0]).toLocaleDateString());

        const ctx = document.getElementById('cryptoChart').getContext('2d');
        if (window.cryptoChart) window.cryptoChart.destroy(); // Limpiar gráfico previo
        window.cryptoChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: `Precio de ${crypto.toUpperCase()} (USD)`,
                    data: prices,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Días'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Precio (USD)'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al cargar el gráfico:', error);
    }
}

// Simulador de Portafolio
document.getElementById('add-crypto-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const crypto = document.getElementById('crypto').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!amount || amount <= 0) {
        alert('Por favor, ingresa una cantidad válida.');
        return;
    }

    try {
        const priceResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const priceData = await priceResponse.json();
        const price = priceData[crypto].usd;

        const listItem = document.createElement('li');
        listItem.textContent = `${amount} ${crypto.toUpperCase()} ($${(amount * price).toFixed(2)})`;

        document.getElementById('portfolio-list').appendChild(listItem);

        const currentValue = parseFloat(document.getElementById('total-value').textContent.split(' ')[2]) || 0;
        document.getElementById('total-value').textContent = `Valor Total: $${(currentValue + (amount * price)).toFixed(2)} USD`;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        alert('Ocurrió un error al calcular. Intenta nuevamente.');
    }
});

// Calculadora de Precios
document.getElementById('crypto-calculator').addEventListener('submit', async (e) => {
    e.preventDefault();

    const crypto = document.getElementById('crypto-calc').value;
    const amount = parseFloat(document.getElementById('amount-calc').value);

    if (!amount || amount <= 0) {
        document.getElementById('result').textContent = 'Por favor, ingresa una cantidad válida.';
        return;
    }

    try {
        const priceResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const priceData = await priceResponse.json();
        const price = priceData[crypto].usd;

        document.getElementById('result').textContent = `${amount} ${crypto.toUpperCase()} = $${(amount * price).toFixed(2)} USD`;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        document.getElementById('result').textContent = 'Ocurrió un error al calcular.';
    }
});

// Conversor de Criptomonedas
document.getElementById('convert-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount-convert').value);
    const fromCrypto = document.getElementById('from-crypto').value;
    const toCrypto = document.getElementById('to-crypto').value;

    if (!amount || amount <= 0) {
        document.getElementById('convert-result').textContent = 'Por favor, ingresa una cantidad válida.';
        return;
    }

    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${fromCrypto},${toCrypto}&vs_currencies=usd`);
        const data = await response.json();

        const fromPrice = data[fromCrypto].usd;
        const toPrice = data[toCrypto].usd;

        const convertedAmount = (amount * fromPrice) / toPrice;

        document.getElementById('convert-result').textContent = `${amount} ${fromCrypto.toUpperCase()} = ${convertedAmount.toFixed(6)} ${toCrypto.toUpperCase()}`;
    } catch (error) {
        console.error('Error al convertir:', error);
        document.getElementById('convert-result').textContent = 'Ocurrió un error al convertir.';
    }
});

// Cargar noticias cripto
async function loadNews() {
    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=TU_API_KEY');
        const data = await response.json();

        const newsFeed = document.getElementById('news-feed');
        data.articles.slice(0, 5).forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">Leer más</a>
            `;
            newsFeed.appendChild(articleDiv);
        });
    } catch (error) {
        console.error('Error al cargar noticias:', error);
        document.getElementById('news-feed').textContent = 'Ocurrió un error al cargar las noticias.';
    }
}

loadNews();

// Inicializar gráfico por defecto
createPriceChart();
