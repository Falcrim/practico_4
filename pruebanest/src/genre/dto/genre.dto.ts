import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GenreDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsOptional()
    readonly artists?: null;
}
