import { Module } from "@nestjs/common";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { Album } from "./album.model";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Album])],
    controllers: [AlbumController],
    providers: [AlbumService],
    exports: [AlbumService],
})
export class AlbumModule {}
