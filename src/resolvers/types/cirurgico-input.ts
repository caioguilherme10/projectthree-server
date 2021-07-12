import { Cirurgico } from './../../entities/Cirurgico';
import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CirurgicoInput implements Partial<Cirurgico> {
    @Field(() => String)
    numProntuario: string;
    @Field(() => Int)
    numCirurgico: number;
    @Field(() => String)
    cirurgico: string;
    @Field(() => String)
    nome: string;
    @Field(() => String)
    especialidade: string;
}