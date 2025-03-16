document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calcular').addEventListener('click', async () => {
        const cantidadOrigen = parseFloat(document.getElementById('cantidad-origen').value);
        const criptoOrigen = document.getElementById('cripto-origen').value;
        const criptoDestino = document.getElementById('cripto-destino').value;
        const resultadoElemento = document.getElementById('resultado');

        if (isNaN(cantidadOrigen)) {
            resultadoElemento.textContent = "Por favor, ingresa una cantidad válida.";
            return;
        }

        try {
            const precioOrigen = await obtenerPrecio(criptoOrigen);
            const precioDestino = await obtenerPrecio(criptoDestino);

            if (precioOrigen && precioDestino) {
                const resultado = (cantidadOrigen * precioOrigen) / precioDestino;
                resultadoElemento.textContent = `Resultado: ${resultado.toFixed(2)}`;
            } else {
                resultadoElemento.textContent = "Error al obtener precios.";
            }
        } catch (error) {
            console.error("Error en la calculadora:", error);
            resultadoElemento.textContent = "Ocurrió un error.";
        }
    });

    async function obtenerPrecio(cripto) {
        try {
            let id = cripto;
            if (cripto === 'usd') {
                return 1; // USD como base
            }
            const respuesta = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`);
            const datos = await respuesta.json();

            if (datos && datos[id] && datos[id].usd) {
                return datos[id].usd;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error al obtener precio:", error);
            return null;
        }
    }
});
