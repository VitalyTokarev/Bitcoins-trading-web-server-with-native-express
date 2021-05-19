import { Request, Response } from 'express';
import { Bitcoin } from '../models/bitcoin';
import * as bitcoinService from '../services/bitcoin';

export const getBitcoinAsync = async function (req: Request, res: Response) : Promise<void> {
  const bitcoin: Bitcoin = await bitcoinService.getBitcoin();

  res.status(200).send(bitcoin);
};

export const putBitcoinAsync = async function (req: Request, res: Response) : Promise<void> {
  const bitcoin: Bitcoin = await bitcoinService.putBitcoin(req.body);

  res.status(200).send(bitcoin);
};
