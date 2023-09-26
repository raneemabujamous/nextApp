import Fastify from "fastify";
import UserAPI from './user.api'

export const app = Fastify({ logger: true });

app.register(UserAPI, { prefix: "/api" }); //to rigester the api

