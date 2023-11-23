import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { BoardEntity } from './board/entities/board.entity';

import { RoomsGateway } from './rooms/rooms.gateway';
import { RoomsService } from './rooms/rooms.service';
import { RoomEntity } from './rooms/entity/rooms.entity';
import { RoomsModule } from './rooms/rooms.module.ts';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, BoardEntity,RoomEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get("JWT_SECRET"),
      }),
    }),
    UsersModule,
    AuthModule,
    BoardModule,
    RoomsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }