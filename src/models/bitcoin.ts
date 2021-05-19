// eslint-disable-next-line no-unused-vars
namespace BitcoinModel {
  const { IsNumber, Min, IsOptional, IsDate } = require('class-validator');

  class Bitcoin {
    @IsNumber()
    @Min(0)
    price: number = 100;

    @IsOptional()
    @IsDate()
    updatedAt: Date;
  }

  module.exports.Bitcoin = Bitcoin;
}
