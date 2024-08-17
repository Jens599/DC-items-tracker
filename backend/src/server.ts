import express from 'express';
import mongoose from 'mongoose';
import ItemRoutes from './routes/item.routes';

const app = express();

const MongoDB_Connection_String = 'mongodb://0.0.0.0:27017/CRUD_APP';
const Port = 4000;

mongoose.connect(MongoDB_Connection_String).then(() => {
  app.listen(Port, () => {
    console.log(`Success!! Listening on port ${Port}`);
  });
});

app.use(express.json());

app.use('/it', ItemRoutes);
