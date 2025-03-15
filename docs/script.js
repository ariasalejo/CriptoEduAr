// Función para mostrar información de criptomonedas
async function mostrarInfo(coin) {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
    const data = await response.json();
    const price = data[coin].usd;
    document.getElementById('crypto-info').innerHTML = `
        <h2>Información de ${coin.toUpperCase()}</h2>
        <p>Precio actual: $${price} USD</p>
    `;
}

// Gráfico de precios
const ctx = document.getElementById('cryptoChart').getContext('2d');
const cryptoChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
            label: 'Precio de Bitcoin',
            data: [50000, 60000, 70000, 80000, 85000, 90000/],
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