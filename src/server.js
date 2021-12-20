require('dotenv/config');
const cors = require('cors');

const handleErros = require('./middlewares/handleErrors');

const express = require('express');

const routes = require('./index.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(handleErros);

app.listen(3333, () => {
  console.log('Server is running on port 3333 👨‍💻');
});
