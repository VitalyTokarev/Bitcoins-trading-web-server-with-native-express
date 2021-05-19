// eslint-disable-next-line no-unused-vars
namespace Requests {
  const { IsDefined, IsEmail, IsString, MinLength, IsOptional, IsNumber, Min, IsIn } = require('class-validator');

  class PutUser {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;
  }

  class PostUserUsd {
    @IsDefined()
    @IsString()
    @IsIn(['withdraw', 'deposit'])
    action: string;

    @IsDefined()
    @IsNumber()
    @Min(0)
    amount: number;
  }

  class PostUserBitcoins {
    @IsDefined()
    @IsString()
    @IsIn(['sell', 'buy'])
    action: string;

    @IsDefined()
    @IsNumber()
    @Min(0)
    amount: number;
  }

  class PutBitcoin {
    @IsDefined()
    @IsNumber()
    @Min(0)
    price: number;
  }

  module.exports.PutUser = PutUser;
  module.exports.PostUserUsd = PostUserUsd;
  module.exports.PostUserBitcoins = PostUserBitcoins;
  module.exports.PutBitcoin = PutBitcoin;
}
