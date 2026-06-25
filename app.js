// 1. Variables globales para guardar los datos
let webtoonsData = [];

// 2. Elementos del HTML que vamos a manipular
const resultsContainer = document.getElementById('results-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// 3. Función para cargar el archivo JSON local
async function loadWebtoons() {
    try {
        const response = await fetch('webtoons.json');
        webtoonsData = await response.json();
        
        // Al cargar la app por primera vez, mostramos todos los webtoons
        displayWebtoons(webtoonsData);
    } catch (error) {
        console.error("Error al cargar la base de datos de webtoons:", error);
        resultsContainer.innerHTML = `<p class="no-results">Error al cargar las historias. Inténtalo de nuevo más tarde.</p>`;
    }
}

// 4. Función para "pintar" las tarjetas en la pantalla
function displayWebtoons(list) {
    // Limpiamos el contenedor por si había búsquedas anteriores
    resultsContainer.innerHTML = '';

    // Si la lista está vacía, mostramos el mensaje que planeaste en tus reglas de negocio
    if (list.length === 0) {
        resultsContainer.innerHTML = `
            <p class="no-results">
                No se encontraron resultados con esta combinación de hashtags.
            </p>`;
        return;
    }

    // Recorremos la lista y creamos el HTML de cada tarjeta
    list.forEach(comic => {
        // Creamos los botoncitos de los tags html
        const tagsHtml = comic.tags.map(tag => `<span class="tag-pill">#${tag}</span>`).join('');

        const card = document.createElement('div');
        card.className = 'comic-card';
        card.innerHTML = `
            <img class="comic-cover" src="${comic.cover}" alt="Portada de ${comic.title}">
            <div class="comic-info">
                <h3 class="comic-title">${comic.title}</h3>
                <span class="comic-author">Por ${comic.author}</span>
                <p class="comic-desc">${comic.description}</p>
                <div class="comic-tags">
                    ${tagsHtml}
                </div>
                <a href="${comic.external_link}" target="_blank" class="read-btn">Ir a leer</a>
            </div>
        `;
        resultsContainer.appendChild(card);
    });
}

// 5. Ejecutar la carga de datos al abrir la página
loadWebtoons();