import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestSchema } from './schema/test.schema';
import { TestController } from './test.controller';
import { TestService } from './test.service';
//This is where we have imported 


@Module({
  imports:[
    MongooseModule.forFeature([{name:'Test',schema:TestSchema}]),
  //Place all your imports here
   
  ],
  controllers: [TestController],
  providers: [TestService,]
})
export class TestModule {}
