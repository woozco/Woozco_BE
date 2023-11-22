import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GoogleUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: 'Empty' })
    picture: string;

    @Column()
    accessToken: string;

    @Column()
    refreshToken: string;
}