import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Verificar que el root devuelva el mensaje corecto', () => {
    it('Debe retornar "Hello World!"', () => {
      //evaluar la respuesta esperada
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
