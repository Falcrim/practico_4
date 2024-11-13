import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Genre } from "./genre.model";
import { Repository } from "typeorm";

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(Genre)
        private genreRepository: Repository<Genre>,
    ) {}
    findAll(): Promise<Genre[]> {
        return this.genreRepository.find({ relations: ["artists"] });
    }
    findById(id: number): Promise<Genre | null> {
        return this.genreRepository.findOne({ where: { id }, relations: ["artists"] });
    }
    createGenre(genre: Genre): Promise<Genre> {
        return this.genreRepository.save(genre);
    }
    async updateGenre(genre: Genre): Promise<Genre> {
        await this.genreRepository.update(genre.id.toString(), genre);
        return genre;
    }
    async deleteGenre(id: number): Promise<void> {
        await this.genreRepository.delete(id);
    }
}
