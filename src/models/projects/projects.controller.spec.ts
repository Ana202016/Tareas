import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Status } from '@prisma/client';
import { PrismaService } from '../../prisma.service';


//evaluar que ProjectsController interactua con ProjectsService
//consume la base de datos a traves de PrismaService
describe('ProjectsController', () => {
  // var para instancia del controlador
  let controller: ProjectsController;
  // var para instancia de servicio
  let service: ProjectsService;

  // preparar instancia del controlador
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [ProjectsService, PrismaService],
    }).compile();

    //obtener instancia de servicio ProjectsController
    controller = module.get<ProjectsController>(ProjectsController);

    //obtener instancia de servicio ProjectsService
    service = module.get<ProjectsService>(ProjectsService);

    //evaluar que el controlador está definido ( se creo la instancia)
    it('Deberia estar definido', () => {
     expect(controller).toBeDefined();
    });

    describe('Interaccion Servicio - Controlador', () =>{

      it('Debe traer un project por id', async () => {
        //estructura del objetoesperado
        const result={
          id: 1,
          name: 'Projecto ejemplo',
          description: '...',
          status: Status.PENDING,
          createdAt: new Date(),
          updatedAt: new Date(),
          tasks:[],

        };

        //simulacion de ejecucion del método findOne(N)
        jest.spyOn(service, 'findOne').mockImplementation(async () => result)
        //console.log(result);
        //const project =await service.findOne(1);
        //console.log(project);
       
        const controllerResult = await controller.findOne(1);
        //console:log(controllerResult);
        //evaluacion del resultado
        expect(controllerResult).toBe(result);

        //expect(controllerResult).toStrictEqual(project);
      });

    });

  });
});