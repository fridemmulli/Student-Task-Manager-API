import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsDateString()
  deadline: string;

  @IsString()
  status: string; // "belum" atau "selesai"
}
