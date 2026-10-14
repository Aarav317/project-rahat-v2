require('dotenv').config();
const { createApp } = require('./backend');
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || (process.env.RENDER ? '0.0.0.0' : '127.0.0.1');
const server = createApp().listen(port, host, () => console.log(process.env.RENDER ? `PROJECT RAHAT server listening on port ${port}` : `PROJECT RAHAT running at http://localhost:${port}`));
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? `Port ${port} is already used. Set PORT=4173 in .env and retry.` : error.code === 'EACCES' ? `Port ${port} cannot be opened on this computer. Try PORT=4173 in .env.` : 'The server could not start. Check the setup and troubleshooting guide.');
  process.exitCode = 1;
});
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 10000).unref();
});
