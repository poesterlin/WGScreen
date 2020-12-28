module.exports = ({ env }) => ({
    email: {
        provider: 'sendgrid',
        providerOptions: {
            apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
            defaultFrom: 'philip@oesterlin.dev',
            defaultReplyTo: 'philip.oesterlin+strapi@gmail.com',
        },
    },
});