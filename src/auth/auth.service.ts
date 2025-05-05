import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../modules/usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(correo: string, contraseña: string): Promise<any> {
    const user = await this.usuarioService.findByEmail(correo);
    
    if (user && await bcrypt.compare(contraseña, user.contraseña)) {
      const { contraseña, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { correo: user.correo, sub: user.id, tipo: user.tipo };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        correo: user.correo,
        nombre: user.nombre,
        apellido: user.apellido,
        tipo: user.tipo,
      },
    };
  }
}