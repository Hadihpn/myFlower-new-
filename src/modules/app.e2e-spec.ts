import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  describe('/ (GET)', () => {
    it('should return welcome message', () => {
      return request(app.getHttpServer())
        .get('/api')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toBe('Plant Monitoring System API is running!');
        });
    });
  });

  describe('/health (GET)', () => {
    it('should return health status', () => {
      return request(app.getHttpServer())
        .get('/api/health')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveProperty('status', 'ok');
          expect(res.body.data).toHaveProperty('timestamp');
          expect(res.body.data).toHaveProperty('uptime');
        });
    });
  });

  describe('Auth Endpoints', () => {
    describe('/auth/register (POST)', () => {
      it('should register a new user', () => {
        return request(app.getHttpServer())
          .post('/api/auth/register')
          .send({
            email: `test${Date.now()}@example.com`,
            password: 'password123',
            fullName: 'Test User',
          })
          .expect(201)
          .expect((res) => {
            expect(res.body.data).toHaveProperty('accessToken');
            expect(res.body.data).toHaveProperty('refreshToken');
            expect(res.body.data).toHaveProperty('user');
          });
      });

      it('should fail with invalid email', () => {
        return request(app.getHttpServer())
          .post('/api/auth/register')
          .send({
            email: 'invalid-email',
            password: 'password123',
            fullName: 'Test User',
          })
          .expect(400);
      });

      it('should fail with short password', () => {
        return request(app.getHttpServer())
          .post('/api/auth/register')
          .send({
            email: 'test@example.com',
            password: '12345',
            fullName: 'Test User',
          })
          .expect(400);
      });
    });

    describe('/auth/login (POST)', () => {
      it('should login with valid credentials', async () => {
        // First register a user
        const email = `test${Date.now()}@example.com`;
        await request(app.getHttpServer())
          .post('/api/auth/register')
          .send({
            email,
            password: 'password123',
            fullName: 'Test User',
          });

        // Then login
        return request(app.getHttpServer())
          .post('/api/auth/login')
          .send({
            email,
            password: 'password123',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data).toHaveProperty('accessToken');
            expect(res.body.data).toHaveProperty('refreshToken');
          });
      });

      it('should fail with invalid credentials', () => {
        return request(app.getHttpServer())
          .post('/api/auth/login')
          .send({
            email: 'nonexistent@example.com',
            password: 'wrongpassword',
          })
          .expect(401);
      });
    });
  });

  describe('Protected Endpoints', () => {
    let authToken: string;

    beforeAll(async () => {
      const email = `test${Date.now()}@example.com`;
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          email,
          password: 'password123',
          fullName: 'Test User',
        });
      
      authToken = response.body.data.accessToken;
    });

    it('should access protected route with valid token', () => {
      return request(app.getHttpServer())
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('should fail to access protected route without token', () => {
      return request(app.getHttpServer())
        .get('/api/users/profile')
        .expect(401);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
