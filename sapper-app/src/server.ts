import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import Axios from 'axios';
import { pin, pw, server, user, base, port } from './helpers/env';
import cookieParser from 'cookie-parser';
import { guard } from '@beyonk/sapper-rbac';
import routes from "./routes"
import { readFileSync } from 'fs';
import { createServer } from 'https';
import http from 'http';
import * as cookie from "cookie";
import { Youtube } from './youtube';
import { getNewToken } from './auth';

let { NODE_ENV } = process.env;
const dev = true || NODE_ENV === 'development';
dev && console.log("dev mode")

const youtube = new Youtube();

let options: any = {};

if (!dev) {
	options.key = readFileSync(
		"/etc/letsencrypt/live/matlab.oesterlin.dev-0001/privkey.pem"
	);
	options.cert = readFileSync(
		"/etc/letsencrypt/live/matlab.oesterlin.dev-0001/cert.pem"
	);
	options.ca = readFileSync(
		"/etc/letsencrypt/live/matlab.oesterlin.dev-0001/chain.pem"
	);
}

async function auth() {
	let session
	try {
		const req = await Axios.post(server + 'admin/login', { email: user, password: pw });
		session = req.data;
	} catch (error) {
		console.log("starting server failed. Check env variables for authentication!");
		console.log(error.response.status, error.response.statusText);
	}
	start(session.data.user.username, session.data.token);
}

function start(user, token) {

	const { handler } = (polka() as any)
		.get('/testpin/:pin', (req, res) => {
			res.setHeader('Set-Cookie', cookie.serialize('pin', req.params.pin, {
				httpOnly: true,
				sameSite: true,
				secure: !dev,
				path: "/",
				domain: base,
				maxAge: 60 * 60 * 24 * 7 // 1 week
			}));

			// Redirect back after setting cookie
			res.statusCode = 302;
			res.setHeader('Location', req.headers.referer || '/');
			res.end();
			return;
		})
		.get('/search/:query', async (req, res) => {
			const token = await youtube.readToken()
			const cred = await youtube.authorize(token);
			const results = await youtube.search(cred, req.params.query);

			res.end(JSON.stringify((results as any).data.items));
		})
		.use(
			compression({ threshold: 0 }),
			sirv('static', { dev }),
			cookieParser(),
			(req, res) => {
				const cookie = req.cookies['pin'];
				const authenticated = cookie ? cookie === pin : false;

				const scope = { scope: ['screen'] };

				const options = {
					routes,
					deny: () => {
						res.writeHead(302, { Location: '/login' });
						return res.end();
					},
					grant: () => {
						return sapper.middleware({
							session: () => (authenticated ? { user: scope, token, username: user, authenticated } : {})
						})(req, res)
					}
				}

				const result = guard(req.path, scope, options)
				return result;
			}
		)


	let create: any = createServer;
	if (dev) {
		create = http.createServer;
	}

	create(options, handler).listen(port, () => {
		console.log(`> Running on port ${port}`);
	});
}




auth();
getNewToken()

