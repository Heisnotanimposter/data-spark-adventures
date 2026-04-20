import { getMachineId } from './hardwareBinding';

const BOUNCER_URL = 'http://localhost:4000';

export interface LicenseStatus {
  active: boolean;
  reason?: string;
}

export const checkLicense = async (userId: string, repoId: number): Promise<LicenseStatus> => {
  const machineId = getMachineId();
  
  try {
    const response = await fetch(`${BOUNCER_URL}/bouncer/verify?userId=${userId}&repoId=${repoId}&machineId=${machineId}`);
    if (!response.ok) {
      return { active: false, reason: 'License Verification Failed' };
    }
    
    const data = await response.json();
    return { active: data.active, reason: data.reason };
  } catch (error) {
    return { active: false, reason: 'Connectivity Error' };
  }
};

// --- The Suicide Mechanism ---
export const startSentinel = (userId: string, repoId: number) => {
  console.log('Sentinel Active. Monitoring license...');
  
  const monitor = setInterval(async () => {
    const status = await checkLicense(userId, repoId);
    if (!status.active) {
      console.error(`[SENTINEL ERROR] ${status.reason}`);
      console.warn('PROTECTION PROTOCOL TRIGGERED: Closing Application.');
      
      // In a real compiled binary, this would be process.exit(1)
      // For this React demo, we'll trigger a UI lockout.
      window.dispatchEvent(new CustomEvent('sentinel_lockout', { detail: status.reason }));
      clearInterval(monitor);
    }
  }, 10000); // Check every 10 seconds
};
