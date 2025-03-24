const dotenv = require('dotenv');

// Determine which .env file to load
const envFile = process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev';

dotenv.config({ path: envFile });

const config = {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || 'dev',
};

module.exports = config;
