import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res, UploadedFiles } from '@nestjs/common';
import { FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileService } from './files.service';

@Controller('upload')
export class FilesController {
  constructor(private readonly fileService: FileService) {}

  @Get('/:image')
  async getFile(@Param('image') image: string, @Res() res: Response) {
    await this.fileService.downloadFile(image, res);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    const image = await this.fileService.uploadFile(file);
    return { image };
  }


  @Post('uploads')
  @UseInterceptors(FilesInterceptor('file'))
  async upload(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('Files:', files);
    if (!files || files.length === 0) {
      throw new Error('No files uploaded');
    }
  console.log('WORKING:::::');
  const uploadedImages = [];
  for (const file of files) {
    const image = await this.fileService.uploadFile(file);
    uploadedImages.push(image);
  }

  return { images: uploadedImages };
  }
  
}
