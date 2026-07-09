/* ============================================================
   US-02 | EP-01 | "Monitorear niveles de estrés"
   Como usuario quiero visualizar mis niveles de estrés para
   conocer cómo evolucionan durante la semana.
   ============================================================ */
function stressChartTemplate() {
    return `
        <span class="zen-us-tag"> Monitorear niveles de estrés</span>
        <h3>Tu semana de estrés</h3>
        <div class="zen-chart-bars" id="zen-stress-chart"></div>
        <p class="zen-timer-phrase">Toca una barra para ver el detalle de ese día.</p>
        <div class="zen-rec-card" id="zen-stress-detail" style="display:none;"></div>
    `;
}

function bindStressChart() {

    const week = [
        { day: 'Lun', level: 35, cause: 'Día tranquilo, sin entregas.' },
        { day: 'Mar', level: 55, cause: 'Práctica calificada de Estadística.' },
        { day: 'Mié', level: 40, cause: 'Carga normal de clases.' },
        { day: 'Jue', level: 82, cause: 'Pico alto: entrega de proyecto + poco sueño (5h).' },
        { day: 'Vie', level: 60, cause: 'Exposición grupal en la tarde.' },
        { day: 'Sáb', level: 25, cause: 'Día de descanso.' },
        { day: 'Dom', level: 45, cause: 'Preparación para la semana siguiente.' }
    ];

    const chart = document.getElementById('zen-stress-chart');

    chart.innerHTML = week.map((d, i) => `
        <div class="zen-bar-col" data-index="${i}">
            <div class="zen-bar" style="height:${d.level}%;"></div>
            <span class="zen-bar-label">${d.day}</span>
        </div>
    `).join('');

    const detail = document.getElementById('zen-stress-detail');
    chart.querySelectorAll('.zen-bar-col').forEach(col => {
        col.addEventListener('click', () => {

            const d = week[col.dataset.index];
            detail.style.display = 'block';
            detail.innerHTML = `<strong>${d.day}</strong> · Nivel ${d.level}%<br>${d.cause}`;
        });
    });
}