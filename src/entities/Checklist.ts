import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Prontuario } from './Prontuario';
import { GrupoProcedimento } from './GrupoProcedimento';
import { Equipe } from './Equipe';

@ObjectType()
@Entity()
export class Checklist {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ name: "id" })
    id!: number;

    //prontuario onetoone
    @Field(() => Prontuario)
    @OneToOne(() => Prontuario)
    @JoinColumn({ name: "id_pron" })
    prontuario: Prontuario;

    //equipes profissionais
    @Field(() => [Equipe])
    @OneToMany(() => Equipe, equipe => equipe.id)
    @JoinColumn({ name: "equipe_id" })
    equipes: Equipe[];

    //grupoProcedimento onetomany
    @Field(() => [GrupoProcedimento])
    @OneToMany(() => GrupoProcedimento, grupoprocedimento => grupoprocedimento.id)
    @JoinColumn({ name: "grupo_id" })
    grupoprocedimentos: GrupoProcedimento[];

    @Field(() => String)
    @Column({ type: "varchar", name: "observacoes", length: 200 })
    observacoes!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt = new Date();

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = new Date();
}