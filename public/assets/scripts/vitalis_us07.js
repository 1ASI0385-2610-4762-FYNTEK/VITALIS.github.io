/* ============================================================
   US-07 | EP-02 | "Desglose con IA"
   Como estudiante abrumado, quiero que la IA divida proyectos
   en subpasos, para evitar parálisis por análisis.
   ============================================================ */
function aiBreakdownTemplate() {
    return `
        <span class="zen-us-tag">Desglose con IA</span>
        <h3>IA Desglosar</h3>
        <input class="zen-input" id="zen-ai-task" placeholder="Ej: Terminar informe de estadística" />
        <button class="btn btn-primary" id="zen-ai-generate" style="margin-top:10px;">IA Desglosar</button>
        <ul class="zen-subtask-list" id="zen-ai-subtasks"></ul>
        <div class="zen-progress-track"><div class="zen-progress-fill" id="zen-ai-progress"></div></div>
    `;
}

function bindAIBreakdown() {
    document.getElementById('zen-ai-generate').addEventListener('click', () => {
        const taskInput = document.getElementById('zen-ai-task');
        const task = taskInput.value.trim() || 'tu tarea compleja';
        const list = document.getElementById('zen-ai-subtasks');
        const progress = document.getElementById('zen-ai-progress');

        // Escenario: Generación de subtareas accionables (mínimo 3)
        const subtasks = [
            `Investigar y reunir material sobre "${task}"`,
            `Redactar un primer borrador`,
            `Revisar y pulir la versión final`
        ];

        list.innerHTML = subtasks.map((s, i) => `
            <li>
                <input type="checkbox" data-index="${i}" class="zen-ai-checkbox" />
                <span>${s}</span>
            </li>
        `).join('');
        progress.style.width = '0%';

        const checkboxes = list.querySelectorAll('.zen-ai-checkbox');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                // Escenario: Actualización dinámica de progreso
                const checkedCount = list.querySelectorAll('.zen-ai-checkbox:checked').length;
                const pct = Math.round((checkedCount / checkboxes.length) * 100);
                progress.style.width = `${pct}%`;
            });
        });
    });
}