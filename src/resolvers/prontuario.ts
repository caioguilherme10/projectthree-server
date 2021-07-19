import { Query, Resolver, Arg, Mutation } from "type-graphql";
import { getConnection } from "typeorm";
import { Prontuario } from "../entities/Prontuario";
import { ProntuarioInput } from "./types/prontuario-input";

@Resolver(Prontuario)
export class ProntuarioResolver {

    //ADMINISTRADOR
    @Query(() => [Prontuario])
    async prontuarios(): Promise<Prontuario[]> {
        const result = await getConnection()
            .createQueryBuilder()
            .select("prontuario")
            .from(Prontuario, "prontuario")
            .getMany();
        return result;
    }

    //ADMINISTRADOR, ANALISTA, AUDITOR, DIGITADOR
    @Query(() => Prontuario, { nullable: true })
    async prontuario(
        @Arg('numProntuario', () => String) numProntuario: string)
        : Promise<Prontuario | undefined>
    {
        const result = await getConnection()
            .createQueryBuilder()
            .select("prontuario")
            .from(Prontuario, "prontuario")
            .where("prontuario.nu_prontuario = :numProntuario", { numProntuario })
            .getOne();
        return result;
    }

    //ADMINISTRADOR
    @Mutation(() => Prontuario)
    async createProntuario(@Arg("input") input: ProntuarioInput): Promise<Prontuario> {
        const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Prontuario)
            .values(input)
            .returning("*")
            .execute();
        return result.raw[0];
    }

    //ADMINISTRADOR
    @Mutation(() => Prontuario, {nullable: true})
    async updateProntuario(
        @Arg('numProntuario', () => String) numProntuario: string,
        @Arg("input") input: ProntuarioInput
    )
        : Promise<Prontuario | null>
    {
        const result = await getConnection()
            .createQueryBuilder()
            .update(Prontuario)
            .set(input)
            .where('nu_prontuario = :numProntuario', {
                numProntuario,
            })
            .returning("*")
            .execute();
        return result.raw[0];
    }

    //ADMINISTRADOR
    @Mutation(() => Boolean)
    async deleteProntuario(@Arg("numProntuario", () => String) numProntuario: string): Promise<boolean> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Prontuario)
            .where("nu_prontuario = :numProntuario", { numProntuario })
            .execute();
        return true;
    }
}