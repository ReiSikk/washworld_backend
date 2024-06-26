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


       describe('Sign up flow', () => {
        let createdMemberId: number;
        it('should create a new member', async () => {
    
            const validMember: CreateMemberDto = {
                email: 'user@user22.com',
                password: 'testtesttest',
                firstName: 'Name',
                lastName: 'Lastname',
                phone: '12345',
            };
    
            const {body} = await request(app.getHttpServer())
            .post('/auth/signup')
            .send(validMember)
            .expect(201)
    
            expect(body.email).toEqual(validMember.email)
            expect(body.id).toBeDefined()
            createdMemberId = body.id;
        })


        afterEach(async () => {
          if (createdMemberId) {
              await memberRepository.delete(createdMemberId);
          }
        })

      })


      describe('Sign up flow - invalid data', () => {
        //let createdMemberId: number;
        it('it should return error message when passed an invalid member', async () => {
    
          const invalidMember: Partial<CreateMemberDto> = {
            email: 'u@u33.com',
            password: 'blabla',
            firstName: 'name',
            lastName: 'lastname',
            phone: '12345',
        };
    
            const {body} = await request(app.getHttpServer())
            .post('/auth/signup')
            .send(invalidMember)
            .expect(400)
    
            expect(body.message[0]).toEqual('Password must be at least 8 characters long');

        })

      })

      describe('Log in flow', () => {
        let createdMemberId: number;
        it('it should log-in the user', async () => {
          const createdUser = await authService.signUp({
            email: 'test4@email.com',
            password: 'testpassword',
            firstName: 'Mikkel',
            lastName: 'Jacobsen',
            phone: '123456789',
          });

          createdMemberId = createdUser.id;

          const login = { email: 'test4@email.com', password: 'testpassword'}
            
          const {body} = await request(app.getHttpServer())
                            .post('/auth/login')
                            .send(login)
                            .expect(201)

                            
          expect(body.access_token).toBeDefined()
          accessToken = body.access_token
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
