import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Pasciente } from './Pasciente';
import { Cirurgico } from './Cirurgico';

export enum TipoProntuario {
    CLINICO = "CLINICO",
	CIRURGICO = "CIRURGICO"
}

registerEnumType(TipoProntuario, {
    name: "TipoProntuario",
});

@ObjectType()
@Entity()
export class Prontuario {
    @Field(() => String)
    @PrimaryColumn({ type: "varchar", name: "nu_prontuario", length: 15 })
    numProntuario!: string;

    @Field(() => TipoProntuario)
    @Column({ type: "enum", enum: TipoProntuario, name: "tp_prontuario" })
    tipoProntuario!: TipoProntuario;

    @Field(() => String)
    @Column({ type: "varchar", name: "apresentacao", length: 6 })
    apresentacao!: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "nu_aih", length: 13 })
    aih: string;

    @Field(() => String)
    @CreateDateColumn({ name: "dt_adm" })
    dataAdmissao = new Date();

    @Field(() => String)
    @CreateDateColumn({ name: "hr_adm" })
    horaAdmissao = new Date();

    @Field(() => String)
    @CreateDateColumn({ name: "dt_alta" })
    dataAlta = new Date();

    @Field(() => String)
    @Column({ type: "varchar", name: "tp_alta", length: 30 })
    tipoAlta: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "proc_regulado", length: 14 })
    procRegulado: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "mud_procedimento", length: 14 })
    mudProcedimento: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "cid1", length: 4 })
    cid1: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "cid2", length: 4 })
    cid2: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "cid_obito", length: 4 })
    cidObito: string;

    @Field(() => Pasciente)
    @ManyToOne(() => Pasciente, pasciente => pasciente.id)
    @JoinColumn({ name: "pasc_id" })
    pasciente: Pasciente;

    @Field(() => [Cirurgico])
    @OneToMany(() => Cirurgico, cirurgico => cirurgico.numProntuario, { cascade: true })
    @JoinColumn({ name: "nu_prontuario" })
    cirurgicos: Cirurgico[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt = new Date();

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = new Date();
}