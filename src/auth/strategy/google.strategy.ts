// src/auth/strategy/google.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UsuarioService } from '../../modules/usuario/usuario.service';
import { LectorService } from '../../modules/lector/lector.service';
import { ValidatedUser } from '../auth.service';

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
    
    console.log('Google Strategy initialized with:');
    console.log('Client ID:', configService.get('google.clientId'));
    console.log('Callback URL:', configService.get('google.callbackURL'));
  }

  async validate(
    accessToken: string, 
    refreshToken: string, 
    profile: any, 
    done: VerifyCallback
  ): Promise<any> {
    try {
      console.log('Google Strategy validate called');
      console.log('Profile received:', JSON.stringify(profile, null, 2));
      
      const email = profile.emails?.[0]?.value;
      
      if (!email) {
        console.error('No email found in Google profile');
        return done(new UnauthorizedException('No se pudo obtener el email de Google'), null);
      }

      console.log('Processing email:', email);
      let user: ValidatedUser;

      // Verificar si es un email de UNSA
      if (email.endsWith('@unsa.edu.pe')) {
        console.log('UNSA email detected, checking system user first...');
        user = await this.handleUnsaEmail(profile, email);
      } else {
        console.log('Non-UNSA email, checking system user only...');
        user = await this.handleExternalSystemUser(profile, email);
      }

      console.log('User validation result:', user);
      done(null, user);
      
    } catch (error) {
      console.error('Error in Google Strategy validation:', error);
      console.error('Error stack:', error.stack);
      done(error, null);
    }
  }

  private async handleUnsaEmail(profile: any, email: string): Promise<ValidatedUser> {
    try {
      console.log('Handling UNSA email:', email);
      
      // PASO 1: Verificar primero en la tabla de usuarios del sistema
      let systemUser = await this.usuarioService.findByEmail(email);
      
      if (systemUser) {
        console.log('Found existing system user:', systemUser);
        return {
          id: systemUser.id,
          correo: systemUser.correo,
          nombre: systemUser.nombre,
          apellido: systemUser.apellido,
          tipo: systemUser.tipo,
          userType: 'usuario'
        };
      }

      // PASO 2: Si no existe como usuario del sistema, verificar si existe como lector
      let lector = await this.lectorService.findByEmail(email);
      
      if (lector) {
        console.log('Found existing lector:', lector);
        return {
          id: lector.id,
          correo: lector.correo,
          nombre: lector.nombre,
          apellido: lector.apellido,
          tipo: 'Lector',
          userType: 'lector'
        };
      }

      // PASO 3: Si no existe en ninguna tabla, determinar dónde crearlo
      const shouldBeSystemUser = this.shouldCreateAsSystemUser(email);
      
      if (shouldBeSystemUser) {
        console.log('Creating new system user for:', email);
        return await this.createSystemUser(profile, email);
      } else {
        console.log('Creating new lector for:', email);
        return await this.createLector(profile, email);
      }
      
    } catch (error) {
      console.error('Error handling UNSA email:', error);
      throw error;
    }
  }

  private async handleExternalSystemUser(profile: any, email: string): Promise<ValidatedUser> {
    try {
      console.log('Handling external system user:', email);
      
      // Solo buscar en usuarios del sistema para emails externos
      let usuario = await this.usuarioService.findByEmail(email);
      
      if (!usuario) {
        console.log('External user not found, creating with default Consultor role...');
        usuario = await this.usuarioService.create({
          nombre: profile.name?.givenName || profile.displayName || 'Usuario',
          apellido: profile.name?.familyName || '',
          correo: email,
          tipo: 'Consultor',
        });
        console.log('New external system user created:', usuario);
      } else {
        console.log('Existing external system user found:', usuario);
      }
      
      return {
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        tipo: usuario.tipo,
        userType: 'usuario'
      };
    } catch (error) {
      console.error('Error handling external system user:', error);
      throw error;
    }
  }

  private shouldCreateAsSystemUser(email: string): boolean {
    // Lista de emails específicos que deben ser usuarios del sistema
    const systemUserEmails = [
      'bibliotecario@unsa.edu.pe',
      'jlunaq@unsa.edu.pe',
      // Agregar más emails específicos aquí
    ];

    // Lista de prefijos que indican personal administrativo
    const adminPrefixes = [
      'administrador',
      'bibliotecario',
      
    ];

    // Verificar si está en la lista específica
    if (systemUserEmails.includes(email.toLowerCase())) {
      return true;
    }

    // Verificar si el prefijo del email indica personal administrativo
    const emailPrefix = email.split('@')[0].toLowerCase();
    return adminPrefixes.some(prefix => emailPrefix.includes(prefix));
  }

  private async createSystemUser(profile: any, email: string): Promise<ValidatedUser> {
    // Determinar el tipo de usuario basado en el email
    let userType: 'Administrador' | 'Bibliotecario' | 'Consultor' = 'Consultor';
    
    const emailPrefix = email.split('@')[0].toLowerCase();
    
    if (emailPrefix.includes('admin') || emailPrefix.includes('director') || email === 'jlunaq@unsa.edu.pe') {
      userType = 'Administrador';
    } else if (emailPrefix.includes('biblioteca') || emailPrefix.includes('bibliotecario')) {
      userType = 'Bibliotecario';
    }
    
    const usuario = await this.usuarioService.create({
      nombre: profile.name?.givenName || profile.displayName || 'Usuario',
      apellido: profile.name?.familyName || '',
      correo: email,
      tipo: userType,
    });
    
    console.log('New system user created:', usuario);
    
    return {
      id: usuario.id,
      correo: usuario.correo,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      tipo: usuario.tipo,
      userType: 'usuario'
    };
  }

  private async createLector(profile: any, email: string): Promise<ValidatedUser> {
    const lector = await this.lectorService.create({
      tipo: 'Estudiante' as const,
      nombre: profile.name?.givenName || profile.displayName || 'Usuario',
      apellido: profile.name?.familyName || '',
      identificacion: email.split('@')[0],
      correo: email,
      telefono: '',
    });
    
    console.log('New lector created:', lector);
    
    return {
      id: lector.id,
      correo: lector.correo,
      nombre: lector.nombre,
      apellido: lector.apellido,
      tipo: 'Lector',
      userType: 'lector'
    };
  }
}