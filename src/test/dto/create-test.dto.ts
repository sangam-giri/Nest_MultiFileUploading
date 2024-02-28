import {IsNotEmpty,IsString} from "class-validator";



export class CreateTestDto{
    
@IsNotEmpty()
@IsString()
readonly testName:string;

}
