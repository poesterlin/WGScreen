import type { EndpointOutput, RequestHandler } from '@sveltejs/kit';
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

async function proxy(request: ServerRequest): Promise<EndpointOutput> {
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
		},
	};

	if (config.url.endsWith('.jpg') || config.url.endsWith('.jpeg') || config.url.endsWith('.png')) {
		config.responseType = 'arraybuffer'
	}

	console.log("--- api request ----")
	console.log(config.url, config.params);
	console.log("--- api request ----")

	let req: AxiosResponse;
	try {
		req = await axios.request(config);

		if (Buffer.isBuffer(req.data)) {
			return { body: req.data, headers: {...req.headers, "content-type": "application/octet-stream"}, status: req.status };
		}

		return { body: JSON.stringify(req.data), headers: req.headers, status: req.status };
	} catch (e) {
		credentials = undefined;
		return { body: { message: e.message }, status: 400 };
	}
}
