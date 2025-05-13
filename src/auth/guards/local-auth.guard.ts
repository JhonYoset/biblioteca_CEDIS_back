<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
=======
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
>>>>>>> 5360e74 (Modulo Auth)
export class LocalAuthGuard extends AuthGuard('local') {}