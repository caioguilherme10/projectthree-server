import { InputType, Field } from "type-graphql";

@InputType()
export class PascienteIdInput {
    @Field()
    id: number;
}