const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const router = require('./routes');
const config = require('./config');

const app = express();

// Log current environment
console.log(`Running in ${config.nodeEnv} mode`);

// Logging
if (config.nodeEnv === 'development') {
    app.use(morgan('combined'));
    console.log('Morgan enabled: Logging HTTP requests...');
}

// CORS
app.use(cors());

// Body parser
app.use(express.json());

// Routes
app.use(router);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ success: false, message: 'Not Found' });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;

