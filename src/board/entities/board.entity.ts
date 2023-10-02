// board/entities/board.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class BoardEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    title: string;

    @Column()
    date: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @Column()
    linkOfProblem: string;

    @Column()
    wantLanguage: string;

    @Column()
    body: string;
}
