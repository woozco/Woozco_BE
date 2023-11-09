import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { BoardService } from "./board.service";
import { PostCreateBoardDto } from "./dto/create-post.dto";
import { PostUpdateBoardDto } from "./dto/update-post.dto";

@Controller("api/board")
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post("create")
    async createPost(@Body() createPostDto: PostCreateBoardDto) {
        return this.boardService.createPost(createPostDto);
    }

    @Get("all")
    async getAllPosts() {
        return this.boardService.getAllPosts();
    }

    @Get(":id")
    async getPostById(@Param("id") id: number) {
        return this.boardService.getPostById(id);
    }

    @HttpCode(HttpStatus.OK)
    @Post(":id/update")
    async updatePost(@Param("id") id: number, @Body() updatePostDto: PostUpdateBoardDto) {
        return this.boardService.updatePost(id, updatePostDto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id/delete")
    async deletePost(@Param("id") id: number) {
        return this.boardService.deletePost(id);
    }
}
