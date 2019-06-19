const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const logger = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//Global middleware
server.use(logger('dev'));
server.use(express.json());
server.use(helmet());

//Custom middleware
server.use(methodLogger);
server.use(addName);

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function methodLogger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}

function addName(req, res, next) {
  req.name = req.name || 'Eric';
  next();
}

module.exports = server;
