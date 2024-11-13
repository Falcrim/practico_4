import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "../artist/artist.model";
import { Song } from "../song/song.model";

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @ManyToOne(() => Artist, artist => artist.albums)
    artist: Artist;
    @OneToMany(() => Song, song => song.album)
    songs: Song[];
}
