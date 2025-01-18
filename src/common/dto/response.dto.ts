import { IsNumber } from 'class-validator';

export class ResponseFormat {
  @IsNumber()
  status?: number;

  @IsNumber()
  totalResults?: number;

  data?: Record<string, unknown> | Array<Record<string, unknown>>;
}
