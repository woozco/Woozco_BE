// user.dto.ts
import { IsNumber, IsString, IsUrl } from "class-validator";
// google.user.dto.ts
export class payloadDTO {
    @IsString()
    id: number;
    @IsString()
    email: string;
    @IsString()
    accessToken: string;

    // 다른 필요한 속성들을 추가할 수 있음
    constructor() {}

    setId(id: number): this {
        this.id = id;
        return this;
    }

    setEmail(email: string): this {
        this.email = email;
        return this;
    }

    setAccessToken(accessToken: string): this {
        this.accessToken = accessToken;
        return this;
    }
}
