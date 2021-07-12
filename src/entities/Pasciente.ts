import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Endereco } from './Endereco';

export enum Sexo {
    M = "M",
	F = "F"
}

registerEnumType(Sexo, {
    name: "Sexo",
});

export enum Raca {
    BRANCA,
	PRETA,
    PARDA,
    AMARELA,
    INDIGENA,
    SEM_INFORMACAO
}

registerEnumType(Raca, {
    name: "Raca",
});

@ObjectType()
@Entity()
export class Pasciente {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ name: "id" })
    id!: number;

    @Field(() => String)
    @Column({ type: "varchar", name: "nome", length: 70 })
    nome!: string;

    @Field(() => String)
    @CreateDateColumn({ name: "dt_nasc" })
    nascimento = new Date();

    @Field(() => Sexo)
    @Column({ type: "enum", enum: Sexo, name: "sexo" })
    sexo!: Sexo;

    @Field(() => Raca)
    @Column({ type: "enum", enum: Raca, name: "raca_cor" })
    raca!: Raca;

    @Field(() => String)
    @Column({ type: "varchar", name: "nm_mae", length: 70 })
    nomeMae!: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "nu_cns", length: 15 })
    numCartaoNacSaude!: string;

    @Field(() => Endereco)
    @OneToOne(() => Endereco, { cascade: true })
    @JoinColumn({ name: "id_end" })
    endereco: Endereco;

    @Field(() => String)
    @CreateDateColumn()
    createdAt = Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = Date;
}