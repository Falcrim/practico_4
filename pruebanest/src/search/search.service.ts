import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { Genre } from "../genre/genre.model";
import { Artist } from "../artist/artist.model";
import { Album } from "../album/album.model";
import { Song } from "../song/song.model";

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(Genre)
        private genreRepository: Repository<Genre>,
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>,
        @InjectRepository(Album)
        private albumRepository: Repository<Album>,
        @InjectRepository(Song)
        private songRepository: Repository<Song>,
    ) { }

    async searchAll(query: string) {
        const genres = await this.genreRepository.find({
            where: { name: Like(`%${query}%`) },
        });

        const artists = await this.artistRepository.find({
            where: { name: Like(`%${query}%`) },
        });

        const albums = await this.albumRepository.find({
            where: { title: Like(`%${query}%`) },
            relations: ["artist", "songs"],
        });

        const songs = await this.songRepository.find({
            where: { title: Like(`%${query}%`) },
        });

        return { genres, artists, albums, songs };
    }
}
