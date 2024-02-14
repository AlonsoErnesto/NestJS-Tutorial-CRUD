import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from 'src/auth/interfaces';

export const META_ROLES = 'roles'

export const RoleProctected = (...args: ValidRoles[]) => {
   return SetMetadata(META_ROLES, args);
}
