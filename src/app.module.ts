import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { LectorModule } from './modules/lector/lector.module';
import { DocumentoModule } from './modules/documento/documento.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { PrestamoModule } from './modules/prestamo/prestamo.module';
import jwtConfig from './infrastructure/config/jwt.config';
import googleConfig from './infrastructure/config/google.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, googleConfig],
    }),
    DatabaseModule,
    AuthModule,
    UsuarioModule,
    LectorModule,
    DocumentoModule,
    CategoriaModule,
    PrestamoModule,
  ],
})
export class AppModule {}