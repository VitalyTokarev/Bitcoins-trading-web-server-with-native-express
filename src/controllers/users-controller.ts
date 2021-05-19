import { Request, Response } from 'express';

// eslint-disable-next-line no-unused-vars
namespace usersController {
  const { User } = require('../models/user');
  const userService = require('../services/users');

  module.exports.getUserAsync = async function (req: Request, res: Response) : Promise<void> {
    const user: InstanceType<typeof User> = await userService.getUser(req.params.id);

    res.send(user);
  };

  module.exports.postUserAsync = async function (req: Request, res: Response) : Promise<void> {
    const user = await userService.createUser(req.body);

    res.send(user);
  };

  module.exports.putUserAsync = async function (req: Request, res: Response) : Promise<void> {
    const user = await userService.putUser(req.body, req.params.id);

    res.send(user);
  };

  module.exports.getBalanceAsync = async function (req: Request, res: Response) : Promise<void> {
    const balance = await userService.getBalance(req.params.id);

    res.send(balance);
  };

  module.exports.postUserUsdAsync = async function (req: Request, res: Response) : Promise<void> {
    const user = await userService.changeUsdBalance(req.params.id, req.body);

    res.send(user);
  };

  module.exports.postUserBitcoinsAsync = async function (req: Request, res: Response) : Promise<void> {
    const user = await userService.changeBitcoinsBalance(req.params.id, req.body);

    res.send(user);
  };
}
