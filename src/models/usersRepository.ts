// eslint-disable-next-line no-unused-vars
namespace UsersRepository {
  const { User } = require('./user');
  const { error } = require('../utils/errors');

  class UsersRepository {
    private _users: Array<InstanceType<typeof User>> = [];

    public async ReadUser (id: string) : Promise<InstanceType<typeof User>> {
      try {
        const user: typeof User = this._users.find(item => item.id === id);

        return user;
      } catch (err) {
        throw error(err);
      }
    }

    public async CreateUser (user: InstanceType<typeof User>) : Promise<InstanceType<typeof User>> {
      try {
        this._users.push(user);

        return user;
      } catch (err) {
        throw error(err);
      }
    }

    public async UpdateUser (id: string, user: InstanceType<typeof User>) : Promise<InstanceType<typeof User>> {
      try {
        const updatedUser = this._users.find(item => item.id === id);

        if (updatedUser) {
          updatedUser.name = user.name || updatedUser.name;
          updatedUser.email = user.email || updatedUser.email;
          updatedUser.updatedAt = new Date();
          updatedUser.usdBalance = user.usdBalance || updatedUser.usdBalance;
          updatedUser.bitcoinAmount = user.bitcoinAmount || updatedUser.bitcoinAmount;
        }

        return updatedUser;
      } catch (err) {
        throw error(err);
      }
    }
  }

  global.usersRepository = new UsersRepository();

}
