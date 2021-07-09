import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Prontuario } from './entities/Prontuario';
import { Endereco } from './entities/Endereco';
import { Pasciente } from './entities/Pasciente';
import { createConnection } from 'typeorm';
import { PascienteResolver } from "./resolvers/pasciente";
import { ProntuarioResolver } from "./resolvers/prontuario";
import { UsuarioResolver } from "./resolvers/usuario";
import { Cirurgico } from './entities/Cirurgico';
import { Usuario } from './entities/Usuario';

const main = async () => {
    const conn = await createConnection({
        type: 'postgres',
        database: 'projectthreeDB',
        username: 'postgres',
        password: '0123',
        logging: true,
        synchronize: true,
        entities: [Prontuario, Pasciente, Endereco, Cirurgico, Usuario]
    });
    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PascienteResolver, ProntuarioResolver, UsuarioResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res })
    });
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
};

main().catch((err) => {
    console.error(err);
});