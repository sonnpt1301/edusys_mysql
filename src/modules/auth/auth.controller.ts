import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '../../shared/decorators/public.decorator';
import { AuthService } from './auth.service';
import { CreateAccountDto, LoginDto } from './dto/auth.req.dto';

@ApiTags('Auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiBody({ type: CreateAccountDto })
  register(@Body() body: CreateAccountDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
