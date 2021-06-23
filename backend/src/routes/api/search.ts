import type { RequestHandler } from '@sveltejs/kit';
import { YoutubeClient, YoutubeToken } from '../../helpers/env';
import { Youtube } from './_youtube';

const youtube = new Youtube();

export const get: RequestHandler = async (request) => {
	const cred = await youtube.authorize(YoutubeClient, YoutubeToken);
	const results = await youtube.search(cred, request.params.query);

	return { body: (results as any).data.items };
};
