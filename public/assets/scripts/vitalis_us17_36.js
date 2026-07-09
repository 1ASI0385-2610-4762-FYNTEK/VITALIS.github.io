/* ============================================================
   US-17 / US-36 | EP-03/05 | "Historial de Presión & Reportes"
   Como usuario quiero un resumen de mis niveles de presión para
   entender qué me afecta y poder descargar un reporte PDF.
   ============================================================ */
function stressReportTemplate() {
    return `
        <span class="zen-us-tag">Analítica Zen</span>
        <h3>Historial de Evolución Emocional</h3>
        <p class="zen-timer-phrase">Haz clic en un pico analítico para correlacionar los eventos de esa jornada.</p>
        
        <div class="zen-tool-nav" style="justify-content: center; margin-bottom: 12px;">
            <button class="active" onclick="alert('Filtrando rango: Ciclo Académico Actual 2026-01')">Ciclo 2026-01</button>
        </div>

        <div style="background-color: #FAFAFA; border: 1px solid #E5E5E5; padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 16px;">
            <span style="font-size: 12px; color: #666666; font-weight: 600;">📈 GRÁFICO MONOCROMÁTICO EN VIVO</span>
            <div style="display: flex; justify-content: space-around; align-items: flex-end; height: 100px; margin-top: 12px; border-bottom: 1px solid #111111;">
                <div style="width: 20px; height: 30px; background-color: #111111; cursor: pointer;" onclick="showStressCorrelation('Lunes', '30%', 'Clases introductorias estables.')"></div>
                <div style="width: 20px; height: 85px; background-color: #666666; cursor: pointer;" onclick="showStressCorrelation('Martes', '85%', 'Pico Crítico: Cruce de entregas UPC + Reunión de prácticas.')"></div>
                <div style="width: 20px; height: 45px; background-color: #111111; cursor: pointer;" onclick="showStressCorrelation('Miércoles', '45%', 'Carga cognitiva moderada.')"></div>
                <div style="width: 20px; height: 20px; background-color: #111111; cursor: pointer;" onclick="showStressCorrelation('Jueves', '20%', 'Espacio Zen aprovechado.')"></div>
            </div>
        </div>

        <div id="zen-correlation-details" class="zen-rec-card" style="display: none; margin-bottom: 16px;"></div>

        <button class="btn btn-primary" id="zen-btn-download-pdf" style="width: 100%;">Generar Reporte PDF</button>
    `;
}

function bindStressReport() {
    const downloadBtn = document.getElementById('zen-btn-download-pdf');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', () => {
        // Escenario: US-36 Generar documentos descargables
        alert("📥 VITALIS // Exportación Exitosa\n\nSe ha generado un documento PDF detallado que consolida tus métricas de estrés y ánimo del periodo académico actual.");
    });
}

window.showStressCorrelation = function(day, percentage, event) {
    const detailBox = document.getElementById('zen-correlation-details');
    if (!detailBox) return;
    // Escenario 2: Correlación entre eventos y carga emocional
    detailBox.style.display = 'block';
    detailBox.innerHTML = `<strong>Métrica del ${day}:</strong> Nivel de estrés en ${percentage}.<br><span style="color: #666666;">➔ Contexto: ${event}</span>`;
};