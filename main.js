const config = require('./config');
const app = require('./app');

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
