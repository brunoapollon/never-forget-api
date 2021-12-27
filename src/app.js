require('dotenv/config');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const handleErros = require('./middlewares/handleErrors');

const express = require('express');

const routes = require('./index.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(handleErros);

const SereverHttp = http.createServer(app);

const io = new Server(SereverHttp, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  console.log(`Usuário conectado no socket ${socket.id}`);
});

module.exports = { SereverHttp, io };
