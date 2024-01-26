import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

const USER = User;

@Module({
  imports: [TypeOrmModule.forFeature([USER])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: getRepositoryToken(User),
      useValue: {},
    },
    UserRepository,
  ],
  exports: [TypeOrmModule],
})
export class UserModule {}
