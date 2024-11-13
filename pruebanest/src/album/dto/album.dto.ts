import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Artist } from "../../artist/artist.model";

export class AlbumDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;
    @IsNotEmpty()
    @IsNumber()
    readonly artist: Artist;
    @IsOptional()
    readonly songs?: null;
}
