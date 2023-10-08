import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('rooms')
@Unique(["roomName"]) // 여기에 추가
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomName: string;

  @Column()
  maxMembers: number;
  
  @Column('jsonb', { default: [] })
  messages: Array<{ senderId: string, content: string }>;
}
