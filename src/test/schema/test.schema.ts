import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";



@Schema({
    collection:"test",
    timestamps:true
})export class Test{
    


@Prop()
testName: string

}
export const TestSchema = SchemaFactory.createForClass(Test);
