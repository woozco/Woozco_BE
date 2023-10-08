import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoomEntity } from "./entity/rooms.entity";

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(RoomEntity)
        private roomRepository: Repository<RoomEntity>
    ) {}

    async createRoom(data: {
        roomName: string;
        maxMembers: number;
    }): Promise<RoomEntity> {
        const newRoom = this.roomRepository.create(data);
        return await this.roomRepository.save(newRoom);
    }

    async deleteRoom(roomName: string): Promise<void> {
        const roomToDelete = await this.roomRepository.findOne({
            where: { roomName: roomName },
        });
        if (roomToDelete) {
            await this.roomRepository.remove(roomToDelete);
        } else {
            throw new Error("Room not found");
        }
    }

    async addMessageToRoom(roomName: string, senderId: string, content: string): Promise<void> {
        const room = await this.roomRepository.findOne({
            where: { roomName: roomName },
        });
        if(room) {
            room.messages.push({ senderId, content });
            await this.roomRepository.save(room); 
        } else {
            throw new Error("Room not found");
        }
    }

    async getMessagesFromRoom(roomName: string): Promise<Array<{ senderId: string, content: string }>> {
        const room = await this.roomRepository.findOne({
            where: { roomName: roomName },
        });
        return room ? room.messages : [];
    }

    async getAllRoomNames(): Promise<string[]> {
        const rooms = await this.roomRepository.find();
        return rooms.map(room => room.roomName);
    }
    
    async doesRoomExist(roomName: string): Promise<boolean> {
        const room = await this.findRoomByName(roomName);
        return !!room;
    }

    private async findRoomByName(roomName: string): Promise<RoomEntity | undefined> {
        return await this.roomRepository.findOne({
            where: { roomName: roomName },
        });
    }
}
