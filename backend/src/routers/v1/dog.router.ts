import express from 'express';
import { createDogHandler, deleteDogHandler, getAllDogsHandler, getDogByIdHandler, updateDogHandler } from '../../controllers/dog.controller';
import { validateRequestBody } from '../../validators';
import { dogSchema } from '../../validators/dog.validators';

const dogRouter = express.Router();

dogRouter.post('/', validateRequestBody(dogSchema), createDogHandler);
dogRouter.get('/', getAllDogsHandler);
dogRouter.get('/:id', getDogByIdHandler);
dogRouter.put('/:id', validateRequestBody(dogSchema), updateDogHandler);
dogRouter.delete('/:id', deleteDogHandler);

export default dogRouter;