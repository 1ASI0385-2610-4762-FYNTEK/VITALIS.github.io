/* ============================================================
   US-19 | EP-03 | "Botón de Ayuda en Crisis"
   Como usuario en crisis, quiero un botón de contacto rápido,
   para tener ayuda de emergencia inmediata.
   ============================================================ */
function emergencyHelpTemplate() {
    return `
        <span class="zen-us-tag" style="color: #c62828;">Auxilio Zen</span>
        <h3>Zona de Respiro & Emergencia</h3>
        <p class="zen-timer-phrase">Si experimentas crisis de pánico o desborde emocional, accede a canales directos.</p>
        
        <button class="btn btn-secondary" id="zen-btn-trigger-crisis" style="width: 100%; border-color: #c62828; color: #c62828;">🆘 Necesito Ayuda Inmediata</button>
        
        <div id="zen-crisis-directory" class="study-form-container hidden-element" style="margin-top: 16px; background-color: #fff5f5; border-color: #ffcdd2;">
            <h4 style="margin: 0 0 8px 0; color: #c62828;">Líneas de Apoyo Psicológico Gratuito</h4>
            <ul class="zen-subtask-list" style="margin-bottom: 0;">
                <li style="justify-content: space-between; border-color: #ffcdd2;">
                    <span>📞 Central de Salud Mental Minsa (Línea 113)</span>
                    <button class="btn-feedback-zen" style="flex: none; padding: 6px 12px;" onclick="alert('Simulando marcación directa al 113... Llamando...')">Llamar</button>
                </li>
                <li style="justify-content: space-between; border-color: #ffcdd2;">
                    <span>🏫 Soporte Emocional y de Orientación UPC</span>
                    <button class="btn-feedback-zen" style="flex: none; padding: 6px 12px;" onclick="alert('Simulando enlace directo con el área de bienestar estudiantil UPC.')">Contactar</button>
                </li>
            </ul>
        </div>
    `;
}

function bindEmergencyHelp() {
    const triggerBtn = document.getElementById('zen-btn-trigger-crisis');
    const directory = document.getElementById('zen-crisis-directory');

    if (!triggerBtn) return;

    triggerBtn.addEventListener('click', () => {
        // Escenario 1: Acceso inmediato a recursos de apoyo en crisis
        directory.classList.toggle('hidden-element');
    });
}