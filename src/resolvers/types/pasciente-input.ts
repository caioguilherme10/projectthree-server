import { InputType, Field } from "type-graphql";
import { Sexo, Raca } from "../../entities/Pasciente";
import { EnderecoInput } from "./endereco-input";

@InputType()
export class PascienteInput {
    @Field(() => String)
    nome: string;
    @Field(() => String)
    nascimento: string;
    @Field(() => Sexo)
    sexo: Sexo;
    @Field(() => Raca)
    raca: Raca;
    @Field(() => String)
    nomeMae: string;
    @Field(() => String)
    numCartaoNacSaude: string;
    @Field(() => EnderecoInput)
    endereco: EnderecoInput;
}