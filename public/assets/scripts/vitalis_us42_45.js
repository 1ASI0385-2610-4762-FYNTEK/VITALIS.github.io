/* ============================================================
   US-42 / US-45 | EP-07 | "Modo Concentración Silencioso"
   Como usuario quiero activar un modo concentración con
   notificaciones silenciosas para evitar distracciones invasivas.
   ============================================================ */
function focusModeTemplate() {
    return `
        <span class="zen-us-tag">Enfoque Absoluto</span>
        <h3>Espacio de Concentración</h3>
        <p class="zen-timer-phrase">Aísla tu entorno digital de alertas ruidosas y estímulos estresantes.</p>
        
        <div style="text-align: center; margin: 16px 0;">
            <button class="btn btn-secondary" id="zen-btn-toggle-focus" style="width: 100%; padding: 14px;">Activar Modo Concentración Silencioso</button>
        </div>
        
        <p class="zen-success" id="zen-focus-status-msg" style="background-color: #f5f5f5; color: #111111; border-left: 3px solid #666666;"></p>
    `;
}

function bindFocusMode() {
    const toggleBtn = document.getElementById('zen-btn-toggle-focus');
    const statusMsg = document.getElementById('zen-focus-status-msg');

    if (!toggleBtn) return;

    let isFocusActive = false;

    toggleBtn.addEventListener('click', () => {
        isFocusActive = !isFocusActive;
        if (isFocusActive) {
            toggleBtn.textContent = '📴 Desactivar Modo Enfoque';
            toggleBtn.style.backgroundColor = '#111111';
            toggleBtn.style.color = '#FFFFFF';
            statusMsg.classList.add('show');
            statusMsg.textContent = '🔇 VITALIS // Modo concentración activo. Notificaciones silenciadas y filtradas por el sistema.';
        } else {
            toggleBtn.textContent = 'Activar Modo Concentración Silencioso';
            toggleBtn.style.backgroundColor = 'transparent';
            toggleBtn.style.color = '#111111';
            statusMsg.classList.remove('show');
        }
    });
}