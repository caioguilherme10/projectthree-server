import { InputType, Field } from "type-graphql";
import { StatusUsuario, TipoUsuario } from "../../entities/Usuario";

@InputType()
export class UsuarioInput {
    @Field(() => String)
    cpf: string;
    @Field(() => String)
    nome: string;
    @Field(() => String)
    cirurgico: string;
    @Field(() => String)
    senha: string;
    @Field(() => StatusUsuario)
    status: StatusUsuario;
    @Field(() => TipoUsuario)
    tipo: TipoUsuario;
}