/* ============================================================
   US-15 | EP-03 | "Pausas Activas"
   Como practicante, quiero alertas de estiramiento, para
   aliviar la tensión física en la oficina.
   ============================================================ */
function activeBreakTemplate() {
    return `
        <span class="zen-us-tag">US-15 · Pausas activas</span>
        <h3>Pausa activa</h3>
        <p class="zen-timer-phrase">Simulación: 2 horas de trabajo sentado detectadas.</p>
        <button class="btn btn-secondary" id="zen-break-accept">Aceptar pausa</button>
        <div id="zen-break-animation" style="display:none; text-align:center; margin-top:16px;">
            <div style="font-size:52px;">🧍‍♂️➡️🙆‍♂️</div>
            <p class="zen-timer-phrase">Estira el cuello hacia cada lado durante 15 segundos.</p>
        </div>
    `;
}

function bindActiveBreak() {
    document.getElementById('zen-break-accept').addEventListener('click', () => {
        // Escenario: Guía visual de estiramiento ergonómico
        document.getElementById('zen-break-animation').style.display = 'block';
    });
}

