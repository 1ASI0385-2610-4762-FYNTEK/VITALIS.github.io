/* ============================================================
   US-21 | EP-03 | "Recordatorio H2O"
   Como usuario, quiero recordatorios de hidratación, para
   mantener mi bienestar físico.
   ============================================================ */
function hydrationTrackerTemplate() {
    return `
        <span class="zen-us-tag">Hidratación</span>
        <h3>Control de Hidratación Corporal</h3>
        <p class="zen-timer-phrase">Fomenta el consumo regular de agua para mitigar el agotamiento físico.</p>
        
        <div style="text-align: center; margin: 12px 0;">
            <div style="font-size: 32px;" id="zen-water-icon">💧</div>
            <div class="zen-timer-display" id="zen-water-counter" style="font-size: 28px; margin: 8px 0;">0 / 8 Vasos</div>
        </div>

        <div style="display: flex; gap: 10px;">
            <button class="mood-btn" id="zen-btn-add-water" style="padding: 10px; font-size: 13px; flex: 2;">+ Registrar 1 Vaso (250ml)</button>
            <button class="mood-btn" id="zen-btn-reset-water" style="padding: 10px; font-size: 13px; flex: 1; color: #666666;">Reset</button>
        </div>
        <p class="zen-success" id="zen-water-success"></p>
    `;
}

function bindHydrationTracker() {
    const addBtn = document.getElementById('zen-btn-add-water');
    const resetBtn = document.getElementById('zen-btn-reset-water');
    const counterDisplay = document.getElementById('zen-water-counter');
    const successMsg = document.getElementById('zen-water-success');
    const waterIcon = document.getElementById('zen-water-icon');

    if (!addBtn) return;

    let currentGlasses = parseInt(sessionStorage.getItem('vitalis_water_count') || '0', 10);

    function updateWaterUI() {
        counterDisplay.textContent = `${currentGlasses} / 8 Vasos`;
        sessionStorage.setItem('vitalis_water_count', currentGlasses);
        if (currentGlasses >= 8) {
            waterIcon.textContent = '';
            successMsg.classList.add('show');
            successMsg.textContent = '¡Meta diaria alcanzada! Mantienes un excelente equilibrio físico ✓';
        } else {
            waterIcon.textContent = '';
            successMsg.classList.remove('show');
        }
    }

    updateWaterUI(); // Carga estado inicial

    addBtn.addEventListener('click', () => {
        if (currentGlasses < 12) {
            currentGlasses++;
            updateWaterUI();
        }
    });

    resetBtn.addEventListener('click', () => {
        currentGlasses = 0;
        updateWaterUI();
    });
}