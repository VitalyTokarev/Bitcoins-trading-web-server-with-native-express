// eslint-disable-next-line no-unused-vars
namespace UserModel {
  const { IsDefined, IsEmail, Min, IsNumber, IsString, MinLength, IsOptional, IsDate } = require('class-validator');
  const { v4: uuid4 } = require('uuid');

  class User {
    @IsString()
    id: string = uuid4();

    @IsDefined()
    @IsString()
    @MinLength(3)
    name: string;

    @IsDefined()
    @IsString()
    @MinLength(3)
    userName: string;

    @IsDefined()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @Min(0)
    @IsNumber()
    bitcoinAmount: number = 0;

    @IsOptional()
    @Min(0)
    @IsNumber()
    usdBalance: number = 0;

    @IsOptional()
    @IsDate()
    createdAt: Date = new Date();

    @IsOptional()
    @IsDate()
    updatedAt: Date;
  }

  module.exports.User = User;
}
