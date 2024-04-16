
const dotenv = require('dotenv');
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const tokenExpiration = '1h'; // Example token expiration time

module.exports = {
  jwtSecret,
  tokenExpiration,
};
