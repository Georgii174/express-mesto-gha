const dotenv =require('dotenv');
dotenv.config();

module.exports = {
  JWT_SECRT: 'super_secret-key',
  ...process.env
};
