const { SereverHttp } = require('./app');

SereverHttp.listen(3333, () => {
  console.log('Server is running on port 3333 👨‍💻');
});
