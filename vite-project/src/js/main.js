// Global constants
const BANGladeshi_TIME_OFFSET = 6; // Bangladesh is GMT+6
const TOTAL_AGENTS = 4; // Fixed total agents

// DOM element IDs used by the dashboard
const DASHBOARD_ELEMENT_IDS = [
    'uptime', 'current-cases', 'priority-alerts', 'total-agents',
    'deployed-agents', 'anomaly-level', 'anomaly-trend',
    'system-condition', 'maintenance-level', 'system-operational-status',
    'status-indicator'
];

// --- Utility Functions ---

function getBangladeshiTime() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * BANGladeshi_TIME_OFFSET));
}

function formatDuration(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateValue(elementId, newValue) {
    const element = document.getElementById(elementId);
    // Guard clause: if element doesn't exist, do nothing.
    if (!element) {
        // console.warn(`Element with ID '${elementId}' not found for updateValue.`);
        return;
    }
    if (element.textContent !== String(newValue)) {
        element.textContent = String(newValue); // Ensure string conversion
        element.classList.remove('value-change');
        void element.offsetWidth; // Trigger reflow
        element.classList.add('value-change');
    }
}

function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Attaching to Date.prototype is generally maintained for this refactor pass
// to preserve original logic structure as much as possible.
// A future refactor might move this to a standalone utility.
if (!Date.prototype.getWeek) {
    Date.prototype.getWeek = function() {
        const date = new Date(this.getTime());
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        const week1 = new Date(date.getFullYear(), 0, 4);
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    };
}

// --- Dashboard Specific Functions ---

let startTime = null; // Will be initialized in initUptimeCounter

function initUptimeCounter() {
    startTime = new Date(); // Initialize startTime here
    const uptimeElement = document.getElementById('uptime');
    if (uptimeElement) {
        updateUptime(); // Initial call
    }
}

function updateUptime() {
    if (!startTime) return; // Guard if startTime not initialized
    const uptimeElement = document.getElementById('uptime');
    if (uptimeElement) { // Check if element exists
        const uptime = new Date().getTime() - startTime.getTime(); // Ensure startTime is a Date object
        uptimeElement.textContent = formatDuration(uptime);
    }
}


function updateDeployedAgents() {
    const bdTime = getBangladeshiTime();
    const bdHour = bdTime.getHours();
    const systemStatusElement = document.getElementById('system-operational-status');

    // If systemStatusElement doesn't exist, we can't determine status, so maybe default or log.
    // For now, assume if it's missing, it's not the main dashboard page.
    if (!systemStatusElement) return;
    const systemStatus = systemStatusElement.textContent;

    if (systemStatus === 'PASSIVE') {
        updateValue('deployed-agents', 0);
    } else {
        const weekNumber = bdTime.getWeek();
        const dayOfWeek = bdTime.getDay();
        const seed = bdTime.getFullYear() + weekNumber + dayOfWeek + bdHour + 3000;
        const randomValue = seededRandom(seed);
        const minDeployed = 1;
        const maxDeployed = TOTAL_AGENTS; // Use global const
        let deployedAgents = Math.floor(randomValue * (maxDeployed - minDeployed + 1)) + minDeployed;
        deployedAgents = Math.max(minDeployed, Math.min(maxDeployed, deployedAgents));
        updateValue('deployed-agents', deployedAgents);
    }
}

function updateAnomalyStatus() {
    const bdTime = getBangladeshiTime();
    const seed = bdTime.getDate() + (bdTime.getMonth() * 31) + (bdTime.getFullYear() * 365) + 1000;
    const randomValue = seededRandom(seed);
    const levels = ['LOW', 'MODERATE', 'HIGH', 'SEVERE'];
    const trends = ['▼ DOWN', '► STABLE', '▲ UP'];
    const levelIndex = Math.floor(randomValue * levels.length);
    const trendIndex = Math.floor(randomValue * trends.length);
    updateValue('anomaly-level', levels[levelIndex]);
    updateValue('anomaly-trend', trends[trendIndex]);
}

function updateEquipmentStatus() {
    const bdTime = getBangladeshiTime();
    const seed = bdTime.getDate() + (bdTime.getMonth() * 31) + (bdTime.getFullYear() * 365) + 2000;
    const randomValue = seededRandom(seed);
    const conditions = ['NOMINAL', 'OPTIMAL', 'STABLE'];
    const conditionIndex = Math.floor(randomValue * conditions.length);
    const minMaintenance = 86;
    const maxMaintenance = 100;
    let maintenance = Math.floor(randomValue * (maxMaintenance - minMaintenance + 1)) + minMaintenance;
    maintenance = Math.max(minMaintenance, Math.min(maxMaintenance, maintenance));
    updateValue('system-condition', conditions[conditionIndex]);
    updateValue('maintenance-level', maintenance);
}

function updateCasesAndAlerts() {
    const bdTime = getBangladeshiTime();
    const seed = bdTime.getDate() + (bdTime.getMonth() * 31) + (bdTime.getFullYear() * 365);
    const randomValue = seededRandom(seed);
    const minCases = 2;
    const maxCases = 5;
    let currentCases = Math.floor(randomValue * (maxCases - minCases + 1)) + minCases;
    updateValue('current-cases', currentCases);
    const minAlerts = 1;
    const maxAlerts = 3;
    let priorityAlerts = Math.floor(randomValue * (maxAlerts - minAlerts + 1)) + minAlerts;
    updateValue('priority-alerts', priorityAlerts);
}

function updateSystemOperationalStatus() {
    const bdTime = getBangladeshiTime();
    const bdHour = bdTime.getHours();
    const statusElement = document.getElementById('system-operational-status');
    const indicatorElement = document.getElementById('status-indicator');

    // If these critical elements don't exist, stop.
    if (!statusElement || !indicatorElement) return;

    let newStatus = 'ACTIVE';
    let statusClassToRemove = 'status-passive';
    let statusClassToAdd = 'status-active';

    if (bdHour >= 1 && bdHour < 7) {
        newStatus = 'PASSIVE';
        statusClassToRemove = 'status-active';
        statusClassToAdd = 'status-passive';
    }

    if (statusElement.textContent !== newStatus) {
        statusElement.textContent = newStatus;
        indicatorElement.classList.remove(statusClassToRemove);
        indicatorElement.classList.add(statusClassToAdd);
        if (newStatus === 'PASSIVE') {
            updateDeployedAgents();
        }
    }
}

function performDailyUpdates() {
    updateCasesAndAlerts();
    updateAnomalyStatus();
    updateEquipmentStatus();
}

function performHourlyUpdates() {
    updateDeployedAgents();
}

function setInitialDashboardValues() {
    updateValue('current-cases', 4);
    updateValue('priority-alerts', 2);
    updateValue('total-agents', TOTAL_AGENTS);
    updateValue('deployed-agents', 3);
    updateValue('anomaly-level', 'MODERATE');
    updateValue('anomaly-trend', '▲ UP');
    updateValue('system-condition', 'NOMINAL');
    updateValue('maintenance-level', '98');
}

function startUpdateIntervals() {
    setInterval(updateUptime, 1000);
    setInterval(updateSystemOperationalStatus, 60000);
    setInterval(performHourlyUpdates, 3600000);
    // setInterval(performDailyUpdates, 86400000); // Original daily update interval

    // Smarter daily update timer:
    function setDailyUpdateTimer() {
        const now = getBangladeshiTime();
        const midnightBDT = new Date(now);
        midnightBDT.setHours(24, 0, 0, 0);
        let timeUntilMidnight = midnightBDT.getTime() - now.getTime();

        if (timeUntilMidnight < 0) { // If already past midnight
            midnightBDT.setDate(midnightBDT.getDate() + 1); // Target tomorrow's midnight
            timeUntilMidnight = midnightBDT.getTime() - now.getTime();
        }

        setTimeout(() => {
            performDailyUpdates();
            setDailyUpdateTimer(); // Recursively set for the next day
        }, timeUntilMidnight);
    }
    setDailyUpdateTimer(); // Initialize the daily update timer
}

function initializeDashboard() {
    // Guard Clause: Check for essential dashboard elements
    const essentialElementsPresent = DASHBOARD_ELEMENT_IDS.every(id => document.getElementById(id));

    if (!essentialElementsPresent) {
        const missingElements = DASHBOARD_ELEMENT_IDS.filter(id => !document.getElementById(id));
        console.warn(`Dashboard elements not found: ${missingElements.join(', ')}. Skipping dashboard initialization.`);
        return;
    }

    console.log("Initializing dashboard..."); // Log for verification

    setInitialDashboardValues();
    updateSystemOperationalStatus(); // Initialize system status early
    initUptimeCounter(); // Initializes startTime and calls updateUptime
    performDailyUpdates(); // Initial daily update
    performHourlyUpdates(); // Initial hourly update (which includes deployed agents)

    startUpdateIntervals();
}

// Initialize dashboard when the script loads, but only if on the right page.
// The guard clause inside initializeDashboard will handle this.
initializeDashboard();
