import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './user/repository/user.repository';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { JwtService } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [User], // here we have added user enitity in entities array
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    CacheModule.register(),
  ],

  controllers: [AppController, UserController],
  providers: [AppService, UserRepository, UserService, JwtService],
})
export class AppModule {}
