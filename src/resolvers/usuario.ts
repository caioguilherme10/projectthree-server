import { Query, Resolver, Arg, Int, Mutation, ObjectType, Field, Ctx } from "type-graphql";
import { getConnection } from "typeorm";
import { Usuario } from "../entities/Usuario";
import { UsuarioInput } from "./types/usuario-input";
import { MyContext } from "../types";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Usuario, { nullable: true })
  user?: Usuario;
}

@Resolver(Usuario)
export class UsuarioResolver {

    //ADMINISTRADOR
    @Query(() => [Usuario])
    async usuarios(): Promise<Usuario[]> {
        const result = await getConnection()
            .createQueryBuilder()
            .select("usuario")
            .from(Usuario, "usuario")
            .getMany();
        return result;
    }

    //ADMINISTRADOR
    @Query(() => Usuario, { nullable: true })
    async usuario(
        @Arg('id', () => Int) id: number)
        : Promise<Usuario | undefined>
    {
        const result = await getConnection()
            .createQueryBuilder()
            .select("usuario")
            .from(Usuario, "usuario")
            .where("usuario.id = :id", { id })
            .getOne();
        return result;
    }

    //ADMINISTRADOR, ANALISTA, AUDITOR, DIGITADOR
    @Query(() => Usuario, { nullable: true })
    async buscarUsuarioCpf(
        @Arg('cpf', () => String) cpf: string)
        : Promise<Usuario | undefined>
    {
        const result = await getConnection()
            .createQueryBuilder()
            .select("usuario")
            .from(Usuario, "usuario")
            .where("usuario.cpf = :cpf", { cpf })
            .getOne();
        return result;
    }

    //login
    //ADMINISTRADOR, ANALISTA, AUDITOR, DIGITADOR
    @Mutation(() => UserResponse)
    async login(@Arg("cpf") cpf: string, @Arg("senha") senha: string, @Ctx() { req }: MyContext): Promise<UserResponse> {
        const user = await getConnection()
            .createQueryBuilder()
            .select("usuario")
            .from(Usuario, "usuario")
            .where("usuario.cpf = :cpf", { cpf })
            .getOne();
        if (!user) {
            return {
                errors: [
                    {
                        field: "cpf",
                        message: "Esse usuario não existe!",
                    },
                ],
            };
        }
        if (user.senha !== senha) {
            return {
                errors: [
                    {
                        field: "senha",
                        message: "senha incorreta",
                    },
                ],
            };
        }
        req.session.userId = user.id;
        return {
            user,
        };
    }

    //ADMINISTRADOR
    @Mutation(() => Usuario)
    async createUsuario(@Arg("input") input: UsuarioInput): Promise<Usuario> {
        const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Usuario)
            .values(input)
            .returning("*")
            .execute();
        return result.raw[0];
    }

    //MUDA OS DADOS ---SEM MUDA A SENHA---
    //ADMINISTRADOR

    //MUDAR A SENHA
    //ADMINISTRADOR, ANALISTA, AUDITOR, DIGITADOR

    //ADMINISTRADOR
    @Mutation(() => Boolean)
    async deleteUsuario(@Arg("id", () => Int) id: number): Promise<boolean> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Usuario)
            .where("id = :id", { id })
            .execute();
        return true;
    }
}