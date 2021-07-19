import { Query, Resolver, Arg, Int, Mutation } from "type-graphql";
import { getConnection } from "typeorm";
import { Pasciente } from "../entities/Pasciente";
import { PascienteInput } from "./types/pasciente-input";

@Resolver(Pasciente)
export class PascienteResolver {

    //ADMINISTRADOR
    @Query(() => [Pasciente])
    async pascientes(): Promise<Pasciente[]> {
        const result = await getConnection()
            .createQueryBuilder()
            .select("pasciente")
            .from(Pasciente, "pasciente")
            .getMany();
        return result;
    }

    //ADMINISTRADOR, ANALISTA, AUDITOR, DIGITADOR
    @Query(() => Pasciente, { nullable: true })
    async getPasciente(@Arg('id', () => Int) id: number): Promise<Pasciente | undefined> {
        const result = await getConnection()
            .createQueryBuilder()
            .select("pasciente")
            .from(Pasciente, "pasciente")
            .where("pasciente.id = :id", { id })
            .getOne();
        return result;
    }

    //ADMINISTRADOR, ANALISTA, AUDITOR, DIGITADOR
    @Query(() => Pasciente, { nullable: true })
    async getPascienteNome(@Arg('nome', () => String) nome: string): Promise<Pasciente | undefined> {
        const result = await getConnection()
            .createQueryBuilder()
            .select("pasciente")
            .from(Pasciente, "pasciente")
            .where("pasciente.nome = :nome", { nome })
            .getOne();
        return result;
    }

    //ADMINISTRADOR
    @Mutation(() => Pasciente)
    async createPasciente(@Arg("input") input: PascienteInput): Promise<Pasciente> {
        const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Pasciente)
            .values(input)
            .returning("*")
            .execute();
        return result.raw[0];
    }

    //ADMINISTRADOR
    @Mutation(() => Pasciente, {nullable: true})
    async updatePasciente(
        @Arg('id', () => Int) id: number,
        @Arg("input") input: PascienteInput
    )
        : Promise<Pasciente | null>
    {
        const result = await getConnection()
            .createQueryBuilder()
            .update(Pasciente)
            .set(input)
            .where('id = :id', {
                id,
            })
            .returning("*")
            .execute();
        return result.raw[0];
    }

    //ADMINISTRADOR
    @Mutation(() => Boolean)
    async deletePasciente(@Arg("id", () => Int) id: number): Promise<boolean> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Pasciente)
            .where("id = :id", { id })
            .execute();
        return true;
    }
}