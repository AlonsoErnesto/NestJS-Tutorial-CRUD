import { Controller, Post, Body, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto,LoginUserDto } from './dto';
import { Auth, GetUser,RawHeaders } from './decorators';
import { User } from './entities/auth.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProctected } from './decorators/role-proctected.decorator';
import { ValidRoles } from './interfaces';

@ApiTags('CRUD - AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  checkAuthStatus(
    @GetUser()user:User
  ){
    return this.authService.checkAuthStatus(user)
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    // @Req()request:Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() rawHeaders:string[]
  ){

    return {
      user,
      userEmail,
      rawHeaders
    }
  }

  @Get('private2')
  // @SetMetadata('roles',['admin','super-user'])
  // @RoleProctected(ValidRoles.superUser,ValidRoles.admin)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  @Auth()
  privateRoute2(
    @GetUser()user:User
  ){
    return user;
  }
  
}
