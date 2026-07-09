/* ============================================================
   US-44 / US-49 | EP-07/08 | "Tiempo de Pantalla & Concentración"
   Como usuario quiero monitorear mi tiempo de pantalla y registrar
   mi nivel de concentración para identificar distracciones.
   ============================================================ */
function screenTimeTemplate() {
    return `
        <span class="zen-us-tag">Auditoría Digital</span>
        <h3>Tiempo de Pantalla & Enfoque</h3>
        <p class="zen-timer-phrase">Evalúa el uso diario de tus dispositivos y califica tu nivel de atención.</p>
        
        <div style="background-color: #FAFAFA; border: 1px solid #E5E5E5; padding: 12px; border-radius: 8px; margin-bottom: 12px; font-size: 13.5px;">
            📊 <strong>Exposición de Hoy:</strong> 4h 12min <span style="color: #666;">(Bajo el límite crítico de burnout)</span>
        </div>

        <div class="form-group-zen" style="margin-bottom: 12px;">
            <label style="font-size: 11px;">Califica tu nivel de concentración de hoy:</label>
            <select id="zen-concentration-rating" class="register-input" style="width:100%; padding: 8px; font-size: 13px;">
                <option value="Alta">Alta - Completé mis bloques sin procrastinar</option>
                <option value="Media">Media - Tuve distracciones menores</option>
                <option value="Baja">Baja - Fatiga visual alta / sobreestimulación</option>
            </select>
        </div>
        
        <button class="btn btn-primary" id="zen-btn-save-concentration" style="width: 100%; padding: 10px;">Guardar Auditoría</button>
        <p class="zen-success" id="zen-concentration-success"></p>
    `;
}

function bindScreenTime() {
    const saveBtn = document.getElementById('zen-btn-save-concentration');
    const ratingSelect = document.getElementById('zen-concentration-rating');
    const success = document.getElementById('zen-concentration-success');

    if (!saveBtn) return;

    saveBtn.addEventListener('click', () => {
        success.classList.add('show');
        success.textContent = `Nivel [Concentración ${ratingSelect.value}] indexado con éxito en tus métricas semanales. ✓`;
        setTimeout(() => success.classList.remove('show'), 3000);
    });
}