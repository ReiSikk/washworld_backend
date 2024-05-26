import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { CreateMemberDto } from 'src/member/dto/create-member.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm'
import { Member } from '../src/member/entities/member.entity';
import { MemberService } from '../src/member/member.service';
import { AuthService } from '../src/auth/auth.service';
import { WashBayService } from 'src/washbay/washbay.service';

describe('UserController (e2e)', () => {
    let app: INestApplication;
    let memberService: MemberService;
    let authService: AuthService;
    let WashBayService: WashBayService;
    let memberRepository: Repository<Member>;
    let connection: DataSource;
    let accessToken: string;
    let createdMemberId: number;
  
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      memberService = moduleFixture.get(MemberService);
      authService = moduleFixture.get(AuthService);
      memberRepository = moduleFixture.get(getRepositoryToken(Member))
      
      connection = moduleFixture.get(DataSource)
      app = moduleFixture.createNestApplication();
      app.useGlobalPipes(new ValidationPipe());
      await app.init();
    });


       describe('Log in flow', () => {
        it('should log-in the user and save the access token', async () => {

          const createdUser = await authService.signUp({
            email: 'testadmin3@admin.com',
            password: 'testpassword',
            firstName: 'Mikkel',
            lastName: 'Jacobsen',
            phone: '123456789',
          });

          createdMemberId = createdUser.id;


          const login = { email: 'testadmin3@admin.com', password: 'testpassword' };
            
          const { body } = await request(app.getHttpServer())
                              .post('/auth/login')
                              .send(login)
                              .expect(201);

          expect(body.access_token).toBeDefined();
          accessToken = body.access_token;
        })
      })


      describe('Accessing protected endpoint', () => {
        it('it should grant access to a protected endpoint and return a message', async () => {
          const { body } = await request(app.getHttpServer())
                .patch('/washbay/test-endpoint')
                .auth(accessToken, {type: 'bearer'})
                .send();

            expect(body.message).toEqual('Access granted');

        })
        afterEach(async () => {
          if (createdMemberId) {
              await memberRepository.delete(createdMemberId);
          }
        })
      })

      afterAll(() => {
        app.close();
      });
    });
