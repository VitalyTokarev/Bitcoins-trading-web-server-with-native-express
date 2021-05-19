import { Request, Response } from 'express';
import { User } from '../models/user';
import * as userService from '../services/users';

export const getUserAsync = async function (req: Request, res: Response) : Promise<void> {
  const user: User = await userService.getUser(req.params.id);

  res.send(user);
};

export const postUserAsync = async function (req: Request, res: Response) : Promise<void> {
  const user: User = await userService.createUser(req.body);

  res.send(user);
};

export const putUserAsync = async function (req: Request, res: Response) : Promise<void> {
  const user: User = await userService.putUser(req.body, req.params.id);

  res.send(user);
};

export const getBalanceAsync = async function (req: Request, res: Response) : Promise<void> {
  const balance = await userService.getBalance(req.params.id);

  res.send(balance);
};

export const postUserUsdAsync = async function (req: Request, res: Response) : Promise<void> {
  const user: User = await userService.changeUsdBalance(req.params.id, req.body);

  res.send(user);
};

export const postUserBitcoinsAsync = async function (req: Request, res: Response) : Promise<void> {
  const user: User = await userService.changeBitcoinsBalance(req.params.id, req.body);

  res.send(user);
};
