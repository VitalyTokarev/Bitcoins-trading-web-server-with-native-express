import { Request, Response } from 'express';
// eslint-disable-next-line no-unused-vars
namespace bitcoinController {
  const { Bitcoin } = require('../models/bitcoin');
  const bitcoinService = require('../services/bitcoin');

  module.exports.getBitcoinAsync = async function (req: Request, res: Response) : Promise<void> {
    const bitcoin: InstanceType<typeof Bitcoin> = await bitcoinService.getBitcoin();

    res.status(200).send(bitcoin);
  };

  module.exports.putBitcoinAsync = async function (req: Request, res: Response) : Promise<void> {
    const bitcoin: InstanceType<typeof Bitcoin> = await bitcoinService.putBitcoin(req.body);

    res.status(200).send(bitcoin);
  };
}
