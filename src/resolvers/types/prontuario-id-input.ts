import { InputType, Field } from "type-graphql";

@InputType()
export class ProntuarioIdInput {
    @Field(() => String)
    numProntuario: string;
}