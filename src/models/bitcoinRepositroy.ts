// eslint-disable-next-line no-unused-vars
namespace BitcoinRepository {
  const { Bitcoin } = require('./bitcoin');
  const { error } = require('../utils/errors');

  class BitcoinRepository {
    private _bitcoin = new Bitcoin();

    public async ReadBitcoin (): Promise<InstanceType<typeof Bitcoin>> {
      try {
        return this._bitcoin;
      } catch (err) {
        throw error(err);
      }
    }

    public async UpdateBitcoin (bitcoin: InstanceType<typeof Bitcoin>): Promise<void> {
      try {
        const newValues: typeof Bitcoin = { ...bitcoin };

        newValues.updatedAt = new Date();
        this._bitcoin = newValues;

        return this._bitcoin;
      } catch (err) {
        throw error(err);
      }
    }
  }

  global.bitcoinRepository = new BitcoinRepository();

}
