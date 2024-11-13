import { IsISO8601, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PersonaDto {
    @IsNotEmpty()
    @IsString()
    readonly nombres: string;
    @IsNotEmpty()
    @IsString()
    readonly apellidos: string;
    @IsNotEmpty()
    @IsNumber()
    readonly edad: number;
    @IsNotEmpty()
    @IsString()
    readonly ciudad: string;
    @IsNotEmpty()
    @IsNumber()
    readonly genero: number;
    @IsNotEmpty()
    @IsISO8601()
    readonly fechaNacimiento: Date;
}
