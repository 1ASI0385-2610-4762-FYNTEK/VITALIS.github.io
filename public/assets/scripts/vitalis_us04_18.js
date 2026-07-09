/* ============================================================
   US-04 / US-18 | EP-01/03 | "Registrar hábitos de sueño"
   Como usuario quiero registrar mis horas de sueño para
   identificar si afectan mi bienestar emocional y productividad.
   ============================================================ */
function sleepTrackerTemplate() {
    return `
        <span class="zen-us-tag">Registro de Sueño</span>
        <h3>Bitácora de Descanso Matutino</h3>
        <p class="zen-timer-phrase">Introduce las horas reales descansadas anoche.</p>
        
        <div style="display: flex; gap: 12px; margin-bottom: 12px;">
            <input type="number" id="zen-sleep-hours" placeholder="Ej: 7" class="form-input" style="flex: 1; padding: 10px;">
            <button class="btn btn-primary" id="zen-save-sleep" style="padding: 10px 20px;">Registrar</button>
        </div>
        
        <p class="zen-success" id="zen-sleep-success"></p>
        <p class="zen-success" id="zen-sleep-error" style="background: #ffebee; color: #c62828; border-left: 3px solid #c62828;"></p>
    `;
}

function bindSleepTracker() {
    const saveBtn = document.getElementById('zen-save-sleep');
    const hoursInput = document.getElementById('zen-sleep-hours');
    const successMsg = document.getElementById('zen-sleep-success');
    const errorMsg = document.getElementById('zen-sleep-error');

    if (!saveBtn) return;

    saveBtn.addEventListener('click', () => {
        const hours = parseFloat(hoursInput.value);

        // Escenario 2: Validación de rango de horas permitidas
        if (isNaN(hours) || hours > 24 || hours < 0) {
            successMsg.classList.remove('show');
            errorMsg.classList.add('show');
            errorMsg.textContent = '⚠️ Rango inválido. El valor no puede ser negativo ni superior a 24 horas.';
            return;
        }

        // Escenario 1: Almacenamiento exitoso e insights de productividad
        errorMsg.classList.remove('show');
        successMsg.classList.add('show');

        if (hours < 6) {
            successMsg.style.backgroundColor = '#fff3e0';
            successMsg.style.color = '#e65100';
            successMsg.textContent = `Registrado: ${hours}h. ⚠ Alerta: Tu descanso ha sido bajo. La IA proyecta una reducción del 20% en tu enfoque hoy.`;
        } else {
            successMsg.style.backgroundColor = '#e8f5e9';
            successMsg.style.color = '#2e7d32';
            successMsg.textContent = `Registrado: ${hours}h. ✓ Rango óptimo para balancear alta carga cognitiva.`;
        }
        hoursInput.value = '';
    });
}