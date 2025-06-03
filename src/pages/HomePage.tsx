// src/pages/HomePage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import DataCard from '../components/Dashboard/DataCard';
import StatusPanel from '../components/Dashboard/StatusPanel';
import styles from './HomePage.module.css'; // Create this file

const TOTAL_AGENTS = 4;
const START_TIME = new Date();

// Helper: Format duration (HH:MM:SS)
const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

// Helper: Get Bangladeshi Time (GMT+6)
const getBangladeshiTime = (): Date => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * 6)); // 6 hours for GMT+6
};

// Helper: Seeded random number
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Helper: Get ISO week number
const getWeek = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
};

// Helper to apply animation class
const applyValueChangeAnimation = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
        // Ensure the class is added to the correct element (the span with class styles.value)
        element.classList.add(styles.valueChange); // From DataCard.module.css
        // Also try to add the direct class name if DataCard.module.css isn't fully processed by bundler for dynamic class add from parent
        element.classList.add('valueChange');
        setTimeout(() => {
            element.classList.remove(styles.valueChange);
            element.classList.remove('valueChange');
        }, 500); // Duration of animation
    }
};


const HomePage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(formatDuration(0));
  const [systemStatus, setSystemStatus] = useState<'OPERATIONAL' | 'PASSIVE'>('OPERATIONAL');
  const [operationalStatus, setOperationalStatus] = useState<'ACTIVE' | 'PASSIVE'>('ACTIVE');
  const [statusIndicator, setStatusIndicator] = useState<'active' | 'passive'>('active');

  // Dashboard Data States
  const [currentCases, setCurrentCases] = useState<number>(2);
  const [priorityAlerts, setPriorityAlerts] = useState<number>(1);
  const [deployedAgents, setDeployedAgents] = useState<number>(1);
  const [anomalyLevel, setAnomalyLevel] = useState<string>('ANALYZING...');
  const [anomalyTrend, setAnomalyTrend] = useState<string>('--');
  const [systemCondition, setSystemCondition] = useState<string>('ANALYZING...');
  const [maintenanceLevel, setMaintenanceLevel] = useState<number>(86);

  const updateValueWithAnimation = useCallback(<T extends string | number>(setter: React.Dispatch<React.SetStateAction<T>>, newValue: T, elementId: string) => {
    setter(prevValue => {
      if (prevValue !== newValue) {
        applyValueChangeAnimation(elementId);
      }
      return newValue;
    });
  }, []);

  // Update System Operational Status (based on BD time)
  const updateSystemOperationalStatus = useCallback(() => {
    const bdTime = getBangladeshiTime();
    const bdHour = bdTime.getHours();
    let newStatus: 'ACTIVE' | 'PASSIVE' = 'ACTIVE';
    if (bdHour >= 1 && bdHour < 7) { // 1 AM to 6:59 AM BDT
      newStatus = 'PASSIVE';
    }
    setOperationalStatus(newStatus);
    setStatusIndicator(newStatus === 'ACTIVE' ? 'active' : 'passive');
    // System status panel also reflects this
    setSystemStatus(newStatus === 'ACTIVE' ? 'OPERATIONAL' : 'PASSIVE');
     if (newStatus === 'PASSIVE') {
        updateValueWithAnimation(setDeployedAgents, 0, 'deployed-agents');
    }
  }, [updateValueWithAnimation]);


  // Update Deployed Agents (Hourly, depends on operationalStatus)
  const updateDeployedAgents = useCallback(() => {
    if (operationalStatus === 'PASSIVE') {
        updateValueWithAnimation(setDeployedAgents, 0, 'deployed-agents');
        return;
    }
    const bdTime = getBangladeshiTime();
    const weekNumber = getWeek(bdTime);
    const dayOfWeek = bdTime.getDay(); // 0 for Sunday, 1 for Monday, etc.
    // More varied seed for agents
    const seed = bdTime.getFullYear() * weekNumber * (dayOfWeek + 1) * bdTime.getHours() + 3000;
    const randomValue = seededRandom(seed);
    const minDeployed = 1; // At least one agent if active
    const maxDeployed = TOTAL_AGENTS;
    let agents = Math.floor(randomValue * (maxDeployed - minDeployed + 1)) + minDeployed;
    agents = Math.max(minDeployed, Math.min(maxDeployed, agents));
    updateValueWithAnimation(setDeployedAgents, agents, 'deployed-agents');
  }, [operationalStatus, updateValueWithAnimation]);


  // Update Cases and Alerts (Daily)
  const updateCasesAndAlerts = useCallback(() => {
    const bdTime = getBangladeshiTime();
    const seed = bdTime.getDate() + (bdTime.getMonth() * 31) + (bdTime.getFullYear() * 365);
    const randomValueCases = seededRandom(seed);
    const randomValueAlerts = seededRandom(seed + 1); // Slightly different seed for alerts
    updateValueWithAnimation(setCurrentCases, Math.floor(randomValueCases * (5 - 2 + 1)) + 2, 'current-cases'); // Min 2, Max 5
    updateValueWithAnimation(setPriorityAlerts, Math.floor(randomValueAlerts * (3 - 1 + 1)) + 1, 'priority-alerts'); // Min 1, Max 3
  }, [updateValueWithAnimation]);

  // Update Anomaly Status (Daily)
  const updateAnomalyStatus = useCallback(() => {
    const bdTime = getBangladeshiTime();
    const seed = bdTime.getDate() + (bdTime.getMonth() * 31) + (bdTime.getFullYear() * 365) + 1000;
    const randomValueLevel = seededRandom(seed);
    const randomValueTrend = seededRandom(seed + 1);
    const levels = ['LOW', 'MODERATE', 'HIGH', 'SEVERE'];
    const trends = ['▼ DOWN', '► STABLE', '▲ UP'];
    updateValueWithAnimation(setAnomalyLevel, levels[Math.floor(randomValueLevel * levels.length)], 'anomaly-level');
    updateValueWithAnimation(setAnomalyTrend, trends[Math.floor(randomValueTrend * trends.length)], 'anomaly-trend');
  }, [updateValueWithAnimation]);

  // Update Equipment Status (Daily)
  const updateEquipmentStatus = useCallback(() => {
    const bdTime = getBangladeshiTime();
    const seed = bdTime.getDate() + (bdTime.getMonth() * 31) + (bdTime.getFullYear() * 365) + 2000;
    const randomValueCondition = seededRandom(seed);
    const randomValueMaintenance = seededRandom(seed + 1);
    const conditions = ['NOMINAL', 'OPTIMAL', 'STABLE'];
    updateValueWithAnimation(setSystemCondition, conditions[Math.floor(randomValueCondition * conditions.length)], 'system-condition');
    updateValueWithAnimation(setMaintenanceLevel, Math.floor(randomValueMaintenance * (100 - 86 + 1)) + 86, 'maintenance-level'); // Min 86, Max 100
  }, [updateValueWithAnimation]);


  // Uptime (Every Second)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(formatDuration(new Date().getTime() - START_TIME.getTime()));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Initial and Interval Updates
  useEffect(() => {
    // Initial calls
    updateSystemOperationalStatus(); // This will call updateDeployedAgents if system becomes PASSIVE
    updateCasesAndAlerts();
    updateAnomalyStatus();
    updateEquipmentStatus();

    // If system is ACTIVE initially, call updateDeployedAgents explicitly
    // Need to check the initial state of operationalStatus after updateSystemOperationalStatus runs
    // A separate useEffect for operationalStatus change handles this better (see below)

    const hourlyTimer = setInterval(() => {
        // No need to check operationalStatus here, updateDeployedAgents does it internally
        updateDeployedAgents();
    }, 3600000); // Every hour

    const dailyTimer = setInterval(() => {
      updateCasesAndAlerts();
      updateAnomalyStatus();
      updateEquipmentStatus();
    }, 86400000); // Every 24 hours

    const statusTimer = setInterval(updateSystemOperationalStatus, 60000); // Every minute for operational status

    return () => {
      clearInterval(hourlyTimer);
      clearInterval(dailyTimer);
      clearInterval(statusTimer);
    };
  }, [updateSystemOperationalStatus, updateCasesAndAlerts, updateAnomalyStatus, updateEquipmentStatus, updateDeployedAgents]);

    // This effect specifically ensures deployed agents are updated when operationalStatus changes
    useEffect(() => {
        updateDeployedAgents();
    }, [operationalStatus, updateDeployedAgents]);


  return (
    <div className={styles.homePage}>
      <StatusPanel items={[
        { label: 'STATUS', value: operationalStatus, id: 'system-operational-status', indicator: statusIndicator }
      ]}/>
      <StatusPanel items={[
        { label: 'SYSTEM', value: systemStatus, id: 'system-status' },
        { label: 'PRESENCE', value: currentTime, id: 'uptime' }
      ]} />
      <div className={styles.dataGrid}>
        <DataCard title="ACTIVE INVESTIGATIONS" items={[
          { label: 'Current Cases', value: currentCases, id: 'current-cases' },
          { label: 'Priority Alerts', value: priorityAlerts, id: 'priority-alerts' }
        ]} />
        <DataCard title="FIELD AGENTS" items={[
          { label: 'Total Agents', value: TOTAL_AGENTS, id: 'total-agents' },
          { label: 'Agents Deployed', value: deployedAgents, id: 'deployed-agents' }
        ]} />
        <DataCard title="ANOMALY READINGS" items={[
          { label: 'Level', value: anomalyLevel, id: 'anomaly-level' },
          { label: 'Trending', value: anomalyTrend, id: 'anomaly-trend' }
        ]} />
        <DataCard title="EQUIPMENT STATUS" items={[
          { label: 'Systems', value: systemCondition, id: 'system-condition' },
          { label: 'Maintenance', value: `${maintenanceLevel}%`, id: 'maintenance-level' }
        ]} />
      </div>
    </div>
  );
};

export default HomePage;
