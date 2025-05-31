import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UsuarioService } from '../../modules/usuario/usuario.service';
import { LectorService } from '../../modules/lector/lector.service';
import { ValidatedUser } from '../auth.service'; // Importar la interfaz

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private usuarioService: UsuarioService,
    private lectorService: LectorService,
  ) {
    super({
      clientID: configService.get('google.clientId'),
      clientSecret: configService.get('google.clientSecret'),
      callbackURL: configService.get('google.callbackURL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string, 
    refreshToken: string, 
    profile: any, 
    done: VerifyCallback
  ): Promise<any> {
    try {
      const email = profile.emails?.[0]?.value;
      
      if (!email) {
        return done(new UnauthorizedException('No se pudo obtener el email de Google'), null);
      }

      let user: ValidatedUser;

      // Verificar si es un email de UNSA para lectores
      if (email.endsWith('@unsa.edu.pe')) {
        user = await this.handleUnsaUser(profile, email);
      } else {
        user = await this.handleSystemUser(profile, email);
      }

      done(null, user);
      
    } catch (error) {
      console.error('Error in Google Strategy validation:', error);
      done(error, null);
    }
  }

  private async handleUnsaUser(profile: any, email: string): Promise<ValidatedUser> {
    // Buscar o crear lector
    let lector = await this.lectorService.findByEmail(email);
    
    if (!lector) {
      // Crear nuevo lector
      const newLectorDto = {
        tipo: 'Estudiante' as const,
        nombre: profile.name?.givenName || profile.displayName || 'Usuario',
        apellido: profile.name?.familyName || '',
        identificacion: email.split('@')[0], // Usar la parte antes del @ como identificación
        correo: email,
        telefono: '', // Se puede completar después
      };
      
      lector = await this.lectorService.create(newLectorDto);
    }
    
    return {
      id: lector.id,
      correo: lector.correo,
      nombre: lector.nombre,
      apellido: lector.apellido,
      tipo: 'Lector',
      userType: 'lector'
    };
  }

  private async handleSystemUser(profile: any, email: string): Promise<ValidatedUser> {
    // Buscar o crear usuario del sistema (administradores, bibliotecarios)
    const usuario = await this.usuarioService.findOrCreateByGoogleProfile(profile);
    
    return {
      id: usuario.id,
      correo: usuario.correo,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      tipo: usuario.tipo,
      userType: 'usuario'
    };
  }
}