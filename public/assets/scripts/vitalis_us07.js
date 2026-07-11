/* ============================================================
   US-07 | EP-02 | "Desglose con IA"
   Lógica corregida para la actualización real de la barra de progreso.
   ============================================================ */

function aiBreakdownTemplate() {
    return `
        <span class="zen-us-tag">Desglose con IA</span>
        <h3>IA Desglosar</h3>
        <p class="zen-timer-phrase" style="text-align: left; margin-bottom: 12px;">Introduce una meta compleja para fragmentarla en pasos accionables.</p>
        
        <input class="zen-input" id="zen-ai-task" placeholder="Ej: Terminar informe de estadística" />
        <button class="btn btn-primary" id="zen-ai-generate" style="margin-top: 14px; width: 100%;">IA Desglosar</button>
        
        <!-- Contenedor de la lista de subtareas fragmentadas -->
        <ul class="zen-subtask-list" id="zen-ai-subtasks"></ul>
        
        <!-- Barra de progreso con dimensiones explícitas y definidas para evitar colapsos -->
        <div class="zen-progress-track" style="width: 100%; height: 8px; background-color: #ECECF0; border-radius: 10px; overflow: hidden; margin: 20px 0; display: none;" id="zen-ai-progress-container">
            <div class="zen-progress-fill" id="zen-ai-progress" style="width: 0%; height: 100%; background-color: #111111; transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);"></div>
        </div>
        
        <p class="zen-success" id="zen-breakdown-success"></p>
    `;
}

function bindAIBreakdown() {
    const generateBtn = document.getElementById('zen-ai-generate');
    if (!generateBtn) return;

    generateBtn.addEventListener('click', () => {
        const taskInput = document.getElementById('zen-ai-task');
        const task = taskInput.value.trim() || 'tu tarea compleja';
        const list = document.getElementById('zen-ai-subtasks');
        const progressFill = document.getElementById('zen-ai-progress');
        const progressContainer = document.getElementById('zen-ai-progress-container');
        const successMsg = document.getElementById('zen-breakdown-success');

        if (!list || !progressFill || !progressContainer) return;

        // Escenario: Generación de subtareas accionables personalizadas según la entrada
        const subtasks = [
            `Investigar y reunir material sobre "${task}"`,
            `Redactar un primer borrador estructurado`,
            `Revisar, pulir y consolidar la versión final`
        ];

        // Inyección dinámica de los ítems con estilos de espaciado elegantes
        list.innerHTML = subtasks.map((s, i) => `
            <li style="display: flex; align-items: center; gap: 12px; padding: 14px; background-color: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 10px; margin-bottom: 10px;">
                <input type="checkbox" data-index="${i}" class="zen-ai-checkbox" style="width: 18px; height: 18px; accent-color: #111111; cursor: pointer;" />
                <span style="font-size: 14px; color: #111111; transition: all 0.2s ease;">${s}</span>
            </li>
        `).join('');

        // Resetear y mostrar la barra de progreso e historial de mensajes
        progressContainer.style.display = 'block';
        progressFill.style.width = '0%';
        if (successMsg) successMsg.classList.remove('show');

        // Capturar los eventos de cambio de estado en los checkboxes inyectados
        const checkboxes = list.querySelectorAll('.zen-ai-checkbox');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                const textLabel = cb.nextElementSibling;

                // Efecto visual monocromático tachado al marcar el pendiente
                if (cb.checked) {
                    if (textLabel) {
                        textLabel.style.textDecoration = 'line-through';
                        textLabel.style.opacity = '0.4';
                    }
                } else {
                    if (textLabel) {
                        textLabel.style.textDecoration = 'none';
                        textLabel.style.opacity = '1';
                    }
                }

                // MATEMÁTICA DE ACTUALIZACIÓN EN TIEMPO REAL
                const checkedCount = list.querySelectorAll('.zen-ai-checkbox:checked').length;
                const percentage = Math.round((checkedCount / checkboxes.length) * 100);

                // Mover la barra físicamente
                progressFill.style.width = `${percentage}%`;

                // Lanzar feedback de logro al completar el 100% de los subpasos fragmentados
                if (percentage === 100 && successMsg) {
                    successMsg.classList.add('show');
                    successMsg.textContent = '¡Felicidades! Completaste todos los pasos de forma balanceada sin sobrecarga cognitiva ✓';
                } else if (successMsg) {
                    successMsg.classList.remove('show');
                }
            });
        });
    });
}