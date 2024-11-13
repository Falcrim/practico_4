import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PersonaController } from "./persona/persona.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Persona } from "./persona/persona.model";
import { PersonaService } from "./persona/persona.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { User } from "./users/user.model";
import { GenreModule } from "./genre/genre.module";
import { ArtistModule } from "./artist/artist.module";
import { AlbumModule } from "./album/album.module";
import { SongModule } from "./song/song.module";
import { Genre } from "./genre/genre.model";
import { Artist } from "./artist/artist.model";
import { Album } from "./album/album.model";
import { Song } from "./song/song.model";
import { SearchModule } from "./search/search.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "pruebanest",
            entities: [Persona, User, Genre, Artist, Album, Song],
            synchronize: true, //solo mientras estén en desarrollo
        }),
        TypeOrmModule.forFeature([Persona]),
        AuthModule,
        UsersModule,
        GenreModule,
        ArtistModule,
        AlbumModule,
        SongModule,
        SearchModule,
    ],
    controllers: [AppController, PersonaController],
    providers: [AppService, PersonaService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
