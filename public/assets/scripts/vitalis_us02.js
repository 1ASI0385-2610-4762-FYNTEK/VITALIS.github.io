/* ============================================================
   US-02 | EP-01 | "Monitorear niveles de estrés"
   Se genera estrés aleatorio con escalado de altura corregido.
   ============================================================ */

function stressChartTemplate() {
    return `
        <span class="zen-us-tag">Monitorear niveles de estrés</span>
        <h3>Tu semana de estrés</h3>
        <!-- Caja contenedora principal con espacio de altura reservado y definido -->
        <div class="zen-chart-bars" id="zen-stress-chart" style="display: flex; align-items: flex-end; justify-content: space-between; height: 180px; margin: 24px 0; border-bottom: 1px solid #E5E5E5; padding-bottom: 8px;"></div>
        <p class="zen-timer-phrase">Toca una barra para ver el detalle de ese día.</p>
        <div class="zen-rec-card" id="zen-stress-detail" style="display:none;"></div>
    `;
}

function bindStressChart() {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const chart = document.getElementById('zen-stress-chart');
    const detail = document.getElementById('zen-stress-detail');

    if (!chart) return;

    // Generación de datos aleatorios para la simulación de la semana
    const weekData = days.map(day => ({
        day: day,
        level: Math.floor(Math.random() * 75) + 20 // Distribución de 20% a 95% para asegurar excelente dinamismo visual
    }));

    chart.innerHTML = weekData.map((d, i) => {
        // Cálculo monocromático: Mayor nivel = Gris más oscuro
        const lightness = 75 - (d.level * 0.55);
        const barColor = `hsl(0, 0%, ${lightness}%)`;

        return `
            <div class="zen-bar-col" data-index="${i}" style="display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; flex: 1; cursor: pointer;">
                <!-- Contenedor interno de la barra con altura explícita basada en el porcentaje real -->
                <div class="zen-bar" style="height: ${d.level}%; width: 24px; background-color: ${barColor}; border-radius: 4px 4px 0 0; transition: all 0.25s ease; border: 1px solid rgba(0,0,0,0.05);"></div>
                <span class="zen-bar-label" style="font-size: 12px; color: #666666; margin-top: 8px; font-weight: 500;">${d.day}</span>
            </div>
        `;
    }).join('');

    // Control de eventos e interacciones de la gráfica
    chart.querySelectorAll('.zen-bar-col').forEach(col => {
        col.addEventListener('mouseenter', () => {
            const bar = col.querySelector('.zen-bar');
            if (bar) {
                bar.style.filter = 'brightness(0.85)';
                bar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }
        });
        col.addEventListener('mouseleave', () => {
            const bar = col.querySelector('.zen-bar');
            if (bar) {
                bar.style.filter = 'none';
                bar.style.boxShadow = 'none';
            }
        });

        col.addEventListener('click', () => {
            const d = weekData[col.dataset.index];
            detail.style.display = 'block';

            let statusText = '✓ Nivel controlado bajo el Espacio Zen.';
            if (d.level > 75) {
                statusText = '⚠️ Pico crítico de tensión. Sugerimos pausa activa.';
            } else if (d.level > 45) {
                statusText = '⚡ Carga cognitiva moderada de jornada universitaria.';
            }

            detail.innerHTML = `
                <strong>Métricas del ${d.day}:</strong> · 
                <span style="font-family: 'Courier New', monospace; font-weight: 700; font-size: 15px;">
                    ${d.level}% de nivel de estrés
                </span>
                <br>
                <small style="color: #666666; display: inline-block; margin-top: 4px;">${statusText}</small>
            `;
        });
    });
}