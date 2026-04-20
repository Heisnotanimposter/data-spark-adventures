import os from 'os';
import crypto from 'crypto';

export const getMachineId = (): string => {
  const networkInterfaces = os.networkInterfaces();
  const macAddresses = Object.values(networkInterfaces)
    .flat()
    .filter((iface: any) => iface && iface.mac && iface.mac !== '00:00:00:00:00:00')
    .map((iface: any) => iface.mac)
    .sort();

  const idString = `${os.hostname()}-${macAddresses.join('-')}`;
  return crypto.createHash('sha256').update(idString).digest('hex');
};
