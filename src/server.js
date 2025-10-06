import 'dotenv/config';
import app from './app.js';
import validateEnv from './config/validateEnv.js';

validateEnv();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`
KiFome Server started
Ambient: ${process.env.NODE_ENV}
URL: http://localhost:${PORT}
Health check: http://localhost:${PORT}/health`);
});

process.on('SIGTERM', () => {
  console.log('Closing gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('unhandledRejection', err => {
  console.error('❌ Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});
