import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class LoginUserDto {

   @IsString()
   @IsEmail()
   email!:string

   @IsString()
   @MinLength(6)
   @MaxLength(50)
   @Matches(
      /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
         message:'The password must have a Uppercase, lowercase and a number'
   })
   password!:string
}