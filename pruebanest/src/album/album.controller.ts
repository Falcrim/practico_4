import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { Album } from "./album.model";
import { unlink } from "fs";
import { promisify } from "util";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
const unlinkAsync = promisify(unlink);

@Controller("album")
export class AlbumController {
    constructor(private albumService: AlbumService) {}
    @Get()
    list(): Promise<Album[]> {
        return this.albumService.findAll();
    }
    @Get(":id")
    async get(@Param("id") id: number): Promise<Album | null> {
        const albumDB = await this.albumService.findById(id);
        if (!albumDB) {
            throw new NotFoundException();
        }
        return albumDB;
    }
    @Get(":id/songs")
    async getSongs(@Param("id") id: number): Promise<Album> {
        const albumDB = await this.albumService.findById(id);
        if (!albumDB) {
            throw new NotFoundException();
        }
        return albumDB;
    }
    @Post()
    async create(@Body() album: Album): Promise<Album> {
        return this.albumService.createAlbum({
            id: 0,
            title: album.title,
            artist: album.artist,
            songs: album.songs,
        });
    }
    @Put(":id")
    async update(@Param("id") id: number, @Body() album: Album): Promise<Album> {
        const albumDB = await this.albumService.findById(id);
        if (!albumDB) {
            throw new NotFoundException();
        }
        return this.albumService.updateAlbum({
            id: id,
            title: album.title,
            artist: album.artist,
            songs: album.songs,
        });
    }
    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void> {
        const albumDB = await this.albumService.findById(id);
        if (!albumDB) {
            throw new NotFoundException();
        }
        await this.albumService.deleteAlbum(id);
    }
    @Post(":id/profile-picture")
    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
                destination: "./uploads/albums",
                filename: (req, file, callback) => {
                    const id = req.params.id;
                    const newFileName = `${id}${extname(file.originalname)}`;
                    callback(null, newFileName);
                },
            }),
        }),
    )
    async uploadFile(@Param("id") id: number, @UploadedFile() image: Express.Multer.File) {
        const genreDB = await this.albumService.findById(id);
        if (!genreDB) {
            await unlinkAsync(image.path);
            throw new NotFoundException("Album not found");
        }

        return {
            message: "Imagen de género subida con éxito",
            filename: image.filename,
            path: `/uploads/albums/${image.filename}`,
        };
    }
}
