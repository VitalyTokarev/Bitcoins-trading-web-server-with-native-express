
import { IsNumber, Min, IsOptional, IsDate } from 'class-validator';

export class Bitcoin {
  @IsNumber()
  @Min(0)
  price: number = 100;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
