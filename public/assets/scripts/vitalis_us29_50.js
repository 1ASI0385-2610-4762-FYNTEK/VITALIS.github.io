/* ============================================================
   US-29 / US-50 | EP-04/08 | "Registrar metas personales"
   Como usuario quiero registrar metas personales para mantener
   un equilibrio integral entre el estudio y mi vida personal.
   ============================================================ */
function personalGoalsTemplate() {
    return `
        <span class="zen-us-tag">Equilibrio de Vida</span>
        <h3>Mis Metas Personales</h3>
        <p class="zen-timer-phrase">Establece propósitos fuera del entorno académico para mitigar el burnout.</p>
        
        <form id="form-zen-goals" onsubmit="saveZenPersonalGoal(event)" style="display: flex; gap: 8px; margin-bottom: 16px;">
            <input type="text" id="zen-goal-input" required placeholder="Ej: Correr 30 min o leer un libro" class="register-input" style="flex: 1; padding: 10px; font-size: 13px;">
            <button type="submit" class="btn btn-primary" style="padding: 10px 20px; flex: none;">Añadir</button>
        </form>

        <p class="zen-success" id="zen-goal-success"></p>
        
        <ul class="zen-subtask-list" id="zen-goals-list-container">
            <li><input type="checkbox" onchange="this.nextElementSibling.style.textDecoration = this.checked ? 'line-through' : 'none'"> <span>Hacer 15 min de meditación Zen</span></li>
            <li><input type="checkbox" onchange="this.nextElementSibling.style.textDecoration = this.checked ? 'line-through' : 'none'"> <span>Cenar lejos de las pantallas</span></li>
        </ul>
    `;
}

function saveZenPersonalGoal(e) {
    e.preventDefault();
    const input = document.getElementById('zen-goal-input');
    const container = document.getElementById('zen-goals-list-container');
    const success = document.getElementById('zen-goal-success');

    if (!input || !container) return;

    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" onchange="this.nextElementSibling.style.textDecoration = this.checked ? 'line-through' : 'none'"> <span>${input.value.trim()}</span>`;
    container.appendChild(li);

    success.classList.add('show');
    success.textContent = 'Meta de equilibrio añadida con éxito ✓';

    setTimeout(() => success.classList.remove('show'), 3000);
    input.value = '';
}

window.bindPersonalGoals = function() {};