/* ============================================================
   US-03 | EP-01 | "Configurar recordatorios de tareas"
   Como usuario quiero recibir recordatorios de tareas para no
   olvidar entregas importantes.
   ============================================================ */

function taskReminderTemplate() {
    return `
        <span class="zen-us-tag"> Recordatorios</span>
        <h3>Programador de Alertas</h3>
        <p class="zen-timer-phrase">Define una fecha y hora límite para asegurar tus entregas sin estrés cognitivo.</p>
        
        <form id="form-zen-reminder" onsubmit="scheduleZenReminder(event)" style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; gap: 10px;">
                <input type="date" id="zen-reminder-date" required class="support-input" style="flex: 1; padding: 10px; font-size: 13px;">
                <input type="time" id="zen-reminder-time" required class="support-input" style="flex: 1; padding: 10px; font-size: 13px;">
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px;">Programar Recordatorio</button>
        </form>

        <p class="zen-success" id="zen-reminder-success"></p>

        <div id="zen-active-notification-alert" class="zen-rec-card" style="display: none; background-color: #FFFFFF; border: 1px solid #111111; margin-top: 16px;">
            <p style="margin: 0 0 10px 0;"><strong>🔔 VITALIS // Recordatorio Activo</strong><br>Tienes una entrega importante pendiente en tu calendario.</p>
            <div class="zen-tool-nav" id="zen-snooze-options">
                <button data-minutes="5">Posponer 5 min</button>
                <button data-minutes="10">Posponer 10 min</button>
                <button data-minutes="15">Posponer 15 min</button>
            </div>
        </div>
        
        <p class="zen-success" id="zen-snooze-success" style="background-color: #FAFAFA; border-left: 3px solid #666666; color: #111111;"></p>
    `;
}

function scheduleZenReminder(e) {
    e.preventDefault();
    const date = document.getElementById('zen-reminder-date').value;
    const time = document.getElementById('zen-reminder-time').value;
    const successMsg = document.getElementById('zen-reminder-success');
    const activeAlert = document.getElementById('zen-active-notification-alert');

    // Escenario 1: Usuario programa recordatorio
    successMsg.classList.add('show');
    successMsg.textContent = `Alerta configurada de forma respetuosa para el ${date} a las ${time} ✓`;

    // Simulación automatizada: Dispara la notificación simulada después de 3 segundos para probar el Escenario 2
    setTimeout(() => {
        successMsg.classList.remove('show');
        if (activeAlert) {
            activeAlert.style.display = 'block';
        }
    }, 3000);
}

// CORREGIDO: Nombre de la función estandarizado para la lectura del orquestador maestro
function bindTaskReminder() {
    const snoozeAlert = document.getElementById('zen-active-notification-alert');
    const snoozeSuccess = document.getElementById('zen-snooze-success');
    const container = document.getElementById('zen-snooze-options');

    if (!container) return;

    const buttons = container.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const min = btn.dataset.minutes;

            // Escenario 2: Reprogramación de recordatorio activo
            if (snoozeAlert) snoozeAlert.style.display = 'none';
            if (snoozeSuccess) {
                snoozeSuccess.classList.add('show');
                snoozeSuccess.textContent = `Recordatorio pospuesto. Te notificaremos automáticamente en ${min} minutos. ✓`;

                setTimeout(() => {
                    snoozeSuccess.classList.remove('show');
                    snoozeSuccess.textContent = '';
                }, 4000);
            }
        });
    });
}
window.bindTaskReminder = function() {
    const snoozeAlert = document.getElementById('zen-active-notification-alert');
    const snoozeSuccess = document.getElementById('zen-snooze-success');
    const container = document.getElementById('zen-snooze-options');

    if (!container) return;

    const buttons = container.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const min = btn.dataset.minutes;
            if (snoozeAlert) snoozeAlert.style.display = 'none';
            if (snoozeSuccess) {
                snoozeSuccess.classList.add('show');
                snoozeSuccess.textContent = `Recordatorio pospuesto. Te notificaremos automáticamente en ${min} minutos. ✓`;
            }
        });
    });
}