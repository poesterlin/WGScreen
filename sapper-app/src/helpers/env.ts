export const base = "localhost"
export const port = 3000;
export const server = "http://" + base + ":1337/";
export const pw = "EMs2UMRq8S4hsfn";
export const user = "wgscreen@test.com";
export const pin = "1234";

export function makeAuth(session) {
    if (!session.authenticated) {
        return {};
    }
    return {
        headers: {
            Authorization: `Bearer ${session.token}`,
        },
    }
}