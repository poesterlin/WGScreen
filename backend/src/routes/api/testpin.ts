import type { RequestHandler } from '@sveltejs/kit';
import cookie from 'cookie';
import { base } from '../../helpers/env';

export const get: RequestHandler = async (request) => {
	const headers = {
		'Set-Cookie': cookie.serialize('pin', request.query.get('pin'), {
			httpOnly: true,
			sameSite: true,
			path: '/',
			domain: base,
			maxAge: 60 * 60 * 24 * 7 // 1 week
		}),
		Location: request.headers.referer || '/'
	};

	return { headers, status: 302, body: 'cookie set' };
};
