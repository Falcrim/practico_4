import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Album } from "../../album/album.model";

export class SongDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;
    @IsNotEmpty()
    @IsNumber()
    readonly album: Album;
}
