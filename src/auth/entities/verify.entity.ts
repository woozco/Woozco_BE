import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Verify {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    verifyCode: number;
}
