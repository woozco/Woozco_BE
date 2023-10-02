import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOneOptions } from "typeorm";
import { PostCreateBoardDto } from "./dto/create-post.dto";
import { BoardEntity } from "./entities/board.entity";

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>
    ) {}

    async createPost(createPostDto: PostCreateBoardDto): Promise<BoardEntity> {
        const newPost = this.boardRepository.create(createPostDto);
        return await this.boardRepository.save(newPost);
    }

    async getAllPosts(): Promise<BoardEntity[]> {
        return await this.boardRepository.find();
    }

    async getPostById(id: number): Promise<BoardEntity> {
        const options: FindOneOptions<BoardEntity> = { where: { id } };
        const post = await this.boardRepository.findOne(options);
        if (!post) {
            throw new NotFoundException(
                `ID가 ${id}인 게시물을 찾을 수 없습니다.`
            );
        }
        return post;
    }

    async updatePost(
        id: number,
        updatePostDto: PostCreateBoardDto
    ): Promise<BoardEntity> {
        const post = await this.getPostById(id);
        // 엔터티의 속성을 DTO의 속성으로 업데이트
        post.type = updatePostDto.type;
        post.title = updatePostDto.title;
        post.date = updatePostDto.date;
        post.startTime = updatePostDto.startTime;
        post.endTime = updatePostDto.endTime;
        post.linkOfProblem = updatePostDto.linkOfProblem;
        post.wantLanguage = updatePostDto.wantLanguage;
        post.body = updatePostDto.body;

        return await this.boardRepository.save(post);
    }

    async deletePost(id: number): Promise<void> {
        const post = await this.getPostById(id);
        await this.boardRepository.remove(post);
    }
}
