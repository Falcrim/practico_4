import { Injectable } from "@nestjs/common";
import { Artist } from "./artist.model";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist)
        private artistsRepository: Repository<Artist>,
    ) {}
    findAll(): Promise<Artist[]> {
        return this.artistsRepository.find({ relations: ["genre", "albums"] });
    }
    findById(id: number): Promise<Artist | null> {
        return this.artistsRepository.findOne({ where: { id }, relations: ["genre", "albums"] });
    }
    createArtist(artist: Artist): Promise<Artist> {
        return this.artistsRepository.save(artist);
    }
    async updateArtist(artist: Artist): Promise<Artist> {
        await this.artistsRepository.update(artist.id.toString(), artist);
        return artist;
    }
    async deleteArtist(id: number): Promise<void> {
        await this.artistsRepository.delete(id);
    }
}
