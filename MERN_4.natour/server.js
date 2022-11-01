const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

//node env
//console.log(process.env);
//express env
//console.log(`mode: ${app.get('env')}`);
//mongoose
const db = process.env.MONGODB;

mongoose.connect(db).then(() => {
  // console.log(con.connections);
  console.log('DB connection successful');
});
// .catch(err=> console.log("Error"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandler rejection ...');
  server.close(() => {
    process.exit(1);
  });
});
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exeption ...');
  server.close(() => {
    process.exit(1);
  });
});

// console.log(x);
