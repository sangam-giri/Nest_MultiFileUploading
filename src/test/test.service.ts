import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as  mongoose from 'mongoose';
import {Test} from './schema/test.schema';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
    constructor(
        @InjectModel(Test.name)
        private testModel: mongoose.Model<Test>
    ) {}

  async findAll(): Promise<Test[]> {
const test = await this.testModel.find();
        return test;
    }

  async create(test: CreateTestDto,): Promise<string> {
const  res = await  this.testModel.create(test);
        return "Successfully added !";
    }

    

  async findById(id: string): Promise<Test> {
        const isValidId = mongoose.isValidObjectId(id)
        if (!isValidId) {
            throw new NotFoundException('Please enter correct id');
        }
        const test = await this.testModel.findById(id);

        if (!test) {
            throw new NotFoundException('Not found !');
        }
        return test;
    }

      async search(keyword:string):Promise<any>{
    const results = await this.testModel.find({
        $or:[{testName: { $regex: keyword, $options: 'i' } },
		]
      });
      return results;
    }

  async updateById(id: string, test: UpdateTestDto): Promise<Test> {
        return await this.testModel.findByIdAndUpdate(id, test, {
            new: true,
            runValidators: true
        });
    }

  async deleteById(id: string): Promise<string> {
         await this.testModel.findByIdAndDelete(id);
         return "Successfully Deleted !";
    }
}
