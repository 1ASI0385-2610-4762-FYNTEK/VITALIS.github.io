/* ============================================================
   US-05 | EP-01 | "Recibir alertas por estrés elevado"
   Como usuario quiero recibir alertas cuando mi nivel de estrés
   sea elevado para tomar pausas activas.
   ============================================================ */

function stressAlertTemplate() {
    return `
        <span class="zen-us-tag">Alertas por Estrés</span>
        <h3>Monitor de Alertas de Presión</h3>
        <p class="zen-timer-phrase">Simulación del motor de IA para detectar patrones críticos de sobrecarga.</p>
        
        <div style="display: flex; gap: 12px; margin-bottom: 16px;">
            <button class="mood-btn" id="zen-simulate-normal-stress" style="padding: 10px; font-size: 13px;">Simular Estrés Normal</button>
            <button class="mood-btn" id="zen-simulate-high-stress" style="padding: 10px; font-size: 13px; background-color: #FAFAFA; border-color: #111111;">Simular Patrón Crítico</button>
        </div>

        <div id="zen-stress-alert-notification" class="zen-rec-card" style="display: none; background-color: #FFFFFF; border: 2px solid #111111; border-left: 4px solid #111111;"></div>
        
        <div id="zen-post-alert-relaxation" class="study-form-container hidden-element" style="margin-top: 16px;"></div>
    `;
}

function bindStressAlert() {
    const btnNormal = document.getElementById('zen-simulate-normal-stress');
    const btnHigh = document.getElementById('zen-simulate-high-stress');
    const alertNotification = document.getElementById('zen-stress-alert-notification');
    const relaxationZone = document.getElementById('zen-post-alert-relaxation');

    if (!btnHigh) return;

    // Simulación de estado estable
    btnNormal.addEventListener('click', () => {
        alertNotification.style.display = 'none';
        relaxationZone.classList.add('hidden-element');
        alert('Patrón analizado: Niveles de estrés estables. No se requieren pausas activas.');
    });

    // Escenario 1: Sistema detecta estrés alto
    btnHigh.addEventListener('click', () => {
        relaxationZone.classList.add('hidden-element'); // Resetea estado previo

        alertNotification.style.display = 'block';
        alertNotification.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <strong style="color: #000000; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">⚠️ Alerta de Estrés Crítico Detectado</strong>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #666666;">Tus patrones de comportamiento indican un pico de sobrecarga cognitiva alto. Te recomendamos tomar un descanso.</p>
                </div>
            </div>
            <div class="zen-rec-actions" style="margin-top: 12px; display: flex;">
                <button class="btn-feedback-zen" id="zen-interact-alert-btn" style="width: 100%; max-width: 200px;">Tomar Pausa Activa</button>
            </div>
        `;

        // Escenario 2: Acceso a recomendaciones de relajación post-alerta
        document.getElementById('zen-interact-alert-btn').addEventListener('click', () => {
            alertNotification.style.display = 'none'; // Contrae la notificación al interactuar
            relaxationZone.classList.remove('hidden-element');

            relaxationZone.innerHTML = `
                <span id="user-role-badge" class="badge-student" style="font-size: 10px;">Zona de Mitigación Inmediata</span>
                <h4 style="font-family: 'Playfair Display', serif; margin: 12px 0 8px 0;">Guía Corta de Reducción Cognitiva</h4>
                <p style="font-size: 13.5px; color: #333333; margin-bottom: 16px;">Selecciona una técnica rápida para liberar la tensión acumulada:</p>
                
                <div class="calendar-timeline" style="display: flex; flex-direction: column; gap: 12px;">
                    <div class="time-block" style="grid-template-columns: 120px 1fr; cursor: pointer;" onclick="triggerBreathingFromAlert()">
                        <span class="time-label">Técnica 1</span>
                        <div class="event-pill event-study">🌬️ Respiración Guiada 4-7-8 (2 min)</div>
                    </div>
                    <div class="time-block" style="grid-template-columns: 120px 1fr; cursor: pointer;" onclick="triggerActiveBreakFromAlert()">
                        <span class="time-label">Técnica 2</span>
                        <div class="event-pill event-study">🧘 Estiramiento Ergonómico de Cuello (1 min)</div>
                    </div>
                </div>
            `;
        });
    });
}

// Funciones puente dinámicas para conectar con tus HUs existentes (US-16 y US-15)
window.triggerBreathingFromAlert = function() {
    const breathingStartBtn = document.getElementById('zen-breath-start');
    if (breathingStartBtn) {
        breathingStartBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => breathingStartBtn.click(), 500);
    } else {
        alert('Iniciando ciclo autónomo de respiración zen de 4 segundos... ¡Inhala!');
    }
};

window.triggerActiveBreakFromAlert = function() {
    const activeBreakBtn = document.getElementById('zen-break-accept');
    if (activeBreakBtn) {
        activeBreakBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => activeBreakBtn.click(), 500);
    } else {
        alert('Desplegando guía visual de estiramiento ergonómico de cuello.');
    }
};