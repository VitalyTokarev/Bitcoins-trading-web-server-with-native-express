import { Bitcoin } from '../models/bitcoin';

async function getBitcoin (req, res, next) {
  try {
    const bitcoin: Bitcoin = await global.repository.GetBitcoin();

    res.status(200).send(bitcoin);
  } catch (err) {
    next(err);
  }
}

async function putBitcoin (req, res, next) {
  try {
    const bitcoin = await global.repository.PutBitcoin(req.body);

    res.status(200).send(bitcoin);
  } catch (err) {
    next(err);
  }
}

export const bitcoinController = {
  getBitcoin,
  putBitcoin
};
