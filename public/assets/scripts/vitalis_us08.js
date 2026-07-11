/* ============================================================
   US-08 | EP-02 | "Dictado de Tareas"
   Captura real mediante Web Speech API del navegador.
   ============================================================ */

function voiceDictationTemplate() {
    return `
        <span class="zen-us-tag">Dictado por Voz</span>
        <h3>Captura de Notas Rápida</h3>
        <p class="zen-timer-phrase">Presiona el micrófono para hablar. El sistema transcribirá tu voz en tiempo real.</p>
        
        <div style="text-align: center; margin: 16px 0;">
            <button class="mood-btn" id="zen-voice-mic-btn" style="border-radius: 50%; width: 60px; height: 60px; font-size: 24px; padding: 0; transition: all 0.3s ease;">🎙️</button>
            <p id="zen-mic-status" class="zen-timer-phrase" style="margin-top: 8px;">Micrófono inactivo</p>
        </div>

        <div id="zen-voice-edit-zone" class="hidden-element">
            <div class="form-group-zen">
                <label style="font-size: 11px; font-weight: 600; color: #666; display: block; margin-bottom: 6px;">VALIDAR Y EDITAR NOTA TRANCRITA</label>
                <input type="text" id="zen-voice-input-text" class="register-input" style="width: 100%; box-sizing: border-box;">
            </div>
            <button class="btn btn-primary" id="zen-voice-save-task" style="width: 100%; margin-top: 12px;">Confirmar e Inyectar</button>
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

    // Verificar compatibilidad del navegador con la API de Voz
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        status.textContent = '❌ Tu navegador no soporta el reconocimiento de voz. Usa Google Chrome o Edge.';
        micBtn.disabled = true;
        return;
    }

    // Configuración del objeto de reconocimiento de voz
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-PE'; // Configurado para el Español de Perú
    recognition.interimResults = false; // Solo devuelve el resultado final cuando termines de hablar
    recognition.maxAlternatives = 1;

    let isListening = false;

    micBtn.addEventListener('click', () => {
        if (!isListening) {
            // Iniciar escucha activa
            try {
                recognition.start();
            } catch (err) {
                console.log("Reconocimiento ya iniciado u ocupado", err);
            }
        } else {
            // Detener de forma manual si vuelves a presionar
            recognition.stop();
        }
    });

    // Evento: El micrófono se enciende y empieza a escuchar
    recognition.onstart = () => {
        isListening = true;
        micBtn.style.backgroundColor = '#FFEBEE'; // Tono sutil rojizo/alerta elegante
        micBtn.style.borderColor = '#C62828';
        status.textContent = '🧠 Escuchando activamente... Habla ahora.';
        if (success) success.classList.remove('show');
    };

    // Evento: Terminaste de hablar o se detuvo el proceso
    recognition.onend = () => {
        isListening = false;
        micBtn.style.backgroundColor = '#FFFFFF';
        micBtn.style.borderColor = '#E5E5E5';
        if (status.textContent === '🧠 Escuchando activamente... Habla ahora.') {
            status.textContent = '✓ Transcripción finalizada';
        }
    };

    // Evento: Procesar el audio capturado y convertirlo en texto real
    recognition.onresult = (event) => {
        const transcriptText = event.results[0][0].transcript;

        // Mostrar la zona de validación inyectando el texto real escuchado
        if (editZone && inputText) {
            editZone.classList.remove('hidden-element');
            inputText.value = transcriptText;
            status.textContent = '✓ Voz transcrita con éxito';
        }
    };

    // Evento: Control de errores (Por ejemplo si deniegas el permiso de micrófono)
    recognition.onerror = (event) => {
        isListening = false;
        micBtn.style.backgroundColor = '#FFFFFF';
        micBtn.style.borderColor = '#E5E5E5';

        if (event.error === 'not-allowed') {
            status.textContent = '❌ Permiso denegado. Habilita el acceso al micrófono en tu navegador.';
        } else {
            status.textContent = '❌ Error al capturar audio. Intenta hablar de nuevo.';
        }
        console.error('Speech recognition error detected:', event.error);
    };

    // Confirmación final e inyección en el checklist global (HU-14)
    saveBtn.addEventListener('click', () => {
        const finalNote = inputText.value.trim();
        if (!finalNote) return;

        editZone.classList.add('hidden-element');
        success.classList.add('show');
        success.textContent = `Pendiente inyectado con éxito: "${finalNote}" ✓`;

        // Inyección directa reactiva en el checklist general si existe en tu DOM
        const taskList = document.getElementById('task-list-zen');
        if (taskList) {
            const li = document.createElement('li');
            li.className = 'task-item-zen';
            li.innerHTML = `<input type="checkbox" onchange="toggleTask(this)"> <span>${finalNote}</span>`;
            taskList.appendChild(li);
        }

        inputText.value = '';
    });
}