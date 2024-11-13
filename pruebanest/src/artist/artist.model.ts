import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Genre } from "../genre/genre.model";
import { Album } from "../album/album.model";

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @ManyToOne(() => Genre, genre => genre.artists)
    genre: Genre;
    @OneToMany(() => Album, album => album.artist)
    albums: Album[];
}
