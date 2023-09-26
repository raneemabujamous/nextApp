import { FastifyRequest, FastifyReply, HookHandlerDoneFunction, preHandlerHookHandler } from "fastify";
import jwt, { JwtPayload } from "jsonwebtoken"
import * as dotenv from "dotenv"
import crypto from "crypto";
import { User } from "../entity/User";

import { AppDataSource } from "../db_connections";
const userRepositry = AppDataSource.getRepository(User)

dotenv.config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}


const validateEmail = function (email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email)
}
const validatePhoneNumber = function (phone_number: string): boolean {
  const phoneRegex = /^\+\d{1,3}\s\d{9,}$/;
  return phoneRegex.test(phone_number)
}
const checkAuthentication: preHandlerHookHandler = async (
  req: FastifyRequest<{ Body: any; Querystring: any }>,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  const isSuccessfullyAuth = await verifyToken(req)
  if (typeof isSuccessfullyAuth == 'string') {
    return reply.code(401).send({ message: isSuccessfullyAuth });

  }


  if (!isSuccessfullyAuth) {
    return reply.code(401).send({ message: "invaled token" });
  }


  done();



}


const checkAuthorization: preHandlerHookHandler = async (
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  const allowedRoles: string[] = req.allowUser; // Get the allowed roles from the request context or any other source
  const isSuccessfullyAuth = await verfiyAuthorization(req)
  if (typeof isSuccessfullyAuth == 'string') {
    return reply.code(401).send({ message: isSuccessfullyAuth });

  }
  console.log(allowedRoles, "allowedRolesallowedRoles")
  if (!isSuccessfullyAuth) {
    return reply.code(401).send({ message: "invalid role" });
  }
}
const verfiyAuthorization = async (req, allowedRoles) => {
  const authorization = req.header
  const cookieToken = req.cookies.token

  console.log("cookieToken", cookieToken, "authorization",)
  let token = ""
  if (cookieToken) {
    token = cookieToken;
  } else if (authorization?.split(" ")[1]) {
    token = authorization?.split(" ")[1] || "";
  } else {
    return "Missing authentication token"
  }

  if (token.length < 0) {
    return false
  }
  const { email, user_id } = await jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload

  if (user_id) {
    const user = await userRepositry.createQueryBuilder("user").leftJoinAndSelect('user.role', 'role').where({ user_id: user_id })
      .getOne();
    console.log(user, "useruser", allowedRoles, "allowedRolesallowedRoles")
    return allowedRoles.includes(user.role.role)

  }
}
const verifyToken = async (req) => {
  try {
    const authorization = req.header
    const cookieToken = req.cookies.token

    let token = ""

    if (cookieToken) {
      token = cookieToken;
    } else if (authorization?.split(" ")[1]) {
      token = authorization?.split(" ")[1] || "";
    } else {
      return "Missing authentication token"
    }

    const { email, user_id } = await jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;

    if (req.query.email || req.query.user_id || req.body.user_id) {
      const success: boolean =
        email == req.query.email

      return success ? success : `the token not to same user eamil token is ${email}`
    } else {
      const success: boolean = email && user_id


      return success
    }


  } catch (e) {
    return e
  }
}
const generateToken = function (email: string, user_id: number): string {
  const token = jwt.sign(
    {
      email,
      user_id,
    },
    ACCESS_TOKEN_SECRET
  );
  return token;
};
const validatePassword = function (user, password) {

  const hash = crypto
    .pbkdf2Sync(password, user.salt, 1000, 512, "sha512")
    .toString("hex");

  return user.hash == hash; ///برجع بعمل للباسورد الي حطها كمان مره هاش بنفس ال سالت وبرجع بقارنها كمان مره بالهاش الي مخزنه عندي

}
// 
const getUserIdFromToken = async (req) => {


  const authorization = req.header
  const cookieToken = req.cookies.token

  let token = ""

  if (cookieToken) {
    token = cookieToken;
  } else if (authorization?.split(" ")[1]) {
    token = authorization?.split(" ")[1] || "";
  } else {
    return "Missing authentication token"
  }

  const { email, user_id } = await jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;

  return user_id


}
export {
  validateEmail, getUserIdFromToken,
  checkAuthorization,
  validatePhoneNumber,
  checkAuthentication,
  validatePassword,
  generateToken
}