
const env = import.meta.env;

export const base = env.VITE_BASE ?? 'localhost';
export const port = env.VITE_PORT ?? 3000;
export const server = env.VITE_SERVER ?? `http://${base}:${port}/api/proxy/`;
export const dbServer = env.VITE_DBSERVER ?? `http://${base}:1337/`;
export const pw = env.VITE_PW ?? 'EMs2UMRq8S4hsfn';
export const user = env.VITE_USER ?? 'philip.oesterlin@gmail.com';
export const pin = env.VITE_PIN ?? '1234';

export function iH() {
    return { headers: { internal: '9b3cb6de-ebfc-4116-93b3-733cc5880816' } };
}