import { IsNotEmpty, IsNumber } from "class-validator";

export class PostCreateBoardDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    date: string;

    @IsNotEmpty()
    startTime: string;

    @IsNotEmpty()
    endTime: string;

    @IsNotEmpty()
    linkOfProblem: string;

    @IsNotEmpty()
    wantLanguage: string;

    @IsNotEmpty()
    body: string;
}
