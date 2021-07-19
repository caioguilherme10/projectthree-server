import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from 'typeorm';
import { Prontuario } from './entities/Prontuario';
import { Endereco } from './entities/Endereco';
import { Pasciente } from './entities/Pasciente';
import { Cirurgico } from './entities/Cirurgico';
import { Usuario } from './entities/Usuario';
import { Equipe } from './entities/Equipe';
import { Procedimento } from './entities/Procedimento';
import { GrupoProcedimento } from "./entities/GrupoProcedimento";
import { Checklist } from "./entities/Checklist";
import { PascienteResolver } from "./resolvers/pasciente";
import { ProntuarioResolver } from "./resolvers/prontuario";
import { UsuarioResolver } from "./resolvers/usuario";
import { ChecklistResolver } from "./resolvers/checklist";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';

const main = async () => {
    const conn = await createConnection({
        type: 'postgres',
        database: 'projectthreeDB',
        username: 'postgres',
        password: '0123',
        logging: true,
        synchronize: true,
        entities: [Prontuario, Pasciente, Endereco, Cirurgico, Usuario, Equipe, Procedimento, GrupoProcedimento, Checklist]
    });
    const app = express();
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient(6379,'192.168.99.100');
    app.set('trust proxy', 1)
    app.use(
        session({
            name: "kai",
            store: new RedisStore({ client: redisClient, disableTouch: true }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax", // csrf
            },
            saveUninitialized: false,
            secret: "keyboard kai",
            resave: false,
        })
    );
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PascienteResolver, ProntuarioResolver, UsuarioResolver, ChecklistResolver],
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