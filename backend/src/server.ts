import Fastify, { FastifyListenOptions } from 'fastify'
import { dbConnector } from './db_connections'
import fastifyCookie, { FastifyCookieOptions } from 'fastify-cookie';
// import fastifyCors from 'fastify-cors'; // Importing directly
import cors from '@fastify/cors'

import { app } from "../src/api"
const fastify = require('fastify')();


// Import and register the fastify-cors-plus plugin
app.register(cors, {
  // CORS options
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
});





type User = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  image: string;
  user_id: number
}


app.register(dbConnector)
app.register(fastifyCookie);
declare module "fastify" {
  interface FastifyReply {
    cookie(
      name: string,
      value: string,
      options?: FastifyCookieOptions
    ): FastifyReply;
  }
}



const start = async () => {
  await app.ready();

  try {
    const PORT = process.env.port || process.env.PORT || 8000;
    const listenerOpts: FastifyListenOptions = {
      port: 8000,
      host: "localhost"
    };
    app.listen(listenerOpts, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(
        `\
        🚀🚀🚀🚀🚀🚀🚀 Server ready at: http://localhost:${process.env.PORT || PORT
        }/api 🔥🔥🔥🔥🔥🔥🔥`,
        listenerOpts
      );
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

(async () => {
  await start();
})();
