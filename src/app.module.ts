import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import jwtConfig from './infrastructure/config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    DatabaseModule,
    AuthModule,
    UsuarioModule,
  ],
})
export class AppModule {}