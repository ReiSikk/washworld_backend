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

describe('UserController (e2e)', () => {
    let app: INestApplication;
    let memberService: MemberService;
    let authService: AuthService;
    let memberRepository: Repository<Member>;
    let connection: DataSource;
  
    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      memberService = moduleFixture.get(MemberService);
      authService = moduleFixture.get(AuthService);
      memberRepository = moduleFixture.get(getRepositoryToken(Member))
      
      connection = moduleFixture.get(DataSource)
      app = moduleFixture.createNestApplication();
      await app.init();
    });


       describe('Sign up flow', () => {
        let createdMemberId: number;
        it('should create a new member', async () => {
    
            const validMember = {
                email: 'user@user2.com',
                password: 'testpassword',
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


       /*  it('should return error message when passed an invalid member', async () => {
            const invalidMember: Partial<CreateMemberDto> = {
                email: 'user@user.com',
                password: 'bla',
                firstName: 'name',
                lastName: 'lastname',
                phone: '12345',
            };
    
          const {body} = await request(app.getHttpServer())
          .post('/member')
          .send(invalidMember)
          .expect(400)
    
          expect(body.message[0]).toEqual('Password must be at least 8 characters long');
        }) */
        
      }) 
      afterAll(() => {
        app.close();
      });
    });
