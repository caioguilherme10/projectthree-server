import { Query, Resolver, Arg, Int } from "type-graphql";
import { Repository } from "typeorm";
import { Pasciente } from "../entities/Pasciente";

@Resolver()
export class PascienteResolver {
    constructor(
        private readonly pascienteRepository: Repository<Pasciente>,
    ) {}

    @Query(() => [Pasciente])
    async pascientes(): Promise<Pasciente[]> {
        return this.pascienteRepository.find();
    }

    @Query(() => Pasciente, { nullable: true })
    pasciente(
        @Arg('id', () => Int) id: number)
        : Promise<Pasciente | undefined>
    {
        return this.pascienteRepository.findOne({ id });
    }
}