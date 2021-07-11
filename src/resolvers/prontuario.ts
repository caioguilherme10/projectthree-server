import { Query, Resolver, Arg, Mutation, InputType, Field } from "type-graphql";
import { Repository, getConnection } from "typeorm";
import { Prontuario, TipoProntuario } from "../entities/Prontuario";

@InputType()
class ProntuarioInput {
    @Field()
    numProntuario: string;
    @Field()
    tipoProntuario: TipoProntuario;
    @Field()
    apresentacao: string;
    @Field()
    aih: string;
    @Field()
    dataAdmissao: string;
    @Field()
    horaAdmissao: string;
    @Field()
    dataAlta: string;
    @Field()
    tipoAlta: string;
    @Field()
    procRegulado: string;
    @Field()
    mudProcedimento: string;
    @Field()
    cid1: string;
    @Field()
    cid2: string;
    @Field()
    cidObito: string;
    @Field()
    pasciente: PascienteInput;
    @Field()
    cirurgicos: CirurgicoInput[];
}

@InputType()
class CirurgicoInput {
    @Field()
    numProntuario: string;
    @Field()
    numCirurgico: number;
    @Field()
    cirurgico: string;
    @Field()
    nome: string;
    @Field()
    especialidade: string;
}

@InputType()
class PascienteInput {
    @Field()
    id: number;
}

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
            .where('numProntuario = :numProntuario', {
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