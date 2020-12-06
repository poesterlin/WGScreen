module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'c1fa7f89190df0139ee4820fdf1d9121'),
      // url: '/dashboard'
    },
  },
});
