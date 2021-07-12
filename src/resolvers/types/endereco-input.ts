import { InputType, Field } from "type-graphql";

@InputType()
export class EnderecoInput {
    @Field(() => String)
    logradouro: string;
    @Field(() => String)
    numero: string;
    @Field(() => String)
    complemento: string;
    @Field(() => String)
    bairro: string;
    @Field(() => String)
    nomeMunicipio: string;
    @Field(() => String)
    codMunicipio: string;
    @Field(() => String)
    uf: string;
    @Field(() => String)
    cep: string;
}