import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ArtistService } from "./artist.service";
import { Artist } from "./artist.model";
import { ArtistDto } from "./dto/artist.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { unlink } from "fs";
import { promisify } from "util";
import { Album } from "../album/album.model";
const unlinkAsync = promisify(unlink);

@Controller("artist")
export class ArtistController {
    constructor(private artistService: ArtistService) {}
    @Get()
    list(): Promise<Artist[]> {
        return this.artistService.findAll();
    }
    @Get(":id")
    async get(@Param("id") id: number): Promise<Artist | null> {
        const artistDB = await this.artistService.findById(id);
        if (!artistDB) {
            throw new NotFoundException();
        }
        return artistDB;
    }
    @Get(":id/albums")
    async getAlbums(@Param("id") id: number): Promise<Album[]> {
        const artistDB = await this.artistService.findById(id);
        if (!artistDB) {
            throw new NotFoundException();
        }
        return artistDB.albums;
    }
    @Post()
    async create(@Body() artist: ArtistDto): Promise<Artist> {
        // console.log(checkGenre, "ARTISTA");
        // if (!checkGenre) {
        //     throw new NotFoundException("Genre not found");
        // }
        return this.artistService.createArtist({
            id: 0,
            name: artist.name,
            genre: artist.genre,
            albums: artist.albums,
        });
    }
    @Put(":id")
    async update(@Param("id") id: number, @Body() artist: ArtistDto): Promise<Artist> {
        const artistDB = await this.artistService.findById(id);
        if (!artistDB) {
            throw new NotFoundException();
        }
        // const checkGenre = await this.genreService.findById(artist.genre.id);
        // if (!checkGenre) {
        //     throw new NotFoundException("Genre not found");
        // }
        return this.artistService.updateArtist({
            id: id,
            name: artist.name,
            genre: artist.genre,
            albums: artist.albums,
        });
    }
    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void> {
        const artistDB = await this.artistService.findById(id);
        if (!artistDB) {
            throw new NotFoundException();
        }
        await this.artistService.deleteArtist(id);
    }
    @Post(":id/profile-picture")
    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
                destination: "./uploads/artists",
                filename: (req, file, callback) => {
                    const id = req.params.id;
                    const newFileName = `${id}${extname(file.originalname)}`;
                    callback(null, newFileName);
                },
            }),
        }),
    )
    async uploadFile(@Param("id") id: number, @UploadedFile() image: Express.Multer.File) {
        const genreDB = await this.artistService.findById(id);
        if (!genreDB) {
            await unlinkAsync(image.path);
            throw new NotFoundException("Artist not found");
        }

        return {
            message: "Imagen de género subida con éxito",
            filename: image.filename,
            path: `/uploads/artists/${image.filename}`,
        };
    }
}
