// eslint-disable-next-line no-unused-vars
namespace Repositoty {
  const { User } = require('../models/user');
  const { Bitcoin } = require('../models/bitcoin');
  const { PutUser, PostUserUsd, PostUserBitcoins } = require('../utils/requests');
  const { userNotFound, insufficientFunds, error } = require('../utils/errors');

     module.exports.getUser = async function (id: string): Promise<InstanceType<typeof User>> {
       try {
         const user: InstanceType<typeof User> = await global.usersRepository.ReadUser(id);

         if (!user) {
           throw userNotFound();
         }

         return user;
       } catch (err) {
         throw error(err);
       }
     };

    module.exports.createUser = async function (user: InstanceType<typeof User>): Promise<InstanceType<typeof User>> {
      try {
        const createdUser: InstanceType<typeof User> = await global.usersRepository.CreateUser(user);

        return createdUser;
      } catch (err) {
        throw error(err);
      }
    };

    module.exports.putUser = async function (user: InstanceType<typeof PutUser>, id: string): Promise<InstanceType<typeof User>> {
      try {
        const updatedUser: InstanceType<typeof User> = await global.usersRepository.UpdateUser(id, user);

        if (!updatedUser) {
          throw userNotFound();
        }

        return updatedUser;
      } catch (err) {
        throw error(err);
      }
    };

    module.exports.getBalance = async function (id: string): Promise<any> {
      try {
        const user: InstanceType<typeof User> = await global.usersRepository.ReadUser(id);

        if (!user) {
          throw userNotFound();
        }

        const bitcoinPirce: InstanceType<typeof Bitcoin> = await global.bitcoinRepository.ReadBitcoin();

        return { balance: user.usdBalance + user.bitcoinAmount * bitcoinPirce.price };
      } catch (err) {
        throw error(err);
      }
    };

    function depositUsd (id: string, user: InstanceType<typeof User>, usdAmount: number): InstanceType<typeof User> {
      try {
        user.usdBalance += usdAmount;

        return user;
      } catch (err) {
        throw error(err);
      }
    }

    function withdrawUsd (id: string, user: InstanceType<typeof User>, usdAmount: number): InstanceType<typeof User> {
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

    module.exports.changeUsdBalance = async function (id: string, requestBody: InstanceType<typeof PostUserUsd>) : Promise<InstanceType<typeof User>> {
      try {
        const user: InstanceType<typeof User> = await global.usersRepository.ReadUser(id);

        if (!user) {
          throw userNotFound();
        }

        const { action, amount } = requestBody;
        return action === 'deposit' ? depositUsd(id, user, amount) : withdrawUsd(id, user, amount);
      } catch (err) {
        throw error(err);
      }
    };

    async function buyBitcoin (user: typeof User, bitcoinAmount: number): Promise<InstanceType<typeof User>> {
      try {
        const bitcoin: InstanceType<typeof Bitcoin> = await global.bitcoinRepository.ReadBitcoin();

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

    async function sellBitcoin (user: InstanceType<typeof User>, bitcoinAmount: number): Promise<InstanceType<typeof User>> {
      try {
        const bitcoin: InstanceType<typeof Bitcoin> = await global.bitcoinRepository.ReadBitcoin();

        if (user.bitcoinAmount < bitcoinAmount) {
          throw error(422, 'Not enough bitcoins in the account');
        }

        user.bitcoinAmount -= bitcoinAmount;
        user.usdBalance += bitcoinAmount * bitcoin.price;
        return user;
      } catch (err) {
        throw error(err);
      }
    }

    module.exports.changeBitcoinsBalance = async function (id: string, requestBody: InstanceType<typeof PostUserBitcoins>) : Promise<InstanceType<typeof User>> {
      try {
        const user: InstanceType<typeof User> = await global.usersRepository.ReadUser(id);

        if (!user) {
          throw userNotFound();
        }

        const { action, amount } = requestBody;
        return action === 'buy' ? buyBitcoin(user, amount) : sellBitcoin(user, amount);
      } catch (err) {
        throw error(err);
      }
    };
}
