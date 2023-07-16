const dotenv =require('dotenv');
dotenv.config();

export const {
  JWT_SECRT = 'super_secret-key'
} = process.env;