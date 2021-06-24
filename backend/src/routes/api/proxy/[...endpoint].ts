import type { RequestHandler } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { dbServer, pw, user } from '../../../../src/helpers/env';

export const get: RequestHandler = proxy;
export const post: RequestHandler = proxy;
export const put: RequestHandler = proxy;
export const del: RequestHandler = proxy;

let credentials: { token: string };

async function login() {
	let login;
	try {
		const req = await axios.post(dbServer + 'admin/login', { email: user, password: pw });
		login = req.data;
	} catch (error) {
		console.log('starting server failed. Check env variables for authentication!');
		return {
			token: 'token'
		};
	}
	return {
		token: login.data.token as string
	};
}

async function proxy(request: ServerRequest) {
	if (!credentials) {
		credentials = await login();
	}

	const config: AxiosRequestConfig = {
		method: request.method as Method,
		data: request.body,
		url: dbServer + request.params.endpoint,
		params: request.query,
		headers: {
			...request.headers,
			Authorization: `Bearer ${credentials.token}`
		}
	};

	// console.log(config.url)
	let req: AxiosResponse;
	try {
		req = await axios.request(config);
		return { body: req.data };
	} catch (e) {
        credentials = undefined;
		return { body: { message: e.message }, status: 400 };
	}
}
