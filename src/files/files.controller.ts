import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { Response } from 'express'
import { fileNamer,fileFilter } from './helpers';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) {}
  
  @Get('product/:imageName')
  findProductImage(
    @Param('imageName')imageName:string,
    @Res()res:Response
  ){
    const path = this.filesService.getStaticProductImage(imageName)
    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: fileFilter,
    // limits : {fileSize:1000}
    storage: diskStorage({
      destination:'./static/uploads',
      filename:fileNamer
    })
  }))
  uploadProductImage(
    @UploadedFile() file:Express.Multer.File,
  ){
    if(!file){
      throw new BadRequestException('Make sure that the file is an image')
    }
    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`;
    return { secureUrl }
  }
}