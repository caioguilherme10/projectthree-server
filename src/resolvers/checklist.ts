import { Query, Resolver, Arg, Int } from "type-graphql";
import { Repository } from "typeorm";
import { Checklist } from "../entities/Checklist";

@Resolver()
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
}