import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "../artist/artist.model";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(() => Artist, artist => artist.genre)
    artists: Artist[];
}
