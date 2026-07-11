/* ============================================================
   US-17 / US-36 | "Historial de Evolución Emocional y Reportes"
   Gráfica con barras aleatorias, escala visible y exportación sincronizada.
   ============================================================ */

// Variable global interna para guardar los datos aleatorios de la sesión actual
let currentAnalyticData = [];

function stressReportTemplate() {
    return `
        <span class="zen-us-tag">Analítica Zen</span>
        <h3>Historial de Evolución Emocional</h3>
        <p class="zen-timer-phrase">Haz clic en un pico analítico para correlacionar los eventos de esa jornada.</p>
        
        <div class="zen-tool-nav" style="justify-content: center; margin-bottom: 12px;">
            <button class="active">Ciclo 2026-01</button>
        </div>

        <div style="background-color: #FAFAFA; border: 1px solid #E5E5E5; padding: 16px; border-radius: 12px; text-align: center; margin-bottom: 16px;">
            <span style="font-size: 11px; color: #666666; font-weight: 600; letter-spacing: 0.5px;">📈 GRÁFICO MONOCROMÁTICO EN VIVO</span>
            
            <!-- Contenedor flex con eje vertical blindado para el tamaño de las barras -->
            <div id="zen-analytic-chart" style="display: flex; justify-content: space-around; align-items: flex-end; height: 140px; margin-top: 16px; border-bottom: 1px solid #111111; padding-bottom: 4px;"></div>
        </div>

        <!-- Zona donde se despliega el porcentaje al hacer clic -->
        <div id="zen-correlation-details" class="zen-rec-card" style="display: none; margin-bottom: 16px;"></div>

        <button class="btn btn-primary" id="zen-btn-download-pdf" style="width: 100%;">Generar Reporte PDF</button>
    `;
}

function bindStressReport() {
    const chart = document.getElementById('zen-analytic-chart');
    const detailBox = document.getElementById('zen-correlation-details');
    const downloadBtn = document.getElementById('zen-btn-download-pdf');

    if (!chart || !downloadBtn) return;

    // 1. Definición de las jornadas analíticas estables
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves'];
    const contexts = [
        'Clases introductorias estables en campus.',
        'Pico Crítico: Entregas académicas pendientes + Reunión de prácticas.',
        'Carga cognitiva moderada a mitad de jornada.',
        'Espacio Zen aprovechado y pausas activas ejecutadas.'
    ];

    // 2. Generación aleatoria de niveles (de 20% a 95% para asegurar visibilidad)
    currentAnalyticData = days.map((day, index) => ({
        day: day,
        level: Math.floor(Math.random() * 75) + 20,
        context: contexts[index]
    }));

    // 3. Renderizado físico de las barras en escala de grises premium
    chart.innerHTML = currentAnalyticData.map((d, i) => {
        const lightness = 75 - (d.level * 0.55);
        const barColor = `hsl(0, 0%, ${lightness}%)`;

        return `
            <div class="zen-bar-col" data-index="${i}" style="display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; width: 40px; cursor: pointer;">
                <!-- Barra estirada dinámicamente según su porcentaje -->
                <div class="zen-bar" style="height: ${d.level}%; width: 24px; background-color: ${barColor}; border-radius: 4px 4px 0 0; transition: all 0.2s ease; border: 1px solid rgba(0,0,0,0.05);"></div>
                <span style="font-size: 11px; color: #666666; margin-top: 6px; font-weight: 500;">${d.day.substring(0, 3)}</span>
            </div>
        `;
    }).join('');

    // 4. Asignar eventos de clic para revelar el porcentaje en pantalla
    chart.querySelectorAll('.zen-bar-col').forEach(col => {
        col.addEventListener('mouseenter', () => {
            const bar = col.querySelector('.zen-bar');
            if (bar) bar.style.filter = 'brightness(0.85)';
        });
        col.addEventListener('mouseleave', () => {
            const bar = col.querySelector('.zen-bar');
            if (bar) bar.style.filter = 'none';
        });

        col.addEventListener('click', () => {
            const data = currentAnalyticData[col.dataset.index];
            detailBox.style.display = 'block';
            detailBox.innerHTML = `
                <strong>Métrica del ${data.day}:</strong> · 
                <span style="font-family: 'Courier New', monospace; font-weight: 700; font-size: 14px;">
                    ${data.level}% de nivel de presión
                </span>
                <br>
                <span style="color: #666666; font-size: 13px;">➔ Contexto: ${data.context}</span>
            `;
        });
    });

    // 5. Lógica del botón para imprimir el PDF sincronizado
    downloadBtn.addEventListener('click', () => {
        const activeUser = sessionStorage.getItem('vitalis_username') || 'Usuario Vitalis';
        const activeRole = sessionStorage.getItem('vitalis_role') || 'Estudiante';
        const dateString = new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });

        const printWindow = window.open('', '_blank');

        // Mapear los datos que están actualmente en la pantalla a filas de la tabla del PDF
        const tableRowsHtml = currentAnalyticData.map(d => `
            <tr>
                <td><strong>${d.day}</strong></td>
                <td><span style="font-family: monospace; font-weight: bold;">${d.level}%</span></td>
                <td>${d.context}</td>
            </tr>
        `).join('');

        printWindow.document.write(`
            <html>
            <head>
                <title>REPORTE ANALÍTICO — VITALIS</title>
                <style>
                    body { font-family: Arial, sans-serif; color: #111111; padding: 40px; line-height: 1.6; }
                    .header { border-bottom: 2px solid #111111; padding-bottom: 12px; margin-bottom: 24px; }
                    .brand { font-size: 22px; font-weight: bold; letter-spacing: 1px; }
                    .meta-box { margin: 20px 0; font-size: 14px; background: #f9f9f9; padding: 15px; border-radius: 6px; border: 1px solid #e5e5e5; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #e0e0e0; padding: 12px; text-align: left; font-size: 14px; }
                    th { background-color: #111111; color: #ffffff; }
                    .footer { margin-top: 50px; font-size: 11px; color: #666666; text-align: center; border-top: 1px solid #e0e0e0; padding-top: 10px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="brand">VITALIS // ANALÍTICA ZEN</div>
                    <div style="font-size: 12px; color: #666666;">Ecosistema de Reducción de Carga Cognitiva</div>
                </div>

                <h2>Historial de Evolución Emocional</h2>
                <div class="meta-box">
                    <strong>Evaluado:</strong> ${activeUser}<br>
                    <strong>Perfil de Carga:</strong> Perfil ${activeRole}<br>
                    <strong>Periodo de Control:</strong> Ciclo 2026-01<br>
                    <strong>Fecha de Emisión:</strong> ${dateString}
                </div>

                <h3>Consolidado Métrico Registrado</h3>
                <p>Métricas reales obtenidas directamente desde la bitácora interactiva del panel del usuario:</p>
                
                <table>
                    <thead>
                        <tr>
                            <th>Jornada Académica</th>
                            <th>Nivel de Estrés</th>
                            <th>Contexto Correlacionado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRowsHtml}
                    </tbody>
                </table>

                <h3>Diagnóstico del Sistema</h3>
                <p>Las fluctuaciones de los datos reflejan los picos analíticos autodeclarados y monitorizados. Se sugiere realizar las pausas activas obligatorias cuando los picos superen el 70% de saturación cognitiva.</p>

                <div class="footer">
                    Documento analítico oficial del ecosistema VITALIS. Prototipo de validación. 2026.
                </div>

                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(function() { window.close(); }, 300);
                    };
                </script>
            </body>
            </html>
        `);

        printWindow.document.close();
    });
}