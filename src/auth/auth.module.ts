import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt.strategy';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from 'src/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret:
        '448682f61d8ce3afb50c85bbe557ca9a9af283331d8af422c62859a769a4eab2', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    UserModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    {
      provide: getRepositoryToken(User),
      useValue: {},
    },
    UserRepository,
  ],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
