import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Categoria } from './interfaces/categorias/categoria.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private logger = new Logger(AppController.name);

  @EventPattern('criar-categoria')
  async criarCategoria(@Payload() categoria: Categoria) {
    this.logger.log('criar-categoria');
    await this.appService.criarCategoria(categoria);
  }

  @MessagePattern('consultar-categorias')
  async consultaCategoriaPeloId(@Payload() _id: string) {
    this.logger.debug('consultar-categorias');
    return await this.appService.consultarCategoriaPeloId(_id);
  }

  @MessagePattern('consultar-categoria')
  async consultarCategorias() {
    this.logger.debug('consultar-categoria');
    return await this.appService.consultarTodasCategorias();
  }
}
