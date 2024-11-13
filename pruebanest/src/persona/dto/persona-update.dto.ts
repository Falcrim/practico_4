import { IsISO8601, IsNumber, IsOptional, IsString } from "class-validator";

export class PersonaUpdateDto {
    @IsOptional()
    @IsString()
    readonly nombres: string;
    @IsOptional()
    @IsString()
    readonly apellidos: string;
    @IsOptional()
    @IsNumber()
    readonly edad: number;
    @IsOptional()
    @IsString()
    readonly ciudad: string;
    @IsOptional()
    @IsNumber()
    readonly genero: number;
    @IsOptional()
    @IsISO8601()
    readonly fechaNacimiento: Date;
}
