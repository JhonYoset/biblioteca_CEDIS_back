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
import { DocumentoService } from './documento.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { RolesGuard } from './../../auth/guards/roles.guard';
import { Roles } from './../../auth/decorators/roles.decorator';
import { PaginationDto } from './../pagination.dto';

@Controller('documentos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Post()
  @Roles('Administrador', 'Bibliotecario')
  create(@Body() createDocumentoDto: CreateDocumentoDto) {
    return this.documentoService.create(createDocumentoDto);
  }

  @Get()
  @Roles('Administrador', 'Bibliotecario', 'Consultor')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.documentoService.findAll(paginationDto);
  }

  @Get('categoria/:id')
  @Roles('Administrador', 'Bibliotecario', 'Consultor')
  findByCategoria(
    @Param('id') id: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.documentoService.findByCategoria(+id, paginationDto);
  }

  @Get(':id')
  @Roles('Administrador', 'Bibliotecario', 'Consultor')
  findOne(@Param('id') id: string) {
    return this.documentoService.findOne(+id);
  }

  @Put(':id')
  @Roles('Administrador', 'Bibliotecario')
  update(
    @Param('id') id: string,
    @Body() updateDocumentoDto: UpdateDocumentoDto,
  ) {
    return this.documentoService.update(+id, updateDocumentoDto);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: string) {
    return this.documentoService.remove(+id);
  }
}
