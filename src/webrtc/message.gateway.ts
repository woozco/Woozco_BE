import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, { namespace: 'webrtc' }) // 3001 포트에서 실행
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('offer')
  handleOffer(client: Socket, data: any): void {
    client.broadcast.emit('offer', data);
  }

  @SubscribeMessage('answer')
  handleAnswer(client: Socket, data: any): void {
    client.broadcast.emit('answer', data);
  }

  @SubscribeMessage('ice-candidate')
  handleIceCandidate(client: Socket, data: any): void {
    client.broadcast.emit('ice-candidate', data);
  }
}
