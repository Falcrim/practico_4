import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { SongService } from "./song.service";
import { Song } from "./song.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { unlink } from "fs";
import { promisify } from "util";
const unlinkAsync = promisify(unlink);

@Controller("song")
export class SongController {
    constructor(private songService: SongService) {}
    @Get()
    list(): Promise<Song[]> {
        return this.songService.findAll();
    }
    @Get(":id")
    async get(@Param("id") id: number): Promise<Song | null> {
        const SongDB = await this.songService.findById(id);
        if (!SongDB) {
            throw new NotFoundException();
        }
        return SongDB;
    }
    @Post()
    async create(@Body() song: Song): Promise<Song> {
        return this.songService.createSong({
            id: 0,
            title: song.title,
            album: song.album,
        });
    }
    @Put(":id")
    async update(@Param("id") id: number, @Body() song: Song): Promise<Song> {
        const SongDB = await this.songService.findById(id);
        if (!SongDB) {
            throw new NotFoundException();
        }
        return this.songService.updateSong({
            id: id,
            title: song.title,
            album: song.album,
        });
    }
    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void> {
        const songDB = await this.songService.findById(id);
        if (!songDB) {
            throw new NotFoundException();
        }
        await this.songService.deleteSong(id);
    }
    @Post(":id/audio")
    @UseInterceptors(
        FileInterceptor("audio", {
            storage: diskStorage({
                destination: "./uploads/songs",
                filename: async (req, file, callback) => {
                    const id = req.params.id;
                    const newFileName = `${id}${extname(file.originalname)}`;
                    console.log(`Saving audio as: ${newFileName}`);
                    callback(null, newFileName);
                },
            }),
        }),
    )
    async uploadAudio(@Param("id") id: number, @UploadedFile() audio: Express.Multer.File) {
        const songDB = await this.songService.findById(id);
        if (!songDB) {
            await unlinkAsync(audio.path);
            throw new NotFoundException("Song not found");
        }

        return {
            message: "Audio de canción subido con éxito",
            filename: audio.filename,
            path: `/uploads/songs/${audio.filename}`,
        };
    }
}
