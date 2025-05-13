<<<<<<< HEAD
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
=======
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
>>>>>>> 5360e74 (Modulo Auth)
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);