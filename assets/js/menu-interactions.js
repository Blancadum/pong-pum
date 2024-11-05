document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main section"); // Todas las secciones
    const menuLinks = document.querySelectorAll(".navbar .nav-link"); 
    const playLink = document.getElementById("click"); // Botón "Play"
 
    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.toggle("hidden", section.id !== sectionId); // Mostrar solo la sección seleccionada
        });
    }

    // Configuración de los enlaces del menú
    menuLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const sectionId = link.getAttribute("href").substring(1); 
            showSection(sectionId);
            
            // Actualizar visualización de enlaces activos
            menuLinks.forEach(link => link.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // Mostrar la sección inicial al cargar
    showSection("coverScreen");

    // Configurar el clic en el botón "Play"
    if (playLink) {
        playLink.addEventListener("click", (event) => {
            event.preventDefault();
            showSection("playWindow"); // Cambiar a la sección de juego
            menuLinks.forEach(link => link.classList.remove("active"));
            playLink.classList.add("active");
        });
    } else {
        console.warn("No se encontró el botón de inicio 'Play' en el DOM.");
    }
});