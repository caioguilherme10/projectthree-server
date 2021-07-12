import { InputType, Field } from "type-graphql";
import { TipoProntuario } from "../../entities/Prontuario";
import { CirurgicoInput } from "./cirurgico-input";
import { PascienteIdInput } from "./pasciente-id-input";

@InputType()
export class ProntuarioInput {
    @Field(() => String)
    numProntuario: string;
    @Field(() => TipoProntuario)
    tipoProntuario: TipoProntuario;
    @Field(() => String)
    apresentacao: string;
    @Field(() => String)
    aih: string;
    @Field(() => String)
    dataAdmissao: string;
    @Field(() => String)
    horaAdmissao: string;
    @Field(() => String)
    dataAlta: string;
    @Field(() => String)
    tipoAlta: string;
    @Field(() => String)
    procRegulado: string;
    @Field(() => String)
    mudProcedimento: string;
    @Field(() => String)
    cid1: string;
    @Field(() => String)
    cid2: string;
    @Field(() => String)
    cidObito: string;
    @Field(() => PascienteIdInput)
    pasciente: PascienteIdInput;
    @Field(() => [CirurgicoInput])
    cirurgicos: CirurgicoInput[];
}