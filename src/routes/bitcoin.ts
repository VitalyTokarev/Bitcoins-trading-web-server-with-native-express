import express from 'express';
import { makeValidateBody } from 'express-class-validator';

import { PutBitcoin } from '../utils/requests';
import { bitcoinController } from '../controllers/bitcoin-controller';

const router = express.Router();

router.get('/', bitcoinController.getBitcoin);
router.put('/', makeValidateBody(PutBitcoin), bitcoinController.putBitcoin);

export const bitcoinRouter = router;
