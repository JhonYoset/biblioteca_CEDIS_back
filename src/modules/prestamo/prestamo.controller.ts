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
import { PrestamoService } from './prestamo.service';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { RegisterReturnDto } from './dto/register-return.dto';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Roles } from './../../auth/decorators/roles.decorator';
import { PaginationDto } from './../pagination.dto';

@Controller('prestamos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PrestamoController {
  constructor(private readonly prestamoService: PrestamoService) {}

  @Post()
  @Roles('Administrador', 'Bibliotecario')
  create(@Body() createPrestamoDto: CreatePrestamoDto) {
    return this.prestamoService.create(createPrestamoDto);
  }

  @Get()
  @Roles('Administrador', 'Bibliotecario', 'Consultor')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.prestamoService.findAll(paginationDto);
  }

  @Get('pendientes')
  @Roles('Administrador', 'Bibliotecario')
  findPendingReturns() {
    return this.prestamoService.findPendingReturns();
  }

  @Get('lector/:id')
  @Roles('Administrador', 'Bibliotecario', 'Consultor')
  findByLector(
    @Param('id') id: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.prestamoService.findByLector(+id, paginationDto);
  }

  @Get('documento/:id')
  @Roles('Administrador', 'Bibliotecario', 'Consultor')
  findByDocumento(
    @Param('id') id: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.prestamoService.findByDocumento(+id, paginationDto);
  }

  @Get(':id')
  @Roles('Administrador', 'Bibliotecario', 'Consultor')
  findOne(@Param('id') id: string) {
    return this.prestamoService.findOne(+id);
  }

  @Put(':id/devolucion')
  @Roles('Administrador', 'Bibliotecario')
  registerReturn(
    @Param('id') id: string,
    @Body() registerReturnDto: RegisterReturnDto,
  ) {
    return this.prestamoService.registerReturn(+id, registerReturnDto);
  }

  @Put(':id')
  @Roles('Administrador', 'Bibliotecario')
  update(
    @Param('id') id: string,
    @Body() updatePrestamoDto: UpdatePrestamoDto,
  ) {
    return this.prestamoService.update(+id, updatePrestamoDto);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: string) {
    return this.prestamoService.remove(+id);
  }
}