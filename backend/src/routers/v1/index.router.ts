import express from 'express';
import pingRouter from './ping.router';
import dogRouter from './dog.router';

const v1Router = express.Router();

v1Router.use('/ping', pingRouter);
v1Router.use('/dogs', dogRouter);

export default v1Router;