
import { User } from './user';
import { error } from '../utils/errors';

class UsersRepository {
    private _users: Array<User> = [];

    public async ReadUser (id: string) : Promise<User> {
      try {
        const user: User = this._users.find(item => item.id === id);

        return user;
      } catch (err) {
        throw error(err);
      }
    }

    public async CreateUser (user: User) : Promise<User> {
      try {
        this._users.push(user);

        return user;
      } catch (err) {
        throw error(err);
      }
    }

    public async UpdateUser (id: string, user: User) : Promise<User> {
      try {
        const updatedUser: User = this._users.find(item => item.id === id);

        if (updatedUser) {
          updatedUser.name = user.name || updatedUser.name;
          updatedUser.email = user.email || updatedUser.email;
          updatedUser.updatedAt = new Date().toISOString();
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
