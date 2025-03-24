const dotenv = require('dotenv');

// Determine which .env file to load
const envFile = process.env.NODE_ENV === 'prod' ? '.env.production' : '.env.development';

dotenv.config({ path: envFile });

const config = {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || 'dev',
    secretKey: process.env.JWT_SECRET,
};

module.exports = config;
