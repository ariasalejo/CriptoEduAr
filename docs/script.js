// Gráfico de precios
const ctx = document.getElementById('priceChart').getContext('2d');
const priceChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [{
      label: 'Precio de Bitcoin (USD)',
      data: [40000, 42000, 41000, 43000, 44000],
      borderColor: '#007bff',
      borderWidth: 2,
      fill: false,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  },
});

// Simulador de portafolio
function simulatePortfolio() {
  const investment = parseFloat(document.getElementById('investmentInput').value);
  if (isNaN(investment) || investment <= 0) {
    alert('Por favor, ingresa una inversión válida.');
    return;
  }
  const result = investment * 1.5; // Ejemplo: Supongamos un rendimiento del 50%
  document.getElementById('portfolioResult').textContent = `Tu portafolio vale: $${result.toFixed(2)} USD`;
}

// Noticias
async function fetchNews() {
  const apiKey = 'TU_API_KEY_DE_NEWSAPI'; // Reemplaza con tu API key
  const url = `https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${apiKey}`;
  try {
    const response = await axios.get(url);
    const articles = response.data.articles.slice(0, 6); // Mostrar solo 6 noticias
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';
    articles.forEach(article => {
      const articleDiv = document.createElement('div');
      articleDiv.innerHTML = `
        <h5>${article.title}</h5>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank" class="btn btn-sm btn-primary">Leer más</a>
      `;
      newsContainer.appendChild(articleDiv);
    });
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    alert('No se pudieron cargar las noticias.');
  }
}

// Cargar noticias al cargar la página
fetchNews();

// Validación del formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!name || !email || !message) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  alert('¡Mensaje enviado con éxito!');
  this.reset();
});
