/* ============================================================
   US-06 | EP-01 | "Crear horarios de estudio"
   Como usuario quiero organizar mis horarios de estudio para
   mejorar mi productividad académica.
   ============================================================ */

function studyScheduleTemplate() {
    return `
        <span class="zen-us-tag">Horarios de Estudio</span>
        <h3>Planificador de Horarios</h3>
        <p class="zen-timer-phrase">Añade bloques dedicados a tus asignaturas y evita la sobreposición cognitiva.</p>
        
        <form id="form-zen-schedule" onsubmit="addZenStudyBlock(event)" style="display: flex; flex-direction: column; gap: 10px;">
            <div class="form-group-zen" style="margin-bottom: 0;">
                <input type="text" id="zen-study-subject" required placeholder="Curso (Ej. Ingeniería de Software)" class="register-input" style="width: 100%; box-sizing: border-box; padding: 10px; font-size: 13px;">
            </div>
            <div style="display: flex; gap: 10px;">
                <div style="flex: 1;">
                    <label style="font-size: 10px; font-weight:600; color:#666;">HORA INICIO</label>
                    <input type="time" id="zen-study-start" required class="support-input" style="width: 100%; padding: 8px; font-size: 13px; box-sizing: border-box;">
                </div>
                <div style="flex: 1;">
                    <label style="font-size: 10px; font-weight:600; color:#666;">HORA FIN</label>
                    <input type="time" id="zen-study-end" required class="support-input" style="width: 100%; padding: 8px; font-size: 13px; box-sizing: border-box;">
                </div>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; margin-top: 4px;">Guardar Bloque</button>
        </form>

        <p class="zen-success" id="zen-schedule-success"></p>
        <p class="zen-success" id="zen-schedule-error" style="background: #ffebee; color: #c62828; border-left: 3px solid #c62828;"></p>

        <h4 style="font-family:'Playfair Display', serif; margin: 20px 0 10px 0; font-size: 15px;">Vista de Agenda por Bloques</h4>
        <div class="calendar-timeline" id="zen-schedule-timeline" style="display: flex; flex-direction: column; gap: 10px;">
            <div class="time-block" style="grid-template-columns: 140px 1fr;" data-start="08:00" data-end="11:00">
                <span class="time-label">08:00 - 11:00</span>
                <div class="event-pill event-academic">🎓 Clases de Ingeniería de Software (UPC)</div>
            </div>
            <div class="time-block" style="grid-template-columns: 140px 1fr;" data-start="15:00" data-end="19:00">
                <span class="time-label">15:00 - 19:00</span>
                <div class="event-pill event-work">💼 Bloque de Prácticas / Oficina</div>
            </div>
        </div>
    `;
}

function addZenStudyBlock(e) {
    e.preventDefault();

    const subject = document.getElementById('zen-study-subject').value.trim();
    const startStr = document.getElementById('zen-study-start').value;
    const endStr = document.getElementById('zen-study-end').value;

    const successMsg = document.getElementById('zen-schedule-success');
    const errorMsg = document.getElementById('zen-schedule-error');
    const timeline = document.getElementById('zen-schedule-timeline');

    if (startStr >= endStr) {
        successMsg.classList.remove('show');
        errorMsg.classList.add('show');
        errorMsg.textContent = 'La hora de inicio debe ser anterior a la hora de fin.';
        return;
    }

    // --- ESCENARIO 2: VALIDACIÓN DE CONFLICTO DE HORARIOS ---
    let hasConflict = false;
    const existingBlocks = timeline.querySelectorAll('.time-block');

    // Convertir horas "HH:MM" a minutos totales desde las 00:00 para comparación matemática exacta
    const newStart = timeToMinutes(startStr);
    const newEnd = timeToMinutes(endStr);

    existingBlocks.forEach(block => {
        const blockStart = timeToMinutes(block.dataset.start);
        const blockEnd = timeToMinutes(block.dataset.end);

        // Fórmula de superposición de intervalos: (InicioA < FinB) && (FinA > InicioB)
        if (newStart < blockEnd && newEnd > blockStart) {
            hasConflict = true;
        }
    });

    if (hasConflict) {
        successMsg.classList.remove('show');
        errorMsg.classList.add('add', 'show');
        // Advertencia sutil sugiriendo ajustar las horas para evitar la sobrecarga
        errorMsg.textContent = '⚠️ Conflicto detectado: Las horas se superponen con un bloque existente. Ajusta tu horario para evitar la sobrecarga.';
        return;
    }

    // --- ESCENARIO 1: USUARIO CREA BLOQUE DE ESTUDIO EXITOSO ---
    errorMsg.classList.remove('show');

    const newBlock = document.createElement('div');
    newBlock.className = 'time-block';
    newBlock.style.gridTemplateColumns = '140px 1fr';
    newBlock.setAttribute('data-start', startStr);
    newBlock.setAttribute('data-end', endStr);

    newBlock.innerHTML = `
        <span class="time-label">${startStr} - ${endStr}</span>
        <div class="event-pill event-study">📖 Estudio Zen: ${subject}</div>
    `;

    timeline.appendChild(newBlock);

    successMsg.classList.add('show');
    successMsg.textContent = `Bloque para "${subject}" añadido al calendario correctamente ✓`;

    // Limpieza de inputs de texto
    document.getElementById('zen-study-subject').value = '';
    document.getElementById('zen-study-start').value = '';
    document.getElementById('zen-study-end').value = '';
}

function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours * 60) + minutes;
}

// Inicializador compatible con tu vitalis_main.js
window.bindStudySchedule = function() {
    // Los listeners se adjuntan directamente mediante los triggers del formulario nativo
};