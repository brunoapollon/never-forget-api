import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import express from 'express';

import { handleErros } from './middlewares/handleErrors';

import routes from './index.routes';

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

export { SereverHttp, io };
