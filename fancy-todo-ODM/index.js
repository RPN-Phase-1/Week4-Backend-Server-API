require('dotenv').config()
const app = require('./app');
const mongoose = require('mongoose')


let server;
let port = 3000

async function main() {
    try {
      await mongoose.connect(process.env.DATABASE_URL);
      console.log('Connected to MongoDB');
      server = app.listen(port, () => {
        console.log(`Listening to port ${port}`);
      });
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  
  main();

// mongoose.connect(process.env.DATABASE_URL, {
// //   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB')
//   server = app.listen(port, () => {
//     console.log(`Listening to port ${port}`);
//   });
// });


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