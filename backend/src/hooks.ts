import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';
import { iH, pin } from './helpers/env';
import { dev } from '$app/env';

const allowedPaths = ['/login', '/login/', '/login/undefined', '/api/testpin', '/upload', '/api/proxy/images'];

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');

	// console.log(request.path)
	// const isInternal = request.headers.internal === iH().headers.internal;

	// console.log(request.headers.internal, "=", iH().headers.internal)
	// console.log('internal:', isInternal, 'comparison', JSON.stringify({ is: cookies.pin, should: pin }), 'path:', request.path);
	// console.log("allowed anyways:", allowedPaths.includes(request.path))
	// console.log('check:', cookies.pin === pin)


	// if (!isInternal && (cookies.pin !== pin || !allowedPaths.includes(request.path))) {
	// 	const host = request.headers.host;

	// 	if (request.path.startsWith('/api/proxy')) {
	// 		console.log(request)
	// 		console.log("api call")
	// 		return { status: 404, body: JSON.stringify({ message: "unauthorized" }), headers: {} };
	// 	}

	// 	console.log("redirect")
	// 	return {
	// 		status: 302,
	// 		headers: {
	// 			Location: (dev ? 'http://' : 'https://') + host + '/login'
	// 		}
	// 	};
	// }

	// console.log("------- stay ------")

	request.locals.userid = cookies.userid || uuid();
	const response = await resolve(request);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
	}
	console.log(request.path, "------->>>>", response.status, "body: ", response.body?.slice(0, 50));

	return response;
};
