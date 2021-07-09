import { Query, Resolver, Arg } from "type-graphql";
import { Repository } from "typeorm";
import { Prontuario } from "../entities/Prontuario";

@Resolver()
export class ProntuarioResolver {
    constructor(
        private readonly prontuarioRepository: Repository<Prontuario>,
    ) {}

    @Query(() => [Prontuario])
    async prontuarios(): Promise<Prontuario[]> {
        return this.prontuarioRepository.find();
    }

    @Query(() => Prontuario, { nullable: true })
    prontuario(
        @Arg('numProntuario', () => String) numProntuario: string)
        : Promise<Prontuario | undefined>
    {
        return this.prontuarioRepository.findOne({ numProntuario: numProntuario });
    }
}