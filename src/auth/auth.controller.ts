// src/auth/auth.controller.ts
import { Controller, Get, Post, UseGuards, Request, Res, Body, BadRequestException } from '@nestjs/common';
import { AuthService, AuthResult } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Public } from './decorators/public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {
    // Inicia el flujo de autenticación con Google
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Res() res: Response) {
    try {
      console.log('Google OAuth callback received');
      console.log('User from request:', req.user);
      
      // Verificar si el usuario existe en req.user
      if (!req.user) {
        console.error('No user found in request');
        const errorUrl = `${process.env.FRONTEND_URL || 'http://localhost:4200'}/#/login?message=${encodeURIComponent('Error: No se pudo obtener información del usuario')}`;
        return res.redirect(errorUrl);
      }

      const result = await this.authService.googleLogin(req);
      
      // Verificar si el resultado es un string (error) o un objeto (éxito)
      if (typeof result === 'string') {
        console.error('Auth service returned error:', result);
        const errorUrl = `${process.env.FRONTEND_URL || 'http://localhost:4200'}/#/login?message=${encodeURIComponent(result)}`;
        return res.redirect(errorUrl);
      }

      // Verificar si el usuario es administrador
      if (result.user.tipo !== 'Administrador') {
        console.log(`User ${result.user.correo} is not admin. Type: ${result.user.tipo}`);
        const errorMessage = `Acceso denegado. Solo los administradores pueden acceder al sistema. Tu tipo de usuario: ${result.user.tipo}`;
        const errorUrl = `${process.env.FRONTEND_URL || 'http://localhost:4200'}/#/login?message=${encodeURIComponent(errorMessage)}`;
        return res.redirect(errorUrl);
      }

      console.log('Admin user authenticated successfully:', result.user.correo);
      
      // Éxito: Usuario administrador autenticado correctamente
      const successUrl = `${process.env.FRONTEND_URL || 'http://localhost:4200'}/#/auth/callback?token=${result.access_token}&user=${encodeURIComponent(JSON.stringify(result.user))}`;
      res.redirect(successUrl);
      
    } catch (error) {
      console.error('Error en Google OAuth callback:', error);
      console.error('Error stack:', error.stack);
      const errorUrl = `${process.env.FRONTEND_URL || 'http://localhost:4200'}/#/login?message=${encodeURIComponent('Error de autenticación en el servidor')}`;
      res.redirect(errorUrl);
    }
  }

  @Public()
  @Post('validate-email')
  async validateEmail(@Body() body: { email: string }): Promise<AuthResult | { success: boolean; message: string }> {
    try {
      const { email } = body;
      
      if (!email) {
        throw new BadRequestException('Email es requerido');
      }

      console.log('Validating email:', email);
      const user = await this.authService.validateUserByEmail(email);
      
      if (user) {
        // Verificar si el usuario es administrador
        if (user.tipo !== 'Administrador') {
          console.log(`User ${email} is not admin. Type: ${user.tipo}`);
          return { 
            success: false,
            message: `Acceso denegado. Solo los administradores pueden acceder al sistema. Tu tipo de usuario: ${user.tipo}` 
          };
        }

        console.log('Admin user found:', email);
        const authResult = await this.authService.login(user);
        return {
          success: true,
          ...authResult
        };
      }
      
      console.log('User not found:', email);
      return { 
        success: false,
        message: 'Usuario no encontrado en el sistema' 
      };
      
    } catch (error) {
      console.error('Error al validar email:', error);
      throw new BadRequestException('Error al validar email');
    }
  }

  @Public()
  @Get('status')
  getAuthStatus() {
    return {
      message: 'Auth service is running',
      googleOAuth: 'enabled',
      environment: process.env.NODE_ENV || 'development',
      frontendUrl: process.env.FRONTEND_URL,
      callbackUrl: process.env.GOOGLE_CALLBACK_URL,
      endpoints: {
        googleLogin: '/auth/google',
        googleCallback: '/auth/google/callback',
        validateEmail: '/auth/validate-email'
      }
    };
  }
}