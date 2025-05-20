// --- Global Constants ---
const startTime = new Date();
const BANGLADESHI_TIME_OFFSET = 6; // Bangladesh is GMT+6
const TOTAL_AGENTS = 4; // Fixed total agents

// --- Utility Functions ---

/**
 * Gets the current time in Bangladesh (GMT+6).
 * @returns {Date} The current time in Bangladesh.
 */
const getBangladeshiTime = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * BANGLADESHI_TIME_OFFSET));
};

/**
 * Formats a duration in milliseconds to HH:MM:SS format.
 * @param {number} ms - The duration in milliseconds.
 * @returns {string} The formatted duration string.
 */
const formatDuration = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

/**
 * Generates a seeded pseudo-random number based on a given seed.
 * Ensures consistency for daily/hourly values.
 * @param {number} seed - The seed for the random number generator.
 * @returns {number} A pseudo-random number between 0 (inclusive) and 1 (exclusive).
 */
const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

/**
 * Calculates the ISO week number for a given Date object.
 * @param {Date} dateObj - The date for which to calculate the week number.
 * @returns {number} The ISO week number.
 */
const getISOWeek = (dateObj) => {
    const date = new Date(dateObj.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                            - 3 + (week1.getDay() + 6) % 7) / 7);
};


// --- Dashboard Update Functions ---

/**
 * Updates the deployed agents count based on system status and time.
 * Uses a seeded random number for weekly consistent hourly values.
 */
function updateDeployedAgents() {
    const bdTime = getBangladeshiTime();
    const bdHour = bdTime.getHours();
    const systemStatusElement = document.getElementById('system-operational-status');
    
    const systemStatus = systemStatusElement ? systemStatusElement.textContent : 'ACTIVE'; 

    if (systemStatus === 'PASSIVE') {
        updateValue('deployed-agents', 0); 
    } else {
        const weekNumber = getISOWeek(bdTime); // Use standalone function
        const dayOfWeek = bdTime.getDay(); 
        const seed = bdTime.getFullYear() + weekNumber + dayOfWeek + bdHour + 3000; 
        const randomValue = seededRandom(seed);

        const minDeployed = 1;
        const maxDeployed = TOTAL_AGENTS; // Use constant
        let deployedAgents = Math.floor(randomValue * (maxDeployed - minDeployed + 1)) + minDeployed;
        deployedAgents = Math.max(minDeployed, Math.min(maxDeployed, deployedAgents)); 
        updateValue('deployed-agents', deployedAgents);
    }
}

/**
 * Updates the anomaly status (level and trend) based on daily seeded random values.
 */
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

/**
 * Updates equipment status (condition and maintenance level) based on daily seeded random values.
 */
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

/**
 * Updates current cases and priority alerts based on daily seeded random values.
 */
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

/**
 * Updates the uptime display every second.
 */
function updateUptime() {
    const uptime = new Date().getTime() - startTime.getTime(); // Ensure both are numbers
    const uptimeElement = document.getElementById('uptime');
    if (uptimeElement) { 
        uptimeElement.textContent = formatDuration(uptime);
    }
}

/**
 * Updates the system's operational status (ACTIVE/PASSIVE) and corresponding icon
 * based on the time in Bangladesh.
 */
function updateSystemOperationalStatus() {
    const bdTime = getBangladeshiTime();
    const bdHour = bdTime.getHours();
    const statusElement = document.getElementById('system-operational-status');
    const indicatorElement = document.getElementById('status-indicator');

    if (!statusElement || !indicatorElement) return; 
    const iconElement = indicatorElement.querySelector('i'); 
    if (!iconElement) return; 

    let newStatus = 'ACTIVE';
    let newIconClass = 'fa-wifi'; 
    let oldIconClass = 'fa-power-off'; 
    let statusClassToRemove = 'status-passive';
    let statusClassToAdd = 'status-active';

    if (bdHour >= 1 && bdHour < 7) { // 1 AM to 7 AM Bangladeshi time (exclusive of 7 AM)
        newStatus = 'PASSIVE';
        newIconClass = 'fa-power-off'; // Icon for PASSIVE
        oldIconClass = 'fa-wifi';    // Icon for ACTIVE
        statusClassToRemove = 'status-active';
        statusClassToAdd = 'status-passive';
    }

    if (statusElement.textContent !== newStatus) { // Only update if status has changed
        statusElement.textContent = newStatus;
        indicatorElement.classList.remove(statusClassToRemove);
        indicatorElement.classList.add(statusClassToAdd);
        
        iconElement.classList.remove('fas', oldIconClass); // Remove old Font Awesome classes
        iconElement.classList.add('fas', newIconClass);   // Add new Font Awesome classes


        // Immediately update deployed agents when status changes to PASSIVE
        if (newStatus === 'PASSIVE') {
            updateDeployedAgents(); // Call it here to ensure immediate update to 0
        }
    }
}

// Function to perform daily updates
function performDailyUpdates() {
    updateCasesAndAlerts();
    updateAnomalyStatus();
    updateEquipmentStatus();
}

// Function to perform hourly updates
function performHourlyUpdates() {
    updateDeployedAgents(); // Now updates deployed agents (active agents) hourly
}

function initializeDashboard() {
    // Initial values (optional - daily updates will overwrite these soon)
    updateValue('current-cases', 4);
    updateValue('priority-alerts', 2);
    updateValue('total-agents', totalAgents); // Set total agents - fixed value
    updateValue('deployed-agents', 3); // Initial deployed (active) agents - can be a starting random value if needed
    updateValue('anomaly-level', 'MODERATE');
    updateValue('anomaly-trend', '▲ UP');
    updateValue('system-condition', 'NOMINAL');
    updateValue('maintenance-level', '98');

    updateSystemOperationalStatus(); // Initialize system status
    performDailyUpdates(); // Initial daily update
    updateDeployedAgents(); // Initial call to set deployed agents based on initial status
    updateUptime();     // VERY IMPORTANT: INITIAL CALL TO AVOID 00:00:00

    // Set intervals
    setInterval(updateUptime, 1000); // Update uptime every second
    setInterval(updateSystemOperationalStatus, 60000); // Update system status every minute
    setInterval(performHourlyUpdates, 3600000); // Update hourly stats
    setInterval(performDailyUpdates, 86400000); // Update daily stats every 24 hours

    // Run daily updates at the start of a new Bangladeshi day (midnight BDT)
    function setDailyUpdateTimer() {
        const now = getBangladeshiTime();
        const midnightBDT = new Date(now);
        midnightBDT.setHours(24, 0, 0, 0); // Set to next midnight
        let timeUntilMidnight = midnightBDT.getTime() - now.getTime();

        if (timeUntilMidnight < 0) {
            midnightBDT.setDate(midnightBDT.getDate() + 1); // If it's already past midnight, set to tomorrow's midnight
            timeUntilMidnight = midnightBDT.getTime() - now.getTime();
        }

        setTimeout(() => {
            performDailyUpdates();
            setDailyUpdateTimer(); // Reset timer for the next day
        }, timeUntilMidnight);
    }
    setDailyUpdateTimer(); // Start the daily update timer
}


// Initialize dashboard when the script loads
initializeDashboard();


// --- Advanced Interactivity Enhancements ---

/**
 * Applies a periodic and hover-triggered glitch effect to header text.
 */
function applyHeaderGlitch() {
    const header = document.querySelector('.header');
    if (!header) return;

    const h1 = header.querySelector('h1');
    const p = header.querySelector('p');
    const elementsToGlitch = [h1, p].filter(el => el !== null);

    elementsToGlitch.forEach(el => {
        const originalText = el.textContent;
        let glitchInterval;

        const startGlitch = () => {
            if (glitchInterval) clearInterval(glitchInterval);
            let i = 0;
            glitchInterval = setInterval(() => {
                if (i < 3) { // Number of quick glitches
                    const randomCharIndex = Math.floor(Math.random() * originalText.length);
                    const randomChar = String.fromCharCode(33 + Math.random() * 94); // Printable ASCII
                    el.textContent = originalText.substring(0, randomCharIndex) + randomChar + originalText.substring(randomCharIndex + 1);
                } else {
                    el.textContent = originalText; // Restore
                }
                i++;
                if (i >= 5) { // Control glitch duration/flicker
                     el.textContent = originalText; // Ensure original text is restored
                    clearInterval(glitchInterval);
                }
            }, 80); // Glitch speed
        };

        // Trigger glitch periodically and on hover
        setInterval(startGlitch, 5000 + Math.random() * 3000); // Random interval for periodic glitch
        el.addEventListener('mouseenter', startGlitch);
        // el.addEventListener('mouseleave', () => { // Optional: stop glitch on mouse leave
        //     clearInterval(glitchInterval);
        //     el.textContent = originalText;
        // });
    });
}


/**
 * Initializes hover effects for data cards and navigation buttons.
 * Data cards get a lift and glow effect.
 * Navigation buttons get a text flicker effect.
 */
function initializeHoverEffects() {
    // Data Cards
    const dataCards = document.querySelectorAll('.data-card');
    dataCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Ensure --accent-color-rgb is defined in CSS for this to work perfectly with current boxShadow.
            // Example: :root { --accent-color-rgb: 0, 255, 255; }
            // If not, the rgba value might be invalid. For now, assuming it's set or using a fallback.
            const accentColorRGB = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-rgb') || '0, 255, 255';

            card.animate([
                { transform: 'translateY(0) scale(1)', boxShadow: `3px 3px 0px var(--primary-bg), inset 0 0 10px rgba(0,0,0, 0.5), 0 0 8px rgba(${accentColorRGB}, 0.1)` },
                { transform: 'translateY(-5px) scale(1.02)', boxShadow: `5px 5px 5px var(--primary-bg), inset 0 0 12px rgba(0,0,0, 0.6), 0 0 15px rgba(${accentColorRGB}, 0.3)` }
            ], {
                duration: 200,
                easing: 'ease-out',
                fill: 'forwards'
            });
        });
        card.addEventListener('mouseleave', () => {
            const accentColorRGB = getComputedStyle(document.documentElement).getPropertyValue('--accent-color-rgb') || '0, 255, 255';
            card.animate([
                { transform: 'translateY(-5px) scale(1.02)', boxShadow: `5px 5px 5px var(--primary-bg), inset 0 0 12px rgba(0,0,0, 0.6), 0 0 15px rgba(${accentColorRGB}, 0.3)` },
                { transform: 'translateY(0) scale(1)', boxShadow: `3px 3px 0px var(--primary-bg), inset 0 0 10px rgba(0,0,0, 0.5), 0 0 8px rgba(${accentColorRGB}, 0.1)` }
            ], {
                duration: 200,
                easing: 'ease-in',
                fill: 'forwards'
            });
        });
    });

    // Navigation Buttons
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        const buttonTextEl = button.matches('a') ? button : button.querySelector('span') || button.firstChild; // More robust text element finding
        if (!buttonTextEl || buttonTextEl.nodeType !== Node.TEXT_NODE && !buttonTextEl.textContent.trim()) {
             // If it's an icon or empty span, don't apply text flicker
            if (button.querySelector('i.nav-icon')) return;
        }
        
        const originalText = buttonTextEl.textContent.trim();
        if (!originalText) return;


        const flickerText = (el, text) => {
            let count = 0;
            const maxFlickers = 4; // Flicker a few times
            const flickerInterval = setInterval(() => {
                if (count % 2 === 0) {
                    let scrambled = '';
                    for (let i = 0; i < text.length; i++) {
                        // Only scramble if not a space, to preserve multi-word layout
                        scrambled += (text[i] === ' ' || Math.random() > 0.7) ? text[i] : '_';
                    }
                    el.textContent = scrambled;
                } else {
                    el.textContent = text;
                }
                count++;
                if (count > maxFlickers) { 
                    clearInterval(flickerInterval);
                    el.textContent = text;
                }
            }, 80);
        };
        
        button.addEventListener('mouseenter', () => flickerText(buttonTextEl, originalText));
        button.addEventListener('focus', () => flickerText(buttonTextEl, originalText));
    });
}


/**
 * Updates the text content of an element with a scramble animation.
 * This is the primary function for updating dynamic values on the dashboard.
 * @param {string} elementId - The ID of the HTML element to update.
 * @param {string|number} newValue - The new value to display.
 */
function updateValue(elementId, newValue) { // Renamed from updateValueEnhanced
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with ID "${elementId}" not found for updateValue.`);
        return;
    }

    const originalText = String(newValue); 
    const currentText = element.textContent;
    // More thematic scramble characters
    const scrambleChars = "█▓▒░█▓▒░><!@#$%^&*?/\\|{}[]()01"; 
    let scrambleIteration = 0;
    const maxScrambles = originalText.length > 5 ? 8 : 5; // More scrambles for longer text
    const scrambleDuration = 40; 

    if (currentText === originalText && !element.classList.contains('value-change')) { // Avoid re-scrambling if already set and not mid-animation
        return;
    }
    
    // Clear any existing scramble interval for this element to prevent overlaps
    if (element.scrambleIntervalId) {
        clearInterval(element.scrambleIntervalId);
    }

    element.scrambleIntervalId = setInterval(() => {
        let displayText = '';
        for (let i = 0; i < originalText.length; i++) {
            // Determine if character should be scrambled or revealed
            const revealChar = scrambleIteration >= maxScrambles * (i / originalText.length);
            if (revealChar) {
                displayText += originalText[i];
            } else {
                displayText += scrambleChars.charAt(Math.floor(Math.random() * scrambleChars.length));
            }
        }
        element.textContent = displayText;

        scrambleIteration++;
        if (scrambleIteration >= maxScrambles + 2) { // Allow full text to show for a moment
            clearInterval(element.scrambleIntervalId);
            element.scrambleIntervalId = null; // Clear the stored interval ID
            element.textContent = originalText;
            element.classList.remove('value-change'); // Prepare for new animation
            void element.offsetWidth; // Trigger reflow
            element.classList.add('value-change'); // CSS animation for final reveal
        }
    }, scrambleDuration);
}


/**
 * Initializes subtle ambient visual effects like dynamic scanlines.
 */
function initializeAmbientEffects() {
    const gridOverlay = document.querySelector('.grid-overlay');
    const scanLine = document.querySelector('.scanline');

    if (gridOverlay) {
        // The grid overlay CSS is fairly static. Animating its properties (like background-size or gradient opacity)
        // directly via JS can be performance-intensive if not done carefully.
        // A more performant approach for subtle changes might involve CSS variables or a dedicated overlay opacity.
        // For now, the subtle CSS animation (if any) or static nature is kept.
        // If a JS-driven animation is desired, it should be very lightweight.
        // Example: Vary overall opacity of the .grid-overlay element itself (already present in CSS, but can be enhanced)
        // let gridOpacity = 0.7; // from _layout.scss
        // const animateGrid = () => {
        //     gridOverlay.style.opacity = gridOpacity + Math.sin(Date.now() / 4000) * 0.05; // Pulsates slightly
        //     requestAnimationFrame(animateGrid);
        // };
        // requestAnimationFrame(animateGrid); // Uncomment to enable
    }

    if (scanLine) {
        // The scanline already animates via CSS. JS could vary its opacity or other properties.
        const animateScanline = () => {
            // Example: Slightly vary scanline opacity for a more dynamic feel
            scanLine.style.opacity = 0.55 + Math.sin(Date.now() / 5000) * 0.1; // Pulsates opacity
            requestAnimationFrame(animateScanline);
        };
        requestAnimationFrame(animateScanline);
    }
}


/**
 * Central function to initialize all dashboard-specific JavaScript functionalities,
 * including data updates and interactive effects.
 */
function initializeInteractiveEffects() {
    applyHeaderGlitch();
    initializeHoverEffects();
    initializeAmbientEffects();
}

/**
 * Main initialization function for the dashboard page.
 * Sets up initial values, schedules periodic updates, and initializes interactive effects.
 */
function initializeDashboard() {
    // Set initial values using the (now enhanced) updateValue function
    updateValue('current-cases', 4);
    updateValue('priority-alerts', 2);
    updateValue('total-agents', TOTAL_AGENTS); 
    updateValue('deployed-agents', 3); 
    updateValue('anomaly-level', 'MODERATE');
    updateValue('anomaly-trend', '▲ UP');
    updateValue('system-condition', 'NOMINAL');
    updateValue('maintenance-level', '98');

    updateSystemOperationalStatus(); 
    performDailyUpdates(); 
    updateUptime(); // Initial call to set uptime immediately

    // Set intervals for periodic updates


    // Set intervals
    setInterval(updateUptime, 1000);
    setInterval(updateSystemOperationalStatus, 60000);
    setInterval(performHourlyUpdates, 3600000);
    setInterval(performDailyUpdates, 86400000);

    function setDailyUpdateTimer() {
        const now = getBangladeshiTime();
        const midnightBDT = new Date(now);
        midnightBDT.setHours(24, 0, 0, 0);
        let timeUntilMidnight = midnightBDT.getTime() - now.getTime();

        if (timeUntilMidnight < 0) {
            midnightBDT.setDate(midnightBDT.getDate() + 1);
            timeUntilMidnight = midnightBDT.getTime() - now.getTime();
        }

        setTimeout(() => {
            performDailyUpdates();
            setDailyUpdateTimer();
        }, timeUntilMidnight);
    }
    setDailyUpdateTimer();

    // Initialize new interactive effects
    initializeInteractiveEffects();
}

// Import and initialize page-specific scripts
import { initializePageSpecificScripts } from './js/page-specific.js';

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on a page that needs the main dashboard logic
    if (document.getElementById('system-operational-status')) { // A key element from index.html
        initializeDashboard();
    }
    
    // Initialize scripts specific to other pages
    initializePageSpecificScripts();
});
