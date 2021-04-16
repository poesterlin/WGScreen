import { Youtube } from "./youtube";


const youtube = new Youtube();

async function run() {
    const token = await youtube.readToken()
    const cred = await youtube.authorize(token);
    const req: any = await youtube.search(cred, 'query');

    console.log(req.data.items[0])
}

run();