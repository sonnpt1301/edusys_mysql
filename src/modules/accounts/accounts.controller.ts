import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/accounts.req.dto';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}
  @Post('register')
  @ApiBody({ type: CreateAccountDto })
  register(@Body() body: CreateAccountDto) {
    return this.accountsService.register(body);
  }
}
