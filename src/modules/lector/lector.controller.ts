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
import { LectorService } from './lector.service';
import { CreateLectorDto } from './dto/create-lector.dto';
import { UpdateLectorDto } from './dto/update-lector.dto';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Roles } from './../../auth/decorators/roles.decorator';
import { PaginationDto } from './../pagination.dto';

@Controller('lectores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LectorController {
  constructor(private readonly lectorService: LectorService) {}

  @Post()
  @Roles('Administrador', 'Bibliotecario')
  create(@Body() createLectorDto: CreateLectorDto) {
    return this.lectorService.create(createLectorDto);
  }

  @Get()
  @Roles('Administrador', 'Bibliotecario', 'Consultor')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.lectorService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles('Administrador', 'Bibliotecario', 'Consultor')
  findOne(@Param('id') id: string) {
    return this.lectorService.findOne(+id);
  }

  @Put(':id')
  @Roles('Administrador', 'Bibliotecario')
  update(@Param('id') id: string, @Body() updateLectorDto: UpdateLectorDto) {
    return this.lectorService.update(+id, updateLectorDto);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: string) {
    return this.lectorService.remove(+id);
  }
}
