import fs from 'fs';
import readline from 'readline';
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;

export class Youtube {
    SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
    TOKEN_DIR = './credentials/';
    TOKEN_PATH;

    constructor() {
        this.TOKEN_PATH = this.TOKEN_DIR + 'youtube.json';
    }

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     *
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    public authorize(credentials, token) {
        credentials = JSON.parse(credentials);
        return new Promise(res => {
            var clientSecret = credentials.installed.client_secret;
            var clientId = credentials.installed.client_id;
            var redirectUrl = credentials.installed.redirect_uris[0];
            var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

            oauth2Client.credentials = JSON.parse(token.toString());
        });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     *
     * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback to call with the authorized
     *     client.
     */
    private getNewToken(oauth2Client, callback) {
        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.SCOPES
        });
        console.log('Authorize this app by visiting this url: ', authUrl);
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oauth2Client.getToken(code, (err, token) => {
                if (err) {
                    console.log('Error while trying to retrieve access token', err);
                    return;
                }
                oauth2Client.credentials = token;
                this.storeToken(token);
                callback(oauth2Client);
            });
        });
    }

    /**
     * Store token to disk be used in later program executions.
     *
     * @param {Object} token The token to store to disk.
     */
    private storeToken(token) {
        try {
            fs.mkdirSync(this.TOKEN_DIR);
        } catch (err) {
            if (err.code != 'EEXIST') {
                throw err;
            }
        }
        fs.writeFile(this.TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) throw err;
            console.log('Token stored to ' + this.TOKEN_PATH);
        });
    }

    /**
     * Lists the names and IDs of up to 10 files.
     *
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    public search(auth, query: string) {
        return new Promise((res) => {

            var service = google.youtube('v3');

            service.search.list({
                auth,
                part: 'id,snippet' as any,
                q: query,
                maxResults: 25,
                // videoSyndicated: 'true',
                type: ['video']
            }, function (err, response) {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    return;
                }
                res(response)
            });
        })
    }
}