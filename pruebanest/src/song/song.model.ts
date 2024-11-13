import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Album } from "../album/album.model";

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @ManyToOne(() => Album, album => album.songs)
    album: Album;
}
