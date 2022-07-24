import { ApiBearerAuth } from '@nestjs/swagger';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth-guard';
import { RolesGuard } from '../../modules/auth/guards/role-guard';
import { Role } from '../constants/common.constant';
import { ROLES_KEY } from './roles.decorator';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
  );
}
