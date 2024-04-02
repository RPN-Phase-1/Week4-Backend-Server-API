const app = require('./app');
const prisma = require('../prisma/client');
const config = require('./config/config');

let server;

const port = process.env.PORT || 4000;

server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


if (prisma) {
  console.log('Connected to Database');
  server = app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
