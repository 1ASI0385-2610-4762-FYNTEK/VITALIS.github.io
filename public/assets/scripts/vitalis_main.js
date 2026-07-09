/**
 * VITALIS MAIN - Inicializador Maestro del Ecosistema Zen
 * Crea dinámicamente los contenedores en el <main> vacío e inicializa las HUs de forma aislada
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("🧘 VITALIS: Inicializando el 100% del Product Backlog de manera unificada...");

    // 1. Crear el mallado completo de contenedores independientes en el DOM vacío
    createComprehensiveDashboardGrid();

    // 2. Encender la lógica interactiva aislada de cada archivo .js cargado
    initializeAllImplementedTools();
});

function createComprehensiveDashboardGrid() {
    const mainContainer = document.querySelector('main.dash-container');
    if (!mainContainer) return;

    if (!document.getElementById('zen-tools-container')) {
        const toolsGrid = document.createElement('div');
        toolsGrid.id = 'zen-tools-container';

        toolsGrid.style.display = 'grid';
        toolsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(400px, 1fr))';
        toolsGrid.style.gap = '32px';

        // Rejilla simétrica expandida: Un espacio exclusivo por cada módulo interactivo
        toolsGrid.innerHTML = `
            <div id="mood-tracking-zone" class="dash-card"></div>
            <div id="stress-monitor-zone" class="dash-card"></div>
            <div id="task-reminder-zone" class="dash-card"></div>
            <div id="stress-alert-zone" class="dash-card"></div>
            <div id="study-schedule-zone" class="dash-card"></div>
            <div id="ai-breakdown-zone" class="dash-card"></div>
            <div id="energy-filter-zone" class="dash-card"></div>
            <div id="burnout-alert-zone" class="dash-card"></div>
            <div id="active-break-zone" class="dash-card"></div>
            <div id="breathing-zone" class="dash-card"></div>
            <div id="pomodoro-zone" class="dash-card"></div>
            <div id="recommendations-zone" class="dash-card"></div>
            <div id="quotes-zone" class="dash-card"></div>
            <div id="sleep-tracker-zone" class="dash-card"></div>
            <div id="voice-dictation-zone" class="dash-card"></div>
            <div id="stress-report-zone" class="dash-card"></div>
            <div id="emergency-help-zone" class="dash-card"></div>
            <div id="hydration-tracker-zone" class="dash-card"></div>
            <!-- CASILLEROS DE LOS NUEVOS MÓDULOS DE CIERRE -->
            <div id="personal-goals-zone" class="dash-card"></div>
            <div id="academic-goals-zone" class="dash-card"></div>
            <div id="focus-mode-zone" class="dash-card"></div>
            <div id="screen-time-zone" class="dash-card"></div>
            <div id="critical-cycles-zone" class="dash-card"></div>
        `;
        mainContainer.appendChild(toolsGrid);
    }
}

function initializeAllImplementedTools() {
    if (typeof moodTrackingTemplate === 'function') {
        document.getElementById('mood-tracking-zone').innerHTML = moodTrackingTemplate();
        if (typeof bindMoodTracking === 'function') bindMoodTracking();
    }
    if (typeof stressChartTemplate === 'function') {
        document.getElementById('stress-monitor-zone').innerHTML = stressChartTemplate();
        if (typeof bindStressChart === 'function') bindStressChart();
    }
    if (typeof taskReminderTemplate === 'function') {
        document.getElementById('task-reminder-zone').innerHTML = taskReminderTemplate();
        if (typeof bindTaskReminder === 'function') bindTaskReminder();
    }
    if (typeof stressAlertTemplate === 'function') {
        document.getElementById('stress-alert-zone').innerHTML = stressAlertTemplate();
        if (typeof bindStressAlert === 'function') bindStressAlert();
    }
    if (typeof studyScheduleTemplate === 'function') {
        document.getElementById('study-schedule-zone').innerHTML = studyScheduleTemplate();
        if (typeof bindStudySchedule === 'function') bindStudySchedule();
    }
    if (typeof aiBreakdownTemplate === 'function') {
        document.getElementById('ai-breakdown-zone').innerHTML = aiBreakdownTemplate();
        if (typeof bindAIBreakdown === 'function') bindAIBreakdown();
    }
    if (typeof energyFilterTemplate === 'function') {
        document.getElementById('energy-filter-zone').innerHTML = energyFilterTemplate();
        if (typeof bindEnergyFilter === 'function') bindEnergyFilter();
    }
    if (typeof burnoutAlertTemplate === 'function') {
        document.getElementById('burnout-alert-zone').innerHTML = burnoutAlertTemplate();
        if (typeof bindBurnoutAlert === 'function') bindBurnoutAlert();
    }
    if (typeof activeBreakTemplate === 'function') {
        document.getElementById('active-break-zone').innerHTML = activeBreakTemplate();
        if (typeof bindActiveBreak === 'function') bindActiveBreak();
    }
    if (typeof breathingTemplate === 'function') {
        document.getElementById('breathing-zone').innerHTML = breathingTemplate();
        if (typeof bindBreathingTechnique === 'function') bindBreathingTechnique();
    }
    if (typeof pomodoroTemplate === 'function') {
        document.getElementById('pomodoro-zone').innerHTML = pomodoroTemplate();
        if (typeof bindPomodoroTimer === 'function') bindPomodoroTimer();
    }
    if (typeof recommendationsTemplate === 'function') {
        document.getElementById('recommendations-zone').innerHTML = recommendationsTemplate();
        if (typeof bindPersonalizedRecommendations === 'function') bindPersonalizedRecommendations();
    }
    if (typeof motivationalQuotesTemplate === 'function') {
        document.getElementById('quotes-zone').innerHTML = motivationalQuotesTemplate();
        if (typeof bindMotivationalQuotes === 'function') bindMotivationalQuotes();
    }
    if (typeof sleepTrackerTemplate === 'function') {
        document.getElementById('sleep-tracker-zone').innerHTML = sleepTrackerTemplate();
        if (typeof bindSleepTracker === 'function') bindSleepTracker();
    }
    if (typeof voiceDictationTemplate === 'function') {
        document.getElementById('voice-dictation-zone').innerHTML = voiceDictationTemplate();
        if (typeof bindVoiceDictation === 'function') bindVoiceDictation();
    }
    if (typeof stressReportTemplate === 'function') {
        document.getElementById('stress-report-zone').innerHTML = stressReportTemplate();
        if (typeof bindStressReport === 'function') bindStressReport();
    }
    if (typeof emergencyHelpTemplate === 'function') {
        document.getElementById('emergency-help-zone').innerHTML = emergencyHelpTemplate();
        if (typeof bindEmergencyHelp === 'function') bindEmergencyHelp();
    }
    if (typeof hydrationTrackerTemplate === 'function') {
        document.getElementById('hydration-tracker-zone').innerHTML = hydrationTrackerTemplate();
        if (typeof bindHydrationTracker === 'function') bindHydrationTracker();
    }

    // DISPARADORES DE LOS NUEVOS MÓDULOS DE CIERRE DEL SPRINT
    if (typeof personalGoalsTemplate === 'function') {
        document.getElementById('personal-goals-zone').innerHTML = personalGoalsTemplate();
        if (typeof bindPersonalGoals === 'function') bindPersonalGoals();
    }
    if (typeof academicGoalsTemplate === 'function') {
        document.getElementById('academic-goals-zone').innerHTML = academicGoalsTemplate();
        if (typeof bindAcademicGoals === 'function') bindAcademicGoals();
    }
    if (typeof focusModeTemplate === 'function') {
        document.getElementById('focus-mode-zone').innerHTML = focusModeTemplate();
        if (typeof bindFocusMode === 'function') bindFocusMode();
    }
    if (typeof screenTimeTemplate === 'function') {
        document.getElementById('screen-time-zone').innerHTML = screenTimeTemplate();
        if (typeof bindScreenTime === 'function') bindScreenTime();
    }
    if (typeof criticalCyclesTemplate === 'function') {
        document.getElementById('critical-cycles-zone').innerHTML = criticalCyclesTemplate();
        if (typeof bindCriticalCycles === 'function') bindCriticalCycles();
    }
}