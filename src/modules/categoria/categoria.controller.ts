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
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Roles } from './../../auth/decorators/roles.decorator';
import { PaginationDto } from './../pagination.dto';

@Controller('categorias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @Roles('Administrador', 'Bibliotecario')
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  @Roles('Administrador', 'Bibliotecario', 'Consultor')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.categoriaService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles('Administrador', 'Bibliotecario', 'Consultor')
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(+id);
  }

  @Put(':id')
  @Roles('Administrador', 'Bibliotecario')
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(+id);
  }
}