import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Persona {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombres: string;

    @Column()
    apellidos: string;

    @Column()
    edad: number;

    @Column()
    ciudad: string;

    @Column()
    genero: number;

    @Column({})
    fechaNacimiento: Date;
}
