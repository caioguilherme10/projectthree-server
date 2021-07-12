import { Query, Resolver, Arg, Int, Mutation } from "type-graphql";
import { Repository } from "typeorm";
import { Usuario } from "../entities/Usuario";
import { UsuarioInput } from "./types/usuario-input";

@Resolver(Usuario)
export class UsuarioResolver {
    constructor(
        private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    //ADMINISTRADOR
    @Query(() => [Usuario])
    async usuarios(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    //ADMINISTRADOR
    @Query(() => Usuario, { nullable: true })
    usuario(
        @Arg('id', () => Int) id: number)
        : Promise<Usuario | undefined>
    {
        return this.usuarioRepository.findOne({ id });
    }

    //ADMINISTRADOR, ANALISTA, AUDITOR, DIGITADOR
    @Query(() => Usuario, { nullable: true })
    buscarUsuarioCpf(
        @Arg('cpf', () => String) cpf: string)
        : Promise<Usuario | undefined>
    {
        return this.usuarioRepository.findOne({ cpf });
    }

    //login
    //ADMINISTRADOR, ANALISTA, AUDITOR, DIGITADOR

    //ADMINISTRADOR
    @Mutation(() => Usuario)
    async createUsuario(@Arg("input") input: UsuarioInput): Promise<Usuario> {
        const usuario = this.usuarioRepository.create({
            ...input,
        });
        return await this.usuarioRepository.save(usuario);
    }

    //MUDA OS DADOS ---SEM MUDA A SENHA---
    //ADMINISTRADOR

    //MUDAR A SENHA
    //ADMINISTRADOR, ANALISTA, AUDITOR, DIGITADOR

    //ADMINISTRADOR
    @Mutation(() => Boolean)
    async deleteUsuario(@Arg("id", () => Int) id: number): Promise<boolean> {
        await this.usuarioRepository.delete({ id });
        return true;
    }
}