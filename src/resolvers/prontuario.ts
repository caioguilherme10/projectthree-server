import { Query, Resolver, Arg, Mutation } from "type-graphql";
import { Repository, getConnection } from "typeorm";
import { Prontuario } from "../entities/Prontuario";
import { ProntuarioInput } from "./types/prontuario-input";

@Resolver(Prontuario)
export class ProntuarioResolver {
    constructor(
        private readonly prontuarioRepository: Repository<Prontuario>,
    ) {}

    //ADMINISTRADOR
    @Query(() => [Prontuario])
    async prontuarios(): Promise<Prontuario[]> {
        return this.prontuarioRepository.find();
    }

    //ADMINISTRADOR, ANALISTA, AUDITOR, DIGITADOR
    @Query(() => Prontuario, { nullable: true })
    prontuario(
        @Arg('numProntuario', () => String) numProntuario: string)
        : Promise<Prontuario | undefined>
    {
        return this.prontuarioRepository.findOne({ numProntuario: numProntuario });
    }

    //ADMINISTRADOR
    @Mutation(() => Prontuario)
    async createProntuario(@Arg("input") input: ProntuarioInput): Promise<Prontuario> {
        const prontuario = this.prontuarioRepository.create({
            ...input,
        });
        return await this.prontuarioRepository.save(prontuario);
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
        await this.prontuarioRepository.delete({ numProntuario });
        return true;
    }
}