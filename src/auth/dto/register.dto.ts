import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'Fridem Mulli' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'fridem@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123' })
    @MinLength(6)
    password: string;
}
