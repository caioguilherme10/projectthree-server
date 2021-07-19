import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Field, ObjectType, registerEnumType, Int } from "type-graphql";

export enum StatusUsuario {
    ATIVO = "ATIVO",
    INATIVO = "INATIVO",
    BLOQUEADO = "BLOQUEADO"
}

registerEnumType(StatusUsuario, {
    name: "StatusUsuario",
});

export enum TipoUsuario {
    ADMINISTRADOR = "ADMINISTRADOR",
    ANALISTA = "ANALISTA",
    AUDITOR = "AUDITOR",
    DIGITADOR = "DIGITADOR"
}

registerEnumType(TipoUsuario, {
    name: "TipoUsuario",
});

@ObjectType()
@Entity()
export class Usuario {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ name: "id" })
    id!: number;

    @Field(() => String)
    @Column({ type: "varchar", name: "cpf", length: 14, unique: true })
    cpf!: string;

    @Field(() => String)
    @Column({ type: "varchar", name: "nome", length: 70 })
    nome!: string;

    @Column({ type: "varchar", name: "senha", length: 60 })
    senha!: string;

    @Field(() => StatusUsuario)
    @Column({ type: "enum", enum: StatusUsuario, name: "status" })
    status!: StatusUsuario;

    @Field(() => TipoUsuario)
    @Column({ type: "enum", enum: TipoUsuario, name: "tipo" })
    tipo!: TipoUsuario;

    @Field(() => String)
    @CreateDateColumn()
    createdAt = Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = Date;
}