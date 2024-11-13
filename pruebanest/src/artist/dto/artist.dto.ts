import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Genre } from "../../genre/genre.model";

export class ArtistDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsNumber()
    readonly genre: Genre;
    @IsOptional()
    readonly albums?: null;
}
