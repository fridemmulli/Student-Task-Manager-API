import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'fridem@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123' })
    @MinLength(6)
    password: string;
}
