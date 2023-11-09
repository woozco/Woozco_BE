import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsGateway } from './rooms.gateway';
import { RoomsService } from './rooms.service';
import { RoomEntity } from './entity/rooms.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomEntity]),],
  providers: [ RoomsGateway, RoomsService],
})
export class RoomsModule { }