import { Query, Resolver, Arg, Int, Mutation, InputType, Field } from "type-graphql";
import { Repository, getConnection } from "typeorm";
import { Pasciente, Sexo, Raca } from "../entities/Pasciente";

@InputType()
class PascienteInput {
    @Field()
    nome: string;
    @Field()
    nascimento: string;
    @Field()
    sexo: Sexo;
    @Field()
    raca: Raca;
    @Field()
    nomeMae: string;
    @Field()
    numCartaoNacSaude: string;
    @Field()
    endereco: EnderecoInput;
}

@InputType()
class EnderecoInput {
    @Field()
    logradouro: string;
    @Field()
    numero: string;
    @Field()
    complemento: string;
    @Field()
    bairro: string;
    @Field()
    nomeMunicipio: string;
    @Field()
    codMunicipio: string;
    @Field()
    uf: string;
    @Field()
    cep: string;
}


@Resolver(Pasciente)
export class PascienteResolver {
    constructor(
        private readonly pascienteRepository: Repository<Pasciente>,
    ) {}

    //ADMINISTRADOR
    @Query(() => [Pasciente])
    async pascientes(): Promise<Pasciente[]> {
        return this.pascienteRepository.find();
    }

    //ADMINISTRADOR, ANALISTA, AUDITOR, DIGITADOR
    @Query(() => Pasciente, { nullable: true })
    getPasciente(@Arg('id', () => Int) id: number): Promise<Pasciente | undefined> {
        return this.pascienteRepository.findOne({ id });
    }

    //ADMINISTRADOR, ANALISTA, AUDITOR, DIGITADOR
    @Query(() => Pasciente, { nullable: true })
    getPascienteNome(@Arg('nome', () => String) nome: string): Promise<Pasciente | undefined> {
        return this.pascienteRepository.findOne({ nome: nome });
    }

    //ADMINISTRADOR
    @Mutation(() => Pasciente)
    async createPasciente(@Arg("input") input: PascienteInput): Promise<Pasciente> {
        const pasciente = this.pascienteRepository.create({
            ...input,
        });
        return await this.pascienteRepository.save(pasciente);
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
        await this.pascienteRepository.delete({ id });
        return true;
    }
}