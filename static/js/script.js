console.log("¡Script cargado!");

document.addEventListener('DOMContentLoaded', () => {
    // Eventos para los botones "Ver Curso"
    const botonesVerCurso = document.querySelectorAll('.ver-curso');
    botonesVerCurso.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const curso = evento.target.parentElement.dataset.curso;
            alert(`Ver curso: ${curso}`); // Simulación de ver curso
        });
    });
});
