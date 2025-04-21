import { IsEmail, IsNotEmpty, IsString, IsIn } from 'class-validator';
import { Role }                              from '../role.enum';

export class CreateUserDto {
  @IsString()  @IsNotEmpty()            name: string;
  @IsEmail()  @IsNotEmpty()             email: string;
  @IsString()  @IsNotEmpty()            password: string;
  @IsString()  @IsNotEmpty() @IsIn(Object.values(Role))
                                       role: Role;
}
