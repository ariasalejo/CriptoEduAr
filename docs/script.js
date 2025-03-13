// Calculadora de precios
document.getElementById('crypto-calculator').addEventListener('submit', async function (e) {
    e.preventDefault();

    const crypto = document.getElementById('crypto').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!amount || amount <= 0) {
        alert('Por favor, ingresa una cantidad válida.');
        return;
    }

    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await response.json();
        const price = data[crypto].usd;
        const total = amount * price;

        document.getElementById('result').innerText = `El valor de ${amount} ${crypto.toUpperCase()} es $${total.toFixed(2)} USD.`;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        document.getElementById('result').innerText = 'Ocurrió un error al calcular. Intenta nuevamente.';
    }
});

// Gráfico futurista
async function createPriceChart(crypto) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=30`);
        const data = await response.json();

        const prices = data.prices.map(price => price[1]);
        const dates = data.prices.map(price => new Date(price[0]).toLocaleDateString());

        const ctx = document.getElementById('priceChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: `Precio de ${crypto.toUpperCase()} (USD)`,
                    data: prices,
                    borderColor: 'rgba(44, 62, 80, 1)', // Azul oscuro
                    backgroundColor: 'rgba(44, 62, 80, 0.2)', // Gradiente suave
                    borderWidth: 2,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.4 // Curvas más suaves
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Fecha'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Precio (USD)'
                        },
                        beginAtZero: false
                    }
                },
                animation: {
                    duration: 2000 // Animación de carga suave
                }
            }
        });
    } catch (error) {
        console.error('Error al cargar el gráfico:', error);
        document.getElementById('priceChart').innerText = 'No se pudo cargar el gráfico. Intenta nuevamente.';
    }
}

// Cargar el gráfico para Bitcoin al cargar la página
window.onload = () => createPriceChart('bitcoin');
