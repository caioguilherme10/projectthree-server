import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Endereco {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ name: "id" })
    id!: number;

    @Field(() => String)
    @Column({ type: "varchar", name: "logradouro", length: 50 })
    logradouro!: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "nu_end", length: 7 })
    numero!: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "compl_end", length: 15 })
    complemento!: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "bairro", length: 30 })
    bairro!: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "nm_mun_end", length: 30 })
    nomeMunicipio!: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "cod_mun_end", length: 6 })
    codMunicipio!: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "uf", length: 2 })
    uf!: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "cep", length: 10 })
    cep!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt = Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = Date;
}