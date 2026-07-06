import express from 'express';
import { Express } from 'express';
import cors from 'cors';
import { serverConfig } from './config';
import v1Router from './routers/v1/index.router';
import { appErrorHandler, genericErrorHandler } from './middlewares/error.middleware';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { connectDB } from './config/database';
import { seedDogs } from './utils/seeder';

const app: Express = express();

app.use(cors());
app.use(express.json());

// Regestering all the routers and their corresponding routes with out app server object.
app.use(attachCorrelationIdMiddleware);
app.use('/api/v1', v1Router);

app.use(appErrorHandler);
// Middleware to handle errors
app.use(genericErrorHandler);

app.listen(serverConfig.PORT, async () => {
    console.log(`Server is running on http://localhost:${serverConfig.PORT}`);

    await connectDB();
    console.log("Connected to MongoDB successfully");
    
    await seedDogs();
})