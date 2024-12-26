import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    // return this.appService.getHello();
    // res.status(200).send('hii');
  }

  @Get(':id')
  getHelloById(@Param() p: string) {
    console.log('Request object', p);
    return this.appService.getHelloById(p ?? '');
  }

  @Get('p/:id')
  getHelloByIdParam(@Param('id') id: string = '') {
    console.log('Request object', id);
    return this.appService.getHelloById(id ?? '');
  }
}
