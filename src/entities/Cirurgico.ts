import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Cirurgico {
    @Field(() => String)
    @PrimaryColumn({ name: "nu_prontuario" })
    numProntuario!: string;

    @Field(() => Int)
    @PrimaryColumn({ name: "nu_cri" })
    numCirurgico!: number;

    @Field(() => String)
    @Column({ type: "varchar", name: "cri", length: 30 })
    cirurgico!: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "nome", length: 70 })
    nome!: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "especialidade", length: 30 })
    especialidade!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt = Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = Date;
}