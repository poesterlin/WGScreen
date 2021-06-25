import { Youtube } from "./youtube";


const youtube = new Youtube();

export async function getNewToken() {
    const token = await youtube.readToken()
    const cred = await youtube.authorize(token);
    const req: any = await youtube.search(cred, 'query');

    console.log(req.data.items[0])
}
