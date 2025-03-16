document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('cripto-search');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('search-results');

    const buscarCripto = async (query) => {
        resultsContainer.innerHTML = 'Cargando...';
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${query.toLowerCase()}&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            mostrarResultados(data);
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            resultsContainer.innerHTML = 'Error al buscar criptomonedas.';
        }
    };

    const mostrarResultados = (resultados) => {
        if (resultados.length > 0) {
            const resultadosHTML = resultados.map(cripto => `
                <div class="cripto-resultado">
                    <h3>${cripto.name} (${cripto.symbol.toUpperCase()})</h3>
                    <p>Precio: $${cripto.current_price.toLocaleString()}</p>
                    <img src="${cripto.image}" alt="${cripto.name}" width="50">
                </div>
            `).join('');
            resultsContainer.innerHTML = resultadosHTML;
        } else {
            resultsContainer.innerHTML = 'No se encontraron resultados.';
        }
    };

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            buscarCripto(query);
        }
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                buscarCripto(query);
            }
        }
    });
});
