import { Controller, Get, Post, UseGuards, Request, Res, Body, BadRequestException } from '@nestjs/common';
import { AuthService, AuthResult } from './auth.service'; // Importar AuthResult
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
    // Este método solo inicia el flujo, no necesita retornar nada
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Res() res: Response) {
    try {
      const result = await this.authService.googleLogin(req);
      
      // Verificar si el resultado es un string (error) o un objeto (éxito)
      if (typeof result === 'string') {
        // Error: No se pudo autenticar el usuario
        const errorUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/error?message=${encodeURIComponent(result)}`;
        return res.redirect(errorUrl);
      }

      // Éxito: Usuario autenticado correctamente
      const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?token=${result.access_token}`;
      res.redirect(redirectUrl);
      
    } catch (error) {
      console.error('Error en Google OAuth callback:', error);
      const errorUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/error?message=${encodeURIComponent('Error de autenticación')}`;
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

      const user = await this.authService.validateUserByEmail(email);
      
      if (user) {
        return this.authService.login(user);
      }
      
      return { 
        success: false,
        message: 'Usuario no encontrado' 
      };
      
    } catch (error) {
      throw new BadRequestException('Error al validar email');
    }
  }

  @Public()
  @Get('status')
  getAuthStatus() {
    return {
      message: 'Auth service is running',
      googleOAuth: 'enabled',
      endpoints: {
        googleLogin: '/auth/google',
        validateEmail: '/auth/validate-email'
      }
    };
  }
}