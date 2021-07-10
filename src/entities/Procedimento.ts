import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Procedimento {
    @Field(() => Int)
    @PrimaryColumn({ name: "id" })
    id!: number;

    //procedimento, exame, OPM e profissional
    @Field(() => String)
    @Column({ type: "varchar", name: "descricao", length: 70 })
    descricao!: string;

    //cod do procedimento
    @Field(() => String)
    @Column({ type: "varchar", name: "cod", length: 20 })
    cod!: string;

    //comp1 mes1
    @Field(() => String)
    @Column({ type: "varchar", name: "comp1", length: 10 })
    comp1!: string;
    
    //comp2 mes2
    @Field(() => String)
    @Column({ type: "varchar", name: "comp2", length: 10 })
    comp2!: string;

    //comp3 mes3
    @Field(() => String)
    @Column({ type: "varchar", name: "comp3", length: 10 })
    comp3!: string;
    
    //codigo sus
    @Field(() => String)
    @Column({ type: "varchar", name: "codsus", length: 20 })
    codsus!: string;

    @Field(() => Int)
    @Column({ name: "qtd" })
    qtd!: number;

    @Field(() => String)
    @Column({ type: "varchar", name: "nome", length: 70 })
    nome!: string;

    //cirur 5 desses
    @Field(() => [String])
    @Column("simple-array", { name: "cirur" })
    cirur!: string[];

    //qtd cirur
    @Field(() => [String])
    @Column("simple-array", { name: "qtd_cirur" })
    qtdcirur!: string[];

    //fornecedor
    @Field(() => String)
    @Column({ type: "varchar", name: "fornecedor", length: 50 })
    fornecedor!: string;

    //numero da Nota Fiscal
    @Field(() => String)
    @Column({ type: "varchar", name: "num_nf", length: 20 })
    numNF!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt = new Date();

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = new Date();
}