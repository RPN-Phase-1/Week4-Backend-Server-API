const app = require('./app');
const prisma = require('../prisma/client');

let server;
const port = 3000;

if (prisma) {
  // eslint-disable-next-line no-console
  console.log('Connected to Database');
  server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening to port ${port}`);
  });
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      // eslint-disable-next-line no-console
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  // eslint-disable-next-line no-console
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
