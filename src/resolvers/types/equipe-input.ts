import { Equipe } from "src/entities/Equipe";
import { InputType, Field, Int } from "type-graphql";

@InputType()
export class EquipeInput implements Partial<Equipe>{
    @Field(() => String)
    profissional: string;
    @Field(() => Int)
    cbo: number;
    @Field(() => String)
    nome: string;
}