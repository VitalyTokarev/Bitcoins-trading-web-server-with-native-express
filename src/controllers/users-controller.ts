import { Request, Response } from 'express';
import { User } from '../models/user';
import * as userService from '../services/users';

export async function getUserAsync (req: Request, res: Response) : Promise<void> {
  const user: User = await userService.getUser(req.params.id);

  res.send(user);
};

export async function postUserAsync (req: Request, res: Response) : Promise<void> {
  const user: User = await userService.createUser(req.body);

  res.send(user);
};

export async function putUserAsync (req: Request, res: Response) : Promise<void> {
  const user: User = await userService.putUser(req.body, req.params.id);

  res.send(user);
};

export async function getBalanceAsync (req: Request, res: Response) : Promise<void> {
  const balance = await userService.getBalance(req.params.id);

  res.send(balance);
};

export async function postUserUsdAsync (req: Request, res: Response) : Promise<void> {
  const user: User = await userService.changeUsdBalance(req.params.id, req.body);

  res.send(user);
};

export async function postUserBitcoinsAsync (req: Request, res: Response) : Promise<void> {
  const user: User = await userService.changeBitcoinsBalance(req.params.id, req.body);

  res.send(user);
};
