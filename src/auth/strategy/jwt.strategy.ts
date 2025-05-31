import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsuarioService } from '../../modules/usuario/usuario.service';
import { LectorService } from '../../modules/lector/lector.service';
import { ValidatedUser } from '../auth.service'; // Importar la interfaz

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usuarioService: UsuarioService,
    private lectorService: LectorService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: any): Promise<Partial<ValidatedUser>> {
    try {
      if (payload.userType === 'lector') {
        const lector = await this.lectorService.findOne(payload.sub);
        if (!lector) {
          throw new UnauthorizedException();
        }
        return { 
          id: lector.id, 
          correo: lector.correo, 
          tipo: 'Lector',
          userType: 'lector'
        };
      } else {
        const user = await this.usuarioService.findOne(payload.sub);
        if (!user) {
          throw new UnauthorizedException();
        }
        return { 
          id: user.id, 
          correo: user.correo, 
          tipo: user.tipo,
          userType: 'usuario'
        };
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}