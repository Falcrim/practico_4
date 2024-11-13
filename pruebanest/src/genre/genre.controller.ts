import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { GenreService } from "./genre.service";
import { Genre } from "./genre.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { unlink } from "fs";
import { promisify } from "util";
import { diskStorage } from "multer";
import { extname } from "path";
import { Artist } from "../artist/artist.model";
const unlinkAsync = promisify(unlink);

@Controller("genre")
export class GenreController {
    constructor(private genreService: GenreService) {}
    @Get()
    list() {
        return this.genreService.findAll();
    }
    @Get(":id")
    async get(@Param("id") id: number): Promise<Genre | null> {
        const genreDB = await this.genreService.findById(id);
        if (!genreDB) {
            throw new NotFoundException();
        }
        return genreDB;
    }
    @Get(":id/artists")
    async getArtists(@Param("id") id: number): Promise<Artist[]> {
        const genreDB = await this.genreService.findById(id);
        if (!genreDB) {
            throw new NotFoundException();
        }
        return genreDB.artists;
    }
    @Post()
    create(@Body() genre: Genre): Promise<Genre> {
        return this.genreService.createGenre({
            id: 0,
            name: genre.name,
            artists: genre.artists ?? [],
        });
    }
    @Put(":id")
    async update(@Param("id") id: number, @Body() genre: Genre): Promise<Genre> {
        const genreDB = await this.genreService.findById(id);
        if (!genreDB) {
            throw new NotFoundException();
        }
        return this.genreService.updateGenre({
            id: id,
            name: genre.name,
            artists: genre.artists ?? genreDB.artists,
        });
    }
    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void> {
        const genreDB = await this.genreService.findById(id);
        if (!genreDB) {
            throw new NotFoundException();
        }
        return this.genreService.deleteGenre(id);
    }
    @Post(":id/profile-picture")
    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
                destination: "./uploads/genres",
                filename: (req, file, callback) => {
                    const id = req.params.id;
                    const newFileName = `${id}${extname(file.originalname)}`;
                    callback(null, newFileName);
                },
            }),
        }),
    )
    async uploadFile(@Param("id") id: number, @UploadedFile() image: Express.Multer.File) {
        const genreDB = await this.genreService.findById(id);
        if (!genreDB) {
            await unlinkAsync(image.path);
            throw new NotFoundException("Genre not found");
        }

        return {
            message: "Imagen de género subida con éxito",
            filename: image.filename,
            path: `/uploads/genres/${image.filename}`,
        };
    }
}
// @Post(":id/profile-picture")
// @UseInterceptors(FileInterceptor("image"))
// async uploadFile(@Param("id") id: number, @UploadedFile() image: Express.Multer.File) {
//     const genreDB = await this.genreService.findById(id);
//     if (!genreDB) {
//         await unlinkAsync(image.path);
//         throw new NotFoundException();
//     }
//     return {
//         filename: image.filename,
//         path: image.path,
//     };
// }
