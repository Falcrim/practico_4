import { Injectable } from "@nestjs/common";
import { Album } from "./album.model";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album)
        private albumRepository: Repository<Album>,
    ) {}
    findAll(): Promise<Album[]> {
        return this.albumRepository.find({ relations: ["artist", "songs"] });
    }
    findById(id: number): Promise<Album | null> {
        return this.albumRepository.findOne({ where: { id }, relations: ["artist", "songs"] });
    }
    createAlbum(album: Album): Promise<Album> {
        return this.albumRepository.save(album);
    }
    async updateAlbum(album: Album): Promise<Album> {
        await this.albumRepository.update(album.id.toString(), album);
        return album;
    }
    async deleteAlbum(id: number): Promise<void> {
        await this.albumRepository.delete(id);
    }
}
