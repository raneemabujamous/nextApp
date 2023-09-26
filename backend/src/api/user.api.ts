import fastify, { FastifyInstance } from "fastify";
import { createUserSchema, getAllUserScheme, userUpdSchema, getOneUserSchema, loginUserSchema } from '../schema/user.schema'
import { createUserHandler, updateInfoHandler, getRegisterssHandler, getOneUser, loginHandler } from '../handler/User.handler'
import { checkAuthentication, checkAuthorization } from "../utils/user.utilts";

declare module 'fastify' {
  interface FastifyRequest {
    allowUser: string[];
  }
}

export default (fastify: FastifyInstance, option, done) => {
  fastify.post<{
    Body: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      image: string
    };
  }>("/signup", {
    schema: createUserSchema,// schema how
    handler: createUserHandler,
  });
  fastify.post<{
    Body: {
      email: string;
      password: string
    }
  }>("/login", {
    schema: loginUserSchema,
    handler: loginHandler
  })
  fastify.get<{}>("/registers", {
    preValidation: 
      checkAuthentication,
 
    schema: getAllUserScheme,
    handler: getRegisterssHandler
  })
  fastify.get<{}>("/user", {
    preValidation: checkAuthentication,
    schema: getOneUserSchema,
    handler: getOneUser
  })

  fastify.patch<{
    Body: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
      image: string
    }
  }>("/user", {
    preValidation: checkAuthentication,
    schema: userUpdSchema,
    handler: updateInfoHandler

  })

  done()

}

