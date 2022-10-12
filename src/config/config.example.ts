export const config = {
  port: 3000,
  domain: 'localhost',
  https_enabled: false,
  database: {
    name: 'eshop-db',
    host: 'localhost',
    username: 'root',
    password: '',
    port: 3306,
    logging: true,
    synchronize: true,
  },
  jwt: {
    secret: 'Secret to change in production',
    expiresIn: 60 * 60 * 24,
  },
};
