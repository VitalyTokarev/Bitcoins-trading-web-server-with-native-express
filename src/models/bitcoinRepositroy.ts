
import { Bitcoin } from './bitcoin';
import { error } from '../utils/errors';

class BitcoinRepository {
    private _bitcoin = new Bitcoin();

    public async ReadBitcoin (): Promise<Bitcoin> {
      try {
        return this._bitcoin;
      } catch (err) {
        throw error(err);
      }
    }

    public async UpdateBitcoin (bitcoin: Bitcoin): Promise<Bitcoin> {
      try {
        const newValues: Bitcoin = { ...bitcoin };

        newValues.updatedAt = new Date().toISOString();
        this._bitcoin = newValues;

        return this._bitcoin;
      } catch (err) {
        throw error(err);
      }
    }
}

global.bitcoinRepository = new BitcoinRepository();
