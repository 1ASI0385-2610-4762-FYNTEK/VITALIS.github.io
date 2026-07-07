/* ============================================================
   US-11 | EP-02 | "Alerta de Burnout"
   Como practicante, quiero alertas de patrones de cansancio,
   para evitar el colapso emocional.
   ============================================================ */
function burnoutAlertTemplate() {
    return `
        <span class="zen-us-tag">US-11 · Alerta de burnout</span>
        <h3>Detección de estrés sostenido</h3>
        <p class="zen-timer-phrase">Simulación: 3 días seguidos con estrés alto registrado.</p>
        <button class="btn btn-secondary" id="zen-burnout-simulate">Abrir la app</button>
        <div class="zen-rec-card" id="zen-burnout-notice" style="display:none;"></div>
    `;
}

function bindBurnoutAlert() {
    document.getElementById('zen-burnout-simulate').addEventListener('click', () => {
        const notice = document.getElementById('zen-burnout-notice');
        // Escenario: Notificación de alerta por estrés sostenido
        notice.style.display = 'block';
        notice.innerHTML = `
            <p><strong>⚠ Pausa obligatoria recomendada.</strong><br>
            Llevas 3 días con niveles de estrés elevados.</p>
            <div class="zen-rec-actions">
                <button id="zen-burnout-relief">Ver ejercicios rápidos</button>
            </div>
        `;
        document.getElementById('zen-burnout-relief').addEventListener('click', () => {
            // Escenario: Acceso a herramientas de mitigación rápida
            notice.innerHTML += `
                <ul class="zen-subtask-list">
                    <li>🌬️ Respiración 4-7-8 (2 min)</li>
                    <li>🧘 Estiramiento de cuello y hombros (1 min)</li>
                    <li>🚶 Caminata corta sin celular (5 min)</li>
                </ul>
            `;
        });
    });
}
