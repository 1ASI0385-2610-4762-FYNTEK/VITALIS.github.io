/* ============================================================
   US-38 / US-39 | EP-06 | "Objetivos Académicos y Semanales"
   Como usuario quiero registrar objetivos para mejorar mi
   productividad y desempeño universitario semanal.
   ============================================================ */
function academicGoalsTemplate() {
    return `
        <span class="zen-us-tag">Hitos Académicos</span>
        <h3>Objetivos de la Semana</h3>
        <p class="zen-timer-phrase">Planifica tus entregas críticas para mantener el control de tu ciclo.</p>
        
        <div class="zen-progress-track"><div class="zen-progress-fill" id="zen-academic-progress" style="width: 33%;"></div></div>
        
        <ul class="zen-subtask-list" id="zen-academic-goals-list">
            <li><input type="checkbox" checked class="academic-cb"> <span>Revisar rúbrica del informe final (UPC)</span></li>
            <li><input type="checkbox" class="academic-cb"> <span>Completar el Sprint 2 de la plataforma</span></li>
            <li><input type="checkbox" class="academic-cb"> <span>Estudiar ejercicios para la PC2</span></li>
        </ul>
    `;
}

function bindAcademicGoals() {
    const list = document.getElementById('zen-academic-goals-list');
    const progress = document.getElementById('zen-academic-progress');

    if (!list || !progress) return;

    const checkboxes = list.querySelectorAll('.academic-cb');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const checkedCount = list.querySelectorAll('.academic-cb:checked').length;
            const pct = Math.round((checkedCount / checkboxes.length) * 100);
            progress.style.width = `${pct}%`;
        });
    });
}