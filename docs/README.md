---
title: Command Center
editLink: false
lastUpdated: false
contributors: false
---

<div class="grid-overlay"></div>
<div class="scanline"></div>

<header class="header slide-down header-scan-effect">
  <h1>THE ECTOPLASMIC INVESTIGATORS</h1>
  <p>COMMAND CENTER // CLEARANCE LEVEL: ALPHA // OPERATIONAL STATUS: ONLINE</p>
</header>

<div class="intro-statement custom-card slide-down" style="text-align: center; margin-bottom: 1rem; animation-delay: 0.2s;">
  <p>Welcome, Investigator. You have accessed the central nexus of The Ectoplasmic Investigators. From this secure terminal, all field operations, data analysis, and spectral communications are monitored and coordinated. Current operational parameters are displayed below. Proceed with authorized access only.</p>
</div>

<div class="content-wrapper fade-in">
  <nav class="nav-section slide-in-left">
    <div class="status-panel">
      <span>STATUS: <span id="system-operational-status-vue">{{ systemOperationalStatus }}</span><span :class="['status-indicator', operationalStatusClass]" id="status-indicator-vue"></span></span>
    </div>
    <!-- Navbar links will be populated by VuePress config -->
  </nav>

  <main class="main-content slide-in-right">
    <div class="status-panel">
      <span>SYSTEM: <span id="system-status-vue">{{ systemStatus }}</span></span>&nbsp;&nbsp;<span>PRESENCE (UPTIME): <span id="uptime-vue">{{ uptime }}</span></span>
    </div>
    <div class="data-grid">
      <div class="data-card custom-card">
        <h3>ACTIVE INVESTIGATIONS</h3>
        <p>Current Cases: <span id="current-cases-vue" :class="{'value-change': currentCasesChanged}">{{ currentCases }}</span></p>
        <p>Priority Alerts: <span id="priority-alerts-vue" :class="{'value-change': priorityAlertsChanged}">{{ priorityAlerts }}</span></p>
      </div>
      <div class="data-card custom-card">
        <h3>FIELD AGENTS</h3>
        <p>Total Agents: <span id="total-agents-vue">{{ totalAgents }}</span></p>
        <p>Agents Deployed: <span id="deployed-agents-vue" :class="{'value-change': deployedAgentsChanged}">{{ deployedAgents }}</span></p>
      </div>
      <div class="data-card custom-card">
        <h3>ANOMALY READINGS</h3>
        <p>Level: <span id="anomaly-level-vue" :class="{'value-change': anomalyLevelChanged}">{{ anomalyLevel }}</span></p>
        <p>Trending: <span id="anomaly-trend-vue" :class="{'value-change': anomalyTrendChanged}">{{ anomalyTrend }}</span></p>
      </div>
      <div class="data-card custom-card">
        <h3>EQUIPMENT STATUS</h3>
        <p>Systems: <span id="system-condition-vue" :class="{'value-change': systemConditionChanged}">{{ systemCondition }}</span></p>
        <p>Maintenance: <span id="maintenance-level-vue" :class="{'value-change': maintenanceLevelChanged}">{{ maintenanceLevel }}</span>%</p>
      </div>
    </div>
  </main>
</div>

<footer class="site-footer slide-in-bottom">
  <p class="copyright-info">
    <i class="copyright-icon"></i> 2025 THE ECTOPLASMIC INVESTIGATORS
  </p>
  <p>UNAUTHORIZED ACCESS PROHIBITED. SPECTRAL TRACES LOGGED.</p>
</footer>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';

// Reactive variables for dynamic content
const systemOperationalStatus = ref('ACTIVE');
const systemStatus = ref('OPERATIONAL');
const uptime = ref('00:00:00');
const currentCases = ref(0);
const priorityAlerts = ref(0);
const totalAgents = ref(4); // Static value
const deployedAgents = ref(0);
const anomalyLevel = ref('ANALYZING...');
const anomalyTrend = ref('--');
const systemCondition = ref('ANALYZING...');
const maintenanceLevel = ref(0);

// For CSS animation on value change
const currentCasesChanged = ref(false);
const priorityAlertsChanged = ref(false);
const deployedAgentsChanged = ref(false);
const anomalyLevelChanged = ref(false);
const anomalyTrendChanged = ref(false);
const systemConditionChanged = ref(false);
const maintenanceLevelChanged = ref(false);

const triggerChangeAnimation = (changedRef) => {
  changedRef.value = true;
  setTimeout(() => { changedRef.value = false; }, 500);
};

watch(currentCases, () => triggerChangeAnimation(currentCasesChanged));
watch(priorityAlerts, () => triggerChangeAnimation(priorityAlertsChanged));
watch(deployedAgents, () => triggerChangeAnimation(deployedAgentsChanged));
watch(anomalyLevel, () => triggerChangeAnimation(anomalyLevelChanged));
watch(anomalyTrend, () => triggerChangeAnimation(anomalyTrendChanged));
watch(systemCondition, () => triggerChangeAnimation(systemConditionChanged));
watch(maintenanceLevel, () => triggerChangeAnimation(maintenanceLevelChanged));


const operationalStatusClass = computed(() => {
  return systemOperationalStatus.value === 'ACTIVE' ? 'status-active' : 'status-passive';
});

let uptimeInterval;
let statusInterval;
let hourlyUpdateInterval;
let dailyUpdateTimer;

const startTime = new Date(); // Uptime calculation base
const bangladeshiTimeOffset = 6;

function getBangladeshiTime() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * bangladeshiTimeOffset));
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Ensure Date.prototype.getWeek is defined if not available globally
// or define it as a helper function.
// For safety, defining as a helper:
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
}

function updateDeployedAgentsLogic() {
  const bdTime = getBangladeshiTime();
  const bdHour = bdTime.getHours();

  if (systemOperationalStatus.value === 'PASSIVE') {
    deployedAgents.value = 0;
  } else {
    const weekNo = getWeekNumber(bdTime);
    const dayOfWeek = bdTime.getDay(); // 0 (Sunday) to 6 (Saturday)
    const seed = bdTime.getFullYear() + weekNo + dayOfWeek + bdHour + 3000;
    const randomValue = seededRandom(seed);
    const minDeployed = 1;
    const maxDeployed = totalAgents.value; // Max deployed can't exceed total agents
    let newDeployedAgents = Math.floor(randomValue * (maxDeployed - minDeployed + 1)) + minDeployed;
    deployedAgents.value = Math.max(minDeployed, Math.min(maxDeployed, newDeployedAgents));
  }
}

function updateAnomalyStatusLogic() {
  const bdTime = getBangladeshiTime();
  const seed = bdTime.getDate() + (bdTime.getMonth() * 31) + (bdTime.getFullYear() * 365) + 1000;
  const randomValue = seededRandom(seed);
  const levels = ['LOW', 'MODERATE', 'HIGH', 'SEVERE', 'CRITICAL']; // Added CRITICAL
  const trends = ['▼ DECREASING', '► STABLE', '▲ INCREASING', ' fluctuating']; // More descriptive
  anomalyLevel.value = levels[Math.floor(randomValue * levels.length)];
  anomalyTrend.value = trends[Math.floor(randomValue * trends.length)];
}

function updateEquipmentStatusLogic() {
  const bdTime = getBangladeshiTime();
  const seed = bdTime.getDate() + (bdTime.getMonth() * 31) + (bdTime.getFullYear() * 365) + 2000;
  const randomValue = seededRandom(seed);
  const conditions = ['OPTIMAL', 'NOMINAL', 'STABLE', 'DEGRADED', 'CRITICAL FAILURE IMMINENT']; // Enhanced
  systemCondition.value = conditions[Math.floor(randomValue * conditions.length)];

  const minMaintenance = 60; // More variance
  const maxMaintenance = 100;
  let newMaintenance = Math.floor(randomValue * (maxMaintenance - minMaintenance + 1)) + minMaintenance;
  maintenanceLevel.value = Math.max(minMaintenance, Math.min(maxMaintenance, newMaintenance));
}

function updateCasesAndAlertsLogic() {
  const bdTime = getBangladeshiTime();
  const seed = bdTime.getDate() + (bdTime.getMonth() * 31) + (bdTime.getFullYear() * 365);
  const randomValue = seededRandom(seed);
  const minCases = 1;
  const maxCases = 7;
  currentCases.value = Math.floor(randomValue * (maxCases - minCases + 1)) + minCases;

  const minAlerts = 0;
  const maxAlerts = 5;
  priorityAlerts.value = Math.floor(randomValue * (maxAlerts - minAlerts + 1)) + minAlerts;
}

function updateUptimeLogic() {
  const uptimeMs = new Date() - startTime;
  uptime.value = formatDuration(uptimeMs);
}

function updateSystemOperationalStatusLogic() {
  const bdTime = getBangladeshiTime();
  const bdHour = bdTime.getHours();
  let newStatus = 'ACTIVE';
  let newSystemDbStatus = 'OPERATIONAL';

  if (bdHour >= 1 && bdHour < 7) { // 1 AM to 7 AM BDT for PASSIVE
    newStatus = 'PASSIVE';
    newSystemDbStatus = 'STANDBY';
  }

  if (systemOperationalStatus.value !== newStatus) {
    systemOperationalStatus.value = newStatus;
    systemStatus.value = newSystemDbStatus; // Link this to the operational status
    if (newStatus === 'PASSIVE') {
      updateDeployedAgentsLogic(); // Immediately update if status becomes PASSIVE
    }
  }
}

function performDailyUpdates() {
  updateCasesAndAlertsLogic();
  updateAnomalyStatusLogic();
  updateEquipmentStatusLogic();
}

function performHourlyUpdates() {
  updateDeployedAgentsLogic();
}

function initializeDashboard() {
  // Initial values set by refs already
  updateSystemOperationalStatusLogic(); // Set initial operational status
  performDailyUpdates(); // Perform initial daily updates
  updateDeployedAgentsLogic(); // Perform initial agent update based on status
  updateUptimeLogic(); // Perform initial uptime update

  // Set intervals
  uptimeInterval = setInterval(updateUptimeLogic, 1000);
  statusInterval = setInterval(updateSystemOperationalStatusLogic, 60000); // Check operational status every minute
  hourlyUpdateInterval = setInterval(performHourlyUpdates, 3600000); // Hourly updates

  // Daily update timer
  function setDailyUpdateTimer() {
    const now = getBangladeshiTime();
    const midnightBDT = new Date(now);
    midnightBDT.setHours(24, 0, 0, 0);
    let timeUntilMidnight = midnightBDT.getTime() - now.getTime();

    if (timeUntilMidnight < 0) {
      midnightBDT.setDate(midnightBDT.getDate() + 1);
      timeUntilMidnight = midnightBDT.getTime() - now.getTime();
    }

    clearTimeout(dailyUpdateTimer); // Clear existing timer before setting a new one
    dailyUpdateTimer = setTimeout(() => {
      performDailyUpdates();
      setDailyUpdateTimer(); // Reschedule for the next day
    }, timeUntilMidnight);
  }
  setDailyUpdateTimer();
}

onMounted(() => {
  if (typeof window !== 'undefined') { // Ensure code runs only in browser
    initializeDashboard();
  }
});

onUnmounted(() => {
  clearInterval(uptimeInterval);
  clearInterval(statusInterval);
  clearInterval(hourlyUpdateInterval);
  clearTimeout(dailyUpdateTimer);
});

</script>

<style scoped>
/* Add value-change animation if not already global */
.value-change {
  animation: valueUpdate 0.5s ease-in-out;
}

@keyframes valueUpdate {
  0% { color: var(--accent-color); transform: scale(1.1); }
  100% { color: var(--text-color); transform: scale(1); }
}
/* Ensure status indicators are styled (from original index.html) */
.status-indicator {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-left: 8px;
    animation: blink 1s step-end infinite;
}
.status-active {
    background-color: var(--success-color, #00ff99); /* Fallback color */
}
.status-passive {
    background-color: var(--passive-color, #aaa); /* Fallback color */
    animation: none;
    opacity: 0.7;
}
@keyframes blink {
    50% { opacity: 0; }
}
</style>
