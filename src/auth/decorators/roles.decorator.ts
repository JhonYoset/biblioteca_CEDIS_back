<<<<<<< HEAD
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
=======
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
>>>>>>> 5360e74 (Modulo Auth)
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);