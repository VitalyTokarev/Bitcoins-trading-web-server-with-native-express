import express from 'express';
import { makeValidateBody } from 'express-class-validator';

import { PutUser, PostUserUsd, PostUserBitcoins } from '../utils/requests';
import { User } from '../models/user';
import { usersController } from '../controllers/users-controller';

const router = express.Router();

router.get('/:id', usersController.getUser);
router.post('/', makeValidateBody(User), usersController.postUser);
router.put('/:id', makeValidateBody(PutUser), usersController.putUser);
router.get('/:id/balance', usersController.getBalance);
router.post('/:id/usd', makeValidateBody(PostUserUsd), usersController.postUserUsd);
router.post('/:id/bitcoins', makeValidateBody(PostUserBitcoins), usersController.postUserBitcoins);

export const usersRouter = router;
