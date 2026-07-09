/* ============================================================
   US-08 | EP-02 | "Dictado de Tareas"
   Como practicante, quiero dictar pendientes por voz para
   registrarlos rápidamente en movimiento.
   ============================================================ */
function voiceDictationTemplate() {
    return `
        <span class="zen-us-tag">Dictado por Voz</span>
        <h3>Captura de Notas Rápida</h3>
        <p class="zen-timer-phrase">Presiona el micrófono para simular la transcripción por voz (Audio API MOCK).</p>
        
        <div style="text-align: center; margin: 16px 0;">
            <button class="mood-btn" id="zen-voice-mic-btn" style="border-radius: 50%; width: 60px; height: 60px; font-size: 24px; padding: 0;">🎙️</button>
            <p id="zen-mic-status" class="zen-timer-phrase" style="margin-top: 8px;">Micrófono inactivo</p>
        </div>

        <div id="zen-voice-edit-zone" class="hidden-element">
            <div class="form-group-zen">
                <label style="font-size: 11px;">Validar y Editar Nota Transcrita</label>
                <input type="text" id="zen-voice-input-text" class="register-input" style="width: 100%; box-sizing: border-box;">
            </div>
            <button class="btn btn-primary" id="zen-voice-save-task" style="width: 100%; margin-top: 8px;">Confirmar e Inyectar</button>
        </div>
        <p class="zen-success" id="zen-voice-success"></p>
    `;
}

function bindVoiceDictation() {
    const micBtn = document.getElementById('zen-voice-mic-btn');
    const status = document.getElementById('zen-mic-status');
    const editZone = document.getElementById('zen-voice-edit-zone');
    const inputText = document.getElementById('zen-voice-input-text');
    const saveBtn = document.getElementById('zen-voice-save-task');
    const success = document.getElementById('zen-voice-success');

    if (!micBtn) return;

    micBtn.addEventListener('click', () => {
        micBtn.style.backgroundColor = '#ECECF0';
        status.textContent = '🧠 Escuchando y transcribiendo asíncronamente...';

        // Escenario 1: Transcripción simulada de voz a texto
        setTimeout(() => {
            micBtn.style.backgroundColor = '#FFFFFF';
            status.textContent = '✓ Transcripción finalizada';
            editZone.classList.remove('hidden-element');
            inputText.value = 'Revisar entregable de Ingeniería de Software con Manuel Molina';
        }, 2000);
    });

    // Escenario 2: Validación y edición antes de finalizar
    saveBtn.addEventListener('click', () => {
        const finalNote = inputText.value.trim();
        if(!finalNote) return;

        editZone.classList.add('hidden-element');
        success.classList.add('show');
        success.textContent = `Pendiente inyectado con éxito: "${finalNote}" ✓`;

        // Inyección directa reactiva en el checklist de la HU-14 si existe en el DOM
        const taskList = document.getElementById('task-list-zen');
        if (taskList) {
            const li = document.createElement('li');
            li.className = 'task-item-zen';
            li.innerHTML = `<input type="checkbox" onchange="toggleTask(this)"> <span>${finalNote}</span>`;
            taskList.appendChild(li);
        }
    });
}