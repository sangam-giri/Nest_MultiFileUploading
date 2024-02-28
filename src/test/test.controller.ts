import { Body, Controller,Delete,Get,Param,Post, Put,Req,  } from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from './schema/test.schema';
import { UpdateTestDto } from './dto/update-test.dto';
import { CreateTestDto } from './dto/create-test.dto';
import { SearchDto } from './dto/keyword-search.dto';

@Controller('test')
export class TestController {
    constructor (private testService:TestService,){
    }

  @Get('all-test')
    async getAllTest():Promise<Test[]>{
        return this.testService.findAll()
    }
   

  @Post('add-test')
async createTest(
        @Body()
        test:CreateTestDto):Promise<string>{

    return this.testService.create(test,);
    }
    

  @Get(':id')
    async getTest(
        @Param('id') id:string
    ):Promise<Test>{
        return this.testService.findById(id);
    }

      @Get('search')
  async search(@Body() searchDto:SearchDto):Promise<any>{
       return await this.testService.search(searchDto.keyword);
    }

     @Put(':id')
    async updateTest(
        @Param('id')
        id:string,
        @Body()
         test:UpdateTestDto):Promise<Test>{
    return this.testService.updateById(id,test);
    }
   
     @Delete(':id')
     
    async deleteTest(
        @Param('id') id:string
    ):Promise<string>{
        return this.testService.deleteById(id);
    }
}
