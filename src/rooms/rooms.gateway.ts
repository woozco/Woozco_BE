// rooms.gateway.ts
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    WsResponse,
    OnGatewayDisconnect,
    OnGatewayConnection,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

import { RoomsService } from "./rooms.service";

@WebSocketGateway(3001, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private roomsService: RoomsService) {}

    @WebSocketServer()
    server: Server;

    afterInit() {
        console.log("WebSocket Initialized");
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage("createRoom")
    async handleCreateRoom(
        client: Socket,
        data: { roomName: string; maxMembers: number }
    ): Promise<void> {
        const room = await this.roomsService.createRoom(data);
        console.log("Making Room");
        client.emit("roomCreated", room);

        client.join(data.roomName);
        this.server.to(data.roomName).emit("joinedRoom", room);
    }

    @SubscribeMessage("deleteRoom")
    async handleDeleteRoom(client: Socket, roomName: string): Promise<void> {
        try {
            await this.roomsService.deleteRoom(roomName);
            client.emit("roomDeleted", roomName); 
            this.server.to(roomName).emit("roomDeletedAnnouncement", roomName);
        } catch (error) {
            client.emit(
                "error",
                `Failed to delete room ${roomName}: ${error.message}`
            );
        }
    }

    @SubscribeMessage("joinRoom")
    handleJoinRoom(client: Socket, room: string): void {
        client.join(room);
        this.server.to(room).emit("joinedRoom", room);
        console.log(`Client ${client.id} joined room ${room}`);
    }

    @SubscribeMessage("leaveRoom")
    handleLeaveRoom(client: Socket, room: string): void {
        client.leave(room);
        this.server.to(room).emit("leftRoom", room);
        console.log(`Client ${client.id} left room ${room}`);
    }

    @SubscribeMessage("sendMessage")
    async handleSendMessage(client: Socket, { room, content }) {
        await this.roomsService.addMessageToRoom(room, client.id, content);
        this.server.to(room).emit("newMessage", { senderId: client.id, content: content });
        console.log(`Message sent in room ${room}: ${content}`);
    }

    @SubscribeMessage("getMessages")
    async handleGetMessages(client: Socket, room: string) {
        const messages = await this.roomsService.getMessagesFromRoom(room);
        client.emit("roomMessages", messages);
    }

    @SubscribeMessage("getRooms")
    async handleGetRooms(client: Socket): Promise<void> {
        const allRoomsInDB = await this.roomsService.getAllRoomNames();
        client.emit("roomsList", allRoomsInDB);
        console.log(`Getting rooms: ${allRoomsInDB}`);
    }

    @SubscribeMessage("getClientsInRoom")
    async handleGetClientsInRoom(client: Socket, room: string) {
        const clients = await this.server.sockets.adapter.rooms[room]?.sockets || {};
        const clientIds = Object.keys(clients);
        console.log(`getClientsInRoom  ${clientIds}`)
        client.emit("clientsList", clientIds);
    }

    @SubscribeMessage("checkRoomExistence")
    async handleCheckRoomExistence(
        client: Socket,
        roomName: string
    ): Promise<void> {
        const exists = await this.roomsService.doesRoomExist(roomName);
        client.emit("roomExistenceResult", exists);
    }
}
