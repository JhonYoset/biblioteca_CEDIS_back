import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../modules/usuario/usuario.service';
import { LectorService } from './../modules/lector/lector.service';

export interface AuthResult {
  access_token: string;
  user: {
    id: any;
    correo: any;
    nombre: any;
    apellido: any;
    tipo: any;
    userType: any;
  };
}

export interface ValidatedUser {
  id: number;
  correo: string;
  nombre: string;
  apellido: string;
  tipo: string;
  userType: 'usuario' | 'lector';
}

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private lectorService: LectorService,
    private jwtService: JwtService,
  ) {}

  async validateUserByEmail(correo: string): Promise<ValidatedUser | null> {
    try {
      // Primero buscar en usuarios del sistema
      const user = await this.usuarioService.findByEmail(correo);
      if (user) {
        return {
          id: user.id,
          correo: user.correo,
          nombre: user.nombre,
          apellido: user.apellido,
          tipo: user.tipo,
          userType: 'usuario'
        };
      }

      // Luego buscar en lectores
      const lector = await this.lectorService.findByEmail(correo);
      if (lector) {
        return {
          id: lector.id,
          correo: lector.correo,
          nombre: lector.nombre,
          apellido: lector.apellido,
          tipo: 'Lector',
          userType: 'lector'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error validating user by email:', error);
      return null;
    }
  }

  async login(user: ValidatedUser): Promise<AuthResult> {
    const payload = { 
      correo: user.correo, 
      sub: user.id, 
      tipo: user.tipo,
      userType: user.userType
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        correo: user.correo,
        nombre: user.nombre,
        apellido: user.apellido,
        tipo: user.tipo,
        userType: user.userType,
      },
    };
  }

  async googleLogin(req: any): Promise<AuthResult> {
    if (!req.user) {
      throw new UnauthorizedException('No se pudo autenticar con Google');
    }

    try {
      return this.login(req.user);
    } catch (error) {
      console.error('Error en Google login:', error);
      throw new UnauthorizedException('Error al procesar autenticación de Google');
    }
  }
}