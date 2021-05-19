// eslint-disable-next-line no-unused-vars
namespace Repositoty {
  const { Bitcoin } = require('../models/bitcoin');
  const { error } = require('../utils/errors');

    module.exports.getBitcoin = async function (): Promise<InstanceType<typeof Bitcoin>> {
      try {
        const bitcoin: InstanceType<typeof Bitcoin> = await global.bitcoinRepository.ReadBitcoin();

        return bitcoin;
      } catch (err) {
        throw error(err);
      }
    };

    module.exports.putBitcoin = async function (bitcoin: InstanceType<typeof Bitcoin>): Promise<InstanceType<typeof Bitcoin>> {
      try {
        const updatedBitcoin: InstanceType<typeof Bitcoin> = await global.bitcoinRepository.UpdateBitcoin(bitcoin);

        return updatedBitcoin;
      } catch (err) {
        throw error(err);
      }
    };
}
