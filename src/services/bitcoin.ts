import { Bitcoin } from '../models/bitcoin';
import { error } from '../utils/errors';

export async function getBitcoin (): Promise<Bitcoin> {
  try {
    const bitcoin: Bitcoin = await global.bitcoinRepository.ReadBitcoin();

    return bitcoin;
  } catch (err) {
    throw error(err);
  }
};

export async function putBitcoin (bitcoin: Bitcoin): Promise<Bitcoin> {
  try {
    const updatedBitcoin: Bitcoin = await global.bitcoinRepository.UpdateBitcoin(bitcoin);

    return updatedBitcoin;
  } catch (err) {
    throw error(err);
  }
};
