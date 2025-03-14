// Gráfico de Precios
async function createPriceChart(crypto = 'bitcoin') {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=7`);
        const data = await response.json();
        const prices = data.prices.map(price => price[1]);
        const dates = data.prices.map(price => new Date(price[0]).toLocaleDateString());

        const ctx = document.getElementById('cryptoChart').getContext('2d');
        new Chart(ctx, {
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
        document
