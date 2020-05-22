import mongoose from 'mongoose';

import config from '../config/config';
import app from './express';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on('error', () => {
  throw new Error(`Error encontrado al conectar la base de datos ${mongoUri}`);
});

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('El servidor arriba en puerto %s.', config.port);
});
