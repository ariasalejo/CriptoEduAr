async function obtenerDatosPrecio() {
  const respuesta = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30"
  );
  const datos = await respuesta.json();
  const precios = datos.prices.map((precio) => precio[1]); // Obtener solo los precios
  const fechas = datos.prices.map(
    (precio) => new Date(precio[0]).toLocaleDateString()
  ); // Obtener las fechas
  return { fechas, precios };
}

obtenerDatosPrecio().then(({ fechas, precios }) => {
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: fechas,
      datasets: [
        {
          label: "Precio de Bitcoin (USD)",
          data: precios,
          borderColor: "blue",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
});

