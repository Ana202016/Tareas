import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthService } from '../src/auth/auth.service';
import { AppModule } from '../src/app.module';


describe('Auth test', () => {
  let app: INestApplication;
  let authService: AuthService;
  const userTest = {
    username: 'ana08yeli@gmail.com',
    password: '1234',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(authService)
    .useValue({
      // Mock the auth service methods as needed
      login: async (username: string, password: string) => {
        if (username === userTest.username && password === userTest.password) {
          return {
            users: { username: username , email: username},
            access_token: 'mock_token',
          };
        } else {
          throw new Error('Unauthorized');
        }
      },
    })
    .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(':POST /auth/login', async () => {

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(userTest)  // Send userTest in the request body
      .expect(200)
      .then(({ body }) => {
        console.log('Login response body:', body);

        expect(body.users).toBeDefined();
        expect(body.users.username).toEqual(userTest.username);
        expect(body.access_token).toBeDefined();

        process.env.TOKEN = body.access_token;
        console.log('Token set in environment:', process.env.TOKEN);
      })
      .catch(err => {
        console.error('Error in login test:', err);
        throw err;
      });

  });


  // UnAuthorized user profile
  it(`/GET auth/profile`, () => {
    return request(app.getHttpServer())
      .get(`/auth/profile`)
      .expect(401);
  });

  // User profile
  it('Leer perfil de usuario: GET: auth/profile', async () => {
    return request(app.getHttpServer())
      .get(`/auth/profile`)
      .set('Authorization', `Bearer ${process.env.TOKEN}`)
      .expect(200)
      .then(({ body }) => {
        //console.log(body);
        expect(body.email).toEqual(process.env.TEST_USER);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});


