import "reflect-metadata";
// import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
// import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/posts";
import { UserResolver } from "./resolvers/User";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import cors from "cors";
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import path from "path";
import { Like } from "./entities/Like";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "lireddit",
    username: "admin",
    password: "",
    logging: true,
    synchronize: true,
    // migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Post, User, Like],
  });
  // await conn.runMigrations();
  // await Post.delete({});

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax", //  csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "f412FE23shf982hqf78",
      resave: false,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redisClient }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
