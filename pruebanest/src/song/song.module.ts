import { Module } from "@nestjs/common";
import { SongController } from "./song.controller";
import { SongService } from "./song.service";
import { Song } from "./song.model";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Song])],
    controllers: [SongController],
    providers: [SongService],
    exports: [SongService],
})
export class SongModule {}
