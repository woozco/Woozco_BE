import { IsNotEmpty } from "class-validator";

export class PostUpdateBoardDto {
    @IsNotEmpty()
    id: number;

    type: string;

    title: string;

    date: string;

    startTime: string;

    endTime: string;

    linkOfProblem: string;

    wantLanguage: string;

    body: string;
}
