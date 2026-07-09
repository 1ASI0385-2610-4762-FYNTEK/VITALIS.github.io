/* ============================================================
   US-46 | EP-07 | "Visualizar frases motivacionales"
   Como usuario quiero visualizar frases motivacionales para
   mejorar mi estado de ánimo.
   ============================================================ */
function motivationalQuotesTemplate() {
    return `
        <span class="zen-us-tag">Frases motivacionales</span>
        <h3 id="zen-quote-text">"Respira. Un paso a la vez es suficiente."</h3>
        <div style="display:flex; gap:10px; margin-top:14px;">
            <button class="btn btn-secondary" id="zen-quote-next">Otra frase</button>
            <button class="btn btn-primary" id="zen-quote-save">Guardar en favoritos</button>
        </div>
        <p class="zen-success" id="zen-quote-feedback"></p>
    `;
}

function bindMotivationalQuotes() {
    const quotes = [
        'Respira. Un paso a la vez es suficiente.',
        'Organiza hoy la energía que necesitas para mañana.',
        'El descanso también es parte del progreso.',
        'No tienes que hacerlo todo hoy, solo lo siguiente.',
        'Tu bienestar es la base de tu rendimiento.'
    ];
    const quoteEl = document.getElementById('zen-quote-text');
    const feedback = document.getElementById('zen-quote-feedback');

    document.getElementById('zen-quote-next').addEventListener('click', () => {
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        quoteEl.textContent = `"${random}"`;
        feedback.classList.remove('show');
    });

    document.getElementById('zen-quote-save').addEventListener('click', () => {
        // Escenario: Interacción y guardado de frases inspiradoras
        feedback.classList.add('show');
        feedback.textContent = 'Frase guardada en tu galería personal de inspiración ✓';
    });
}