/* ============================================================
   US-22 / US-23 / US-30 / US-34 | EP-04/05 | "Gestión de Ciclos Críticos"
   Como usuario quiero planificar mis exámenes y activar bloqueos
   laborales para evitar el exceso de trabajo y el agotamiento.
   ============================================================ */
function criticalCyclesTemplate() {
    return `
        <span class="zen-us-tag">Control de Carga</span>
        <h3>Filtro de Sobrecarga y Exámenes</h3>
        <p class="zen-timer-phrase">Registra hitos de alta demanda y activa escudos de desconexión.</p>
        
        <div style="display: flex; align-items: center; justify-content: space-between; background-color: #FAFAFA; border: 1px solid #E5E5E5; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
            <div>
                <strong style="font-size: 13px; display: block;">🛡️ Activar Bloqueo Laboral (US-22)</strong>
                <span style="font-size: 11px; color:#666;">Suspende notificaciones de estudio durante tu horario de oficina.</span>
            </div>
            <input type="checkbox" id="zen-toggle-work-lock" style="width: 20px; height: 20px; accent-color: #111111; cursor: pointer;">
        </div>

        <form id="form-zen-exams" onsubmit="registerZenExam(event)" style="display: flex; flex-direction: column; gap: 8px;">
            <input type="text" id="zen-exam-name" required placeholder="Examen (Ej: Final de Arquitectura de Software)" class="register-input" style="padding: 10px; font-size: 13px;">
            <button type="submit" class="btn btn-primary" style="padding: 10px;">Registrar Fecha Crítica (US-23)</button>
        </form>

        <p class="zen-success" id="zen-exam-success"></p>
    `;
}

function bindCriticalCycles() {
    const toggleLock = document.getElementById('zen-toggle-work-lock');
    const examForm = document.getElementById('form-zen-exams');
    const success = document.getElementById('zen-exam-success');

    if (!toggleLock) return;

    // Escenario: US-22 / US-34 Alertas de exceso de trabajo y protección
    toggleLock.addEventListener('change', () => {
        success.classList.add('show');
        success.style.backgroundColor = toggleLock.checked ? '#e8f5e9' : '#f5f5f5';
        success.style.color = toggleLock.checked ? '#2e7d32' : '#111111';
        success.textContent = toggleLock.checked
            ? '🔒 Escudo laboral activado: Notificaciones de estudio pausadas hasta salir de la oficina.'
            : 'Escudo desactivado. Volviendo al flujo regular de notificaciones.';
    });
}

window.registerZenExam = function(e) {
    e.preventDefault();
    const name = document.getElementById('zen-exam-name');
    const success = document.getElementById('zen-exam-success');

    // Escenario: US-30 Alertas predictivas de semanas de parciales/finales
    success.classList.add('show');
    success.style.backgroundColor = '#fff3e0';
    success.style.color = '#e65100';
    success.textContent = `📅 Registrado. Alerta: Se detectó alta carga cognitiva para la semana de "${name.value}". La IA reajustará tus Pomodoros automáticamente.`;
    name.value = '';
};