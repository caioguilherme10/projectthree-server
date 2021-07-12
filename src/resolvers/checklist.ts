import { Query, Resolver, Arg, Int, Mutation, InputType, Field } from "type-graphql";
import { Repository, getConnection } from "typeorm";
import { Checklist } from "../entities/Checklist";
import { EquipeInput } from "./types/equipe-input";
import { GrupoProcedimentoInput } from "./types/grupo-procedimento-input";
import { ProntuarioIdInput } from "./types/prontuario-id-input";

@InputType()
class ChecklistInput {
    @Field()
    prontuario: ProntuarioIdInput;
}

@Resolver(Checklist)
export class ChecklistResolver {
    constructor(
        private readonly checklistRepository: Repository<Checklist>,
    ) {}

    //ADMINISTRADOR, ANALISTA, AUDITOR, DIGITADOR
    @Query(() => [Checklist])
    async checklists(): Promise<Checklist[]> {
        return this.checklistRepository.find();
    }

    //ADMINISTRADOR, ANALISTA, AUDITOR, DIGITADOR
    @Query(() => Checklist, { nullable: true })
    checklist(
        @Arg('id', () => Int) id: number)
        : Promise<Checklist | undefined>
    {
        return this.checklistRepository.findOne({ id });
    }

    //ADMINISTRADOR, ANALISTA
    //parte 1 add numero do prontuario
    @Mutation(() => Checklist)
    async createCheckilistParte1(@Arg("input", () => ChecklistInput) input: ChecklistInput): Promise<Checklist> {
        const checklist = this.checklistRepository.create({
            ...input,
        });
        return await this.checklistRepository.save(checklist);
    }

    //ADMINISTRADOR, ANALISTA
    //parte 2 add equipe ser for cirurgico
    @Mutation(() => Checklist, {nullable: true})
    async createCheckilistParte2(
        @Arg('id', () => Int) id: number,
        @Arg("input", () => [EquipeInput]) input: EquipeInput[]
    )
        : Promise<Checklist | null>
    {
        const result = await getConnection()
            .createQueryBuilder()
            .update(Checklist)
            .set({equipes: input})
            .where('id = :id', {
                id,
            })
            .returning("*")
            .execute();
        return result.raw[0];
    }

    //ADMINISTRADOR, ANALISTA
    //parte 3 add grupo de procedimentos
    @Mutation(() => Checklist, {nullable: true})
    async createCheckilistParte3(
        @Arg('id', () => Int) id: number,
        @Arg("input", () => [GrupoProcedimentoInput]) input: GrupoProcedimentoInput[]
    )
        : Promise<Checklist | null>
    {
        const result = await getConnection()
            .createQueryBuilder()
            .update(Checklist)
            .set({grupoprocedimentos: input})
            .where('id = :id', {
                id,
            })
            .returning("*")
            .execute();
        return result.raw[0];
    }

    //ADMINISTRADOR, ANALISTA
    //parte 4 add observações
    @Mutation(() => Checklist, {nullable: true})
    async createCheckilistParte4(
        @Arg('id', () => Int) id: number,
        @Arg("observacoes", () => String) observacoes: string
    )
        : Promise<Checklist | null>
    {
        const result = await getConnection()
            .createQueryBuilder()
            .update(Checklist)
            .set({observacoes: observacoes})
            .where('id = :id', {
                id,
            })
            .returning("*")
            .execute();
        return result.raw[0];
    }

    //ADMINISTRADOR
    @Mutation(() => Boolean)
    async deleteChecklist(@Arg("id", () => Int) id: number): Promise<boolean> {
        await this.checklistRepository.delete({ id });
        return true;
    }
}