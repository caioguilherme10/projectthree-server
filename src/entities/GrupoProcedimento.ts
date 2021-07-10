import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Procedimento } from './Procedimento';

@ObjectType()
@Entity()
export class GrupoProcedimento {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ name: "id" })
    id!: number;

    @Field(() => String)
    @Column({ type: "varchar", name: "descricao", length: 70 })
    descricao!: string;

    @Field(() => [Procedimento])
    @OneToMany(() => Procedimento, procedimento => procedimento.id)
    @JoinColumn({ name: "proce_id" })
    procedimentos: Procedimento[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt = new Date();

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = new Date();
}