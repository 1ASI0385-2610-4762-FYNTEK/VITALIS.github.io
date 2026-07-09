/* ============================================================
   US-01 | EP-01 | "Registro de estado emocional diario"
   Como usuario quiero registrar mi estado emocional diariamente
   para identificar cambios en mi bienestar mental.
   ============================================================ */

function moodTrackingTemplate() {
    return `
        <span class="zen-us-tag">Registro Emocional</span>
        <h3>¿Cómo te sientes hoy?</h3>
        <p class="zen-timer-phrase">Selecciona una opción obligatoria para tu bitácora diaria.</p>
        
        <div class="mood-selector-container" style="display: flex; gap: 12px; margin-bottom: 16px;">
            <button class="mood-btn" data-mood="Excelente">:D</button>
            <button class="mood-btn" data-mood="Bueno">:)</button>
            <button class="mood-btn" data-mood="Neutral">:|</button>
            <button class="mood-btn" data-mood="Estresado">: (</button>
            <button class="mood-btn" data-mood="Agotado">&gt;:(</button>
        </div>

        <div class="form-group-zen" style="margin-bottom: 16px;">
            <label for="zen-mood-desc" style="font-size: 12px; font-weight: 600; text-transform: uppercase;">Breve descripción (Opcional)</label>
            <input type="text" id="zen-mood-desc" placeholder="¿Qué influyó en tu estado de ánimo?" class="register-input" style="width: 100%; box-sizing: border-box;">
        </div>

        <button class="btn btn-primary" id="zen-mood-save" style="width: 100%;">Guardar Registro</button>
        
        <p class="zen-success" id="zen-mood-success"></p>
        <p class="zen-success" id="zen-mood-error" style="background: #ffebee; color: #c62828; border-left: 3px solid #c62828;"></p>
    `;
}

function bindMoodTracking() {
    const buttons = document.querySelectorAll('.mood-selector-container .mood-btn');
    const saveBtn = document.getElementById('zen-mood-save');
    const descInput = document.getElementById('zen-mood-desc');
    const successMsg = document.getElementById('zen-mood-success');
    const errorMsg = document.getElementById('zen-mood-error');

    if (!saveBtn) return;

    let selectedMood = null;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.style.backgroundColor = '#FFFFFF');
            btn.style.backgroundColor = '#ECECF0';
            selectedMood = btn.dataset.mood;
            errorMsg.classList.remove('show');
        });
    });

    saveBtn.addEventListener('click', () => {

        if (!selectedMood) {
            successMsg.classList.remove('show');
            errorMsg.classList.add('show');
            errorMsg.textContent = 'La selección de una emoción es obligatoria antes de guardar.';
            return;
        }

        const description = descInput.value.trim() || 'Sin descripción adicional.';

        const contextHistory = JSON.parse(sessionStorage.getItem('vitalis_mood_history') || '[]');
        contextHistory.push({
            mood: selectedMood,
            details: description,
            timestamp: new Date().toISOString()
        });
        sessionStorage.setItem('vitalis_mood_history', JSON.stringify(contextHistory));

        errorMsg.classList.remove('show');
        successMsg.classList.add('show');
        successMsg.textContent = `Estado [${selectedMood}] guardado con éxito en tu historial emocional ✓`;

        const liveStressBar = document.getElementById('live-stress-bar');
        if (liveStressBar) {
            if (selectedMood === 'Estresado' || selectedMood === 'Agotado') {
                liveStressBar.style.height = '85px';
                liveStressBar.style.backgroundColor = '#666666';
            } else {
                liveStressBar.style.height = '30px';
                liveStressBar.style.backgroundColor = '#111111';
            }
        }

        descInput.value = '';
    });
}