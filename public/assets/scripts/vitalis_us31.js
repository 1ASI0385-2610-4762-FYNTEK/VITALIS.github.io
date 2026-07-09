/* ============================================================
   US-31 | EP-05 | "Recibir recomendaciones personalizadas"
   Como usuario quiero recibir recomendaciones personalizadas
   para mejorar mis hábitos diarios.
   ============================================================ */
function recommendationsTemplate() {
    return `
        <span class="zen-us-tag">Recomendaciones personalizadas</span>
        <h3>Recomendación de hoy</h3>
        <div class="zen-rec-card" id="zen-rec-card">
            <p id="zen-rec-text">Notamos que tus horas de sueño bajaron esta semana. Prueba adelantar tu hora de descanso 30 minutos hoy.</p>
            <div class="zen-rec-actions">
                <button id="zen-rec-useful">👍 Útil</button>
                <button id="zen-rec-not-useful">👎 No útil</button>
            </div>
        </div>
        <p class="zen-success" id="zen-rec-feedback"></p>
    `;
}

function bindPersonalizedRecommendations() {
    const feedback = document.getElementById('zen-rec-feedback');
    // Escenario: Retroalimentación sobre la utilidad del consejo
    document.getElementById('zen-rec-useful').addEventListener('click', () => {
        feedback.classList.add('show');
        feedback.textContent = 'Gracias. Priorizaremos más recomendaciones sobre descanso ✓';
    });
    document.getElementById('zen-rec-not-useful').addEventListener('click', () => {
        feedback.classList.add('show');
        feedback.textContent = 'Entendido. Ajustaremos el algoritmo para mostrarte temas más relevantes.';
    });
}