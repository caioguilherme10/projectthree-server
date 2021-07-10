import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Equipe {
    @Field(() => Int)
    @PrimaryGeneratedColumn({ name: "id" })
    id!: number;

    @Field(() => String)
    @Column({ type: "varchar", name: "profissional", length: 15 })
    profissional!: string;

    @Field(() => Int)
    @Column({ name: "cbo" })
    cbo!: number;
    
    @Field(() => String)
    @Column({ type: "varchar", name: "nome", length: 70 })
    nome!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt = new Date();

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = new Date();
}