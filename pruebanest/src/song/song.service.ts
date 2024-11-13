import { Injectable } from "@nestjs/common";
import { Song } from "./song.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(Song)
        private songRepository: Repository<Song>,
    ) {}
    findAll(): Promise<Song[]> {
        return this.songRepository.find({ relations: ["album"] });
    }
    findById(id: number): Promise<Song | null> {
        return this.songRepository.findOneBy({ id });
    }
    createSong(song: Song): Promise<Song> {
        return this.songRepository.save(song);
    }
    async updateSong(song: Song): Promise<Song> {
        await this.songRepository.update(song.id.toString(), song);
        return song;
    }
    async deleteSong(id: number): Promise<void> {
        await this.songRepository.delete(id);
    }
}
