
import { User } from '../models/user';
import { Bitcoin } from '../models/bitcoin';
import { PutUser, PostUserUsd, PostUserBitcoins } from '../utils/requests';
import { userNotFound, insufficientFunds, error, ErrorHandler } from '../utils/errors';

export async function getUser (id: string): Promise<User> {
  try {
    const user: User = await global.usersRepository.ReadUser(id);

    if (!user) {
      throw userNotFound();
    }

    return user;
  } catch (err) {
    throw error(err);
  }
};

export async function createUser (user: User): Promise<User> {
  try {
    const createdUser: User = await global.usersRepository.CreateUser(user);

    return createdUser;
  } catch (err) {
    throw error(err);
  }
};

export async function putUser (user: PutUser, id: string): Promise<User> {
  try {
    const updatedUser: User = await global.usersRepository.UpdateUser(id, user);

    if (!updatedUser) {
      throw userNotFound();
    }

    return updatedUser;
  } catch (err) {
    throw error(err);
  }
};

export async function getBalance (id: string): Promise<any> {
  try {
    const user: User = await global.usersRepository.ReadUser(id);

    if (!user) {
      throw userNotFound();
    }

    const bitcoinPirce: Bitcoin = await global.bitcoinRepository.ReadBitcoin();

    return { balance: user.usdBalance + user.bitcoinAmount * bitcoinPirce.price };
  } catch (err) {
    throw error(err);
  }
};

function depositUsd (id: string, user: User, usdAmount: number): User {
  try {
    user.usdBalance += usdAmount;

    return user;
  } catch (err) {
    throw error(err);
  }
}

function withdrawUsd (id: string, user: User, usdAmount: number): User {
  try {
    if (user.usdBalance < usdAmount) {
      throw insufficientFunds();
    }

    user.usdBalance -= usdAmount;
    return user;
  } catch (err) {
    throw error(err);
  }
}

export async function changeUsdBalance (id: string, requestBody: PostUserUsd) : Promise<User> {
  try {
    const user: User = await global.usersRepository.ReadUser(id);

    if (!user) {
      throw userNotFound();
    }

    const { action, amount } = requestBody;
    return action === 'deposit' ? depositUsd(id, user, amount) : withdrawUsd(id, user, amount);
  } catch (err) {
    throw error(err);
  }
};

async function buyBitcoin (user: User, bitcoinAmount: number): Promise<User> {
  try {
    const bitcoin: Bitcoin = await global.bitcoinRepository.ReadBitcoin();

    if (user.usdBalance < bitcoinAmount * bitcoin.price) {
      throw insufficientFunds();
    }

    user.bitcoinAmount += bitcoinAmount;
    user.usdBalance -= bitcoinAmount * bitcoin.price;
    return user;
  } catch (err) {
    throw error(err);
  }
}

async function sellBitcoin (user: User, bitcoinAmount: number): Promise<User> {
  try {
    const bitcoin: Bitcoin = await global.bitcoinRepository.ReadBitcoin();

    if (user.bitcoinAmount < bitcoinAmount) {
      throw new ErrorHandler(422, 'Not enough bitcoins in the account');
    }

    user.bitcoinAmount -= bitcoinAmount;
    user.usdBalance += bitcoinAmount * bitcoin.price;
    return user;
  } catch (err) {
    throw error(err);
  }
}

export async function changeBitcoinsBalance (id: string, requestBody: PostUserBitcoins) : Promise<User> {
  try {
    const user: User = await global.usersRepository.ReadUser(id);

    if (!user) {
      throw userNotFound();
    }

    const { action, amount } = requestBody;
    return action === 'buy' ? buyBitcoin(user, amount) : sellBitcoin(user, amount);
  } catch (err) {
    throw error(err);
  }
};
