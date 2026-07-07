
/* ============================================================
   US-09 | EP-02 | "Filtrado por Energía"
   Como usuario agotado, quiero sugerencias de tareas según mi
   energía, para no forzar mi salud mental.
   ============================================================ */
function energyFilterTemplate() {
    return `
        <span class="zen-us-tag">US-09 · Filtrado por energía</span>
        <h3>¿Cómo está tu energía hoy?</h3>
        <div class="zen-tool-nav" id="zen-energy-options">
            <button data-energy="baja">Baja</button>
            <button data-energy="media">Media</button>
            <button data-energy="alta">Alta</button>
        </div>
        <ul class="zen-subtask-list" id="zen-energy-tasks"></ul>
    `;
}

function bindEnergyFilter() {
    const tasksByEnergy = {
        baja: ['Ordenar apuntes 10 min', 'Responder 1 correo pendiente', 'Revisar el calendario de mañana'],
        media: ['Avanzar una sección del informe', 'Repasar flashcards 20 min', 'Planificar la semana'],
        alta: ['Terminar el proyecto de Estadística', 'Preparar la exposición grupal', 'Adelantar dos capítulos de lectura']
    };

    const buttons = document.querySelectorAll('#zen-energy-options button');
    const list = document.getElementById('zen-energy-tasks');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const energy = btn.dataset.energy;

            // Escenario: Sugerencia de tareas por carga cognitiva
            list.innerHTML = tasksByEnergy[energy].map(t => `
                <li><input type="checkbox" class="zen-energy-checkbox" /><span>${t}</span></li>
            `).join('');

            // Escenario: Reevaluación de estado energético post-tarea
            list.querySelectorAll('.zen-energy-checkbox').forEach(cb => {
                cb.addEventListener('change', () => {
                    if (cb.checked) {
                        setTimeout(() => alert('¿Tu energía subió tras completar esta tarea? Ajustaremos la siguiente sugerencia.'), 200);
                    }
                });
            });
        });
    });
}
