import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:1234@127.0.0.1:5672/smartranking'],
        queue: 'admin-backend',
      },
    });
  }

  @Post('categorias')
  criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) {
    this.clientAdminBackend.emit('criar-categoria', criarCategoriaDto);
  }

  @Get('categorias/:idCategoria')
  consultarCategorias(@Param('idCategoria') _id: string): Observable<any> {
    return this.clientAdminBackend.send('consultar-categorias', _id);
  }

  @Get('categorias')
  consultarCategoria(): Observable<any> {
    return this.clientAdminBackend.send('consultar-categoria', '');
  }
}
