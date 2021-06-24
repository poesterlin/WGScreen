import { v4 as uuid } from '@lukeed/uuid';

if (!process) {
    var process = { env: {} as any }
}


const env = process.env;

export const base = env.base ?? 'localhost';
export const port = env.port ?? 3000;
export const server = env.server ?? `http://${base}:${port}/api/proxy/`;
export const dbServer = env.dbServer ?? `http://${base}:1337/`;
export const pw = env.pw ?? 'EMs2UMRq8S4hsfn';
export const user = env.user ?? 'philip.oesterlin@gmail.com';
export const pin = env.pin ?? '1234';
export const YoutubeToken = env.YoutubeToken;
export const YoutubeClient = env.YoutubeToken;

const internal = uuid();
export function iH() {
    return { headers: { internal } }
}