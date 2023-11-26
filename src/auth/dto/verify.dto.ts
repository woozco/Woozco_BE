import { IsNotEmpty, IsEmail } from 'class-validator';

export class VerifyDto {
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    verifyCode: number;
}
