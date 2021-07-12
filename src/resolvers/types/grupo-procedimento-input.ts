import { InputType, Field } from "type-graphql";
import { ProcedimentoInput } from "./procedimento-input";

@InputType()
export class GrupoProcedimentoInput {
    @Field(() => String)
    descricao: string;
    @Field(() => [ProcedimentoInput])
    procedimentos: ProcedimentoInput[];
}