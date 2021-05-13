import { User } from '../models/user';
import { userNotFound, ErrorHandler } from '../utils/errors';

async function getUser (req, res, next) {
  try {
    const user: User = await global.repository.GetUser(req.params.id);

    if (!user) {
      throw userNotFound();
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function postUser (req, res, next) {
  try {
    const user = await global.repository.CreateUser(req.body);

    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function putUser (req, res, next) {
  try {
    const user = await global.repository.UpdateUser(req.body, req.params.id);

    if (!user) {
      throw userNotFound();
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function getBalance (req, res, next) {
  try {
    const balance = await global.repository.GetBalance(req.params.id);

    if (!balance) {
      throw userNotFound();
    }

    res.send(balance);
  } catch (err) {
    next(err);
  }
}

async function postUserUsd (req, res, next) {
  try {
    const response = global.repository.ChangeUsdBalance(req.params.id, req.body);

    if (!response) {
      throw userNotFound();
    }

    if (response === 'Insufficient funds for the account') {
      throw new ErrorHandler(422, response);
    }

    res.send(response);
  } catch (err) {
    next(err);
  }
}

async function postUserBitcoins (req, res, next) {
  try {
    const response = global.repository.ChangeBitcoinsBalance(req.params.id, req.body);
    if (!response) {
      throw userNotFound();
    }

    if (typeof response === 'string') {
      throw new ErrorHandler(422, response);
    }

    return res.send(response);
  } catch (err) {
    next(err);
  }
}

export const usersController = {
  getUser,
  postUser,
  putUser,
  getBalance,
  postUserUsd,
  postUserBitcoins
};
