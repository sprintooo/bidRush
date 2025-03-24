const express = require('express')
const cors = require('cors');
const morgan = require('morgan')

const router = require('./routes')
const config = require('./config')

const app = express()
const PORT = process.env.PORT

// config
console.log(`Running in ${config.nodeEnv} mode`);

// logging,
if (config.nodeEnv === 'dev') {
    app.use(morgan('combined'));
    console.log("Morgan enabled: Logging HTTP requests...");
}

// cors
app.use(cors())

// body parser
app.use(express.json())

// routes
app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})