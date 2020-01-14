let dotenv = require('dotenv');
dotenv.config('./env');
export default {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  port: process.env.DB_PORT
};
