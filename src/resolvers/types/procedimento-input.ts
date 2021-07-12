import { InputType, Field, Int } from "type-graphql";

@InputType()
export class ProcedimentoInput {
    @Field(() => String)
    descricao: string;
    @Field(() => String)
    cod: string;
    @Field(() => String)
    comp1: string;
    @Field(() => String)
    comp2: string;
    @Field(() => String)
    comp3: string;
    @Field(() => String)
    codsus: string;
    @Field(() => Int)
    qtd: number;
    @Field(() => String)
    nome: string;
    @Field(() => [String])
    cirur: string[];
    @Field(() => [String])
    qtdcirur: string[];
    @Field(() => String)
    fornecedor: string;
    @Field(() => String)
    numNF: string;
}