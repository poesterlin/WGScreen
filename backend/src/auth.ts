import { YoutubeClient, YoutubeToken } from './helpers/env';
import { Youtube } from './routes/api/_youtube';

const youtube = new Youtube();

async function run() {
	const cred = await youtube.authorize(YoutubeClient, YoutubeToken);
	const req: any = await youtube.search(cred, 'query');

	console.log(req.data.items[0]);
}

run();
