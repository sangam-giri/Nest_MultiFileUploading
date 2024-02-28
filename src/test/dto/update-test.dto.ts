import { IsOptional,IsString} from "class-validator";



export class UpdateTestDto{
    
@IsOptional()
@IsString()
readonly testName:string;

}
