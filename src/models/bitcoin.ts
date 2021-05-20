
import { IsNumber, Min, IsOptional, IsString } from 'class-validator';

export class Bitcoin {
  @IsNumber()
  @Min(0)
  price: number = 100;

  @IsOptional()
  @IsString()
  updatedAt: string;
}
