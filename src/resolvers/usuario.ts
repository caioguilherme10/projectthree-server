import { Query, Resolver, Arg, Int } from "type-graphql";
import { Repository } from "typeorm";
import { Usuario } from "../entities/Usuario";

@Resolver()
export class UsuarioResolver {
    constructor(
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    @Query(() => [Usuario])
    async usuarios(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    @Query(() => Usuario, { nullable: true })
    usuario(
        @Arg('id', () => Int) id: number)
        : Promise<Usuario | undefined>
    {
        return this.usuarioRepository.findOne({ id });
    }
}