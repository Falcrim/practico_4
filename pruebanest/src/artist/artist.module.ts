import { Module } from "@nestjs/common";
import { ArtistController } from "./artist.controller";
import { ArtistService } from "./artist.service";
import { Artist } from "./artist.model";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { GenreModule } from "../genre/genre.module";

@Module({
    imports: [TypeOrmModule.forFeature([Artist])],
    controllers: [ArtistController],
    providers: [ArtistService],
    exports: [ArtistService],
})
export class ArtistModule {}
