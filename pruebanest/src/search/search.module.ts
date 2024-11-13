import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Genre } from "../genre/genre.model";
import { Artist } from "../artist/artist.model";
import { Album } from "../album/album.model";
import { Song } from "../song/song.model";

@Module({
    imports: [TypeOrmModule.forFeature([Genre, Artist, Album, Song])],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}
