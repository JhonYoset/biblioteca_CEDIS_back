import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Roles } from './../../auth/decorators/roles.decorator';
import { PaginationDto } from './../pagination.dto';
import { Public } from '../../auth/decorators/public.decorator';

@Controller('usuarios')
//@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Add Public decorator to bypass authentication for first user creation
  @Public()
  @Post('register-first-admin')
  createFirstAdmin(@Body() createUsuarioDto: CreateUsuarioDto) {
    // Ensure only admin can be created with this endpoint
    if (createUsuarioDto.tipo !== 'Administrador') {
      throw new Error('Only Administrator can be created with this endpoint');
    }
    return this.usuarioService.create(createUsuarioDto);
  }

  @Post()
  //@Roles('Administrador')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @Roles('Administrador', 'Bibliotecario')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usuarioService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles('Administrador', 'Bibliotecario')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Put(':id')
  @Roles('Administrador')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}