import { FastifyRequest, RouteHandlerMethod, FastifyReply } from "fastify";
import crypto from "crypto"
import { AppDataSource } from "../db_connections";
import { validatePhoneNumber, validateEmail } from "../utils/user.utilts"
import { User } from "../entity/User";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
import { validatePassword, generateToken } from "../utils/user.utilts"


dotenv.config()
const userRepositry = AppDataSource.getRepository(User)
type UserType = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  image: string;
  user_id: number
}



type updatedBody = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  image: string;

}
type registerUser = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  image: string;
  salt: string;
  hash: string;
  password: string;

}
type getOneUsers = {
  email: string
}
type loginUser = {
  email: string;
  password: string;

}

const createUserHandler: RouteHandlerMethod = async function (req: FastifyRequest<{ Body: registerUser }>, reply: FastifyReply) {
  const { first_name,
    last_name,
    email,
    phone_number,
    image,
    password,
  } = req.body
  const salt = crypto.randomBytes(8).toString("hex");//random
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 512, "sha512")
    .toString("hex");// 
  if (!validateEmail(email)) {
    return reply.code(400).send({ message: "invalid email please write correct email" })
  }




  const data = {
    first_name,
    last_name,
    email,
    phone_number,
    image,
    salt,
    hash
  }
  const user = await userRepositry.create({ ...data }) // this method didn't insert into
  try {
    const userRes = await userRepositry.createQueryBuilder("user").insert().values([{ ...user }]).execute()
    const token = generateToken(user.email, userRes.raw[0].user_id)
    reply.cookie('token', token)
    req.user = user;

    return reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        User: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone_number: user.phone_number,
          token: token,
          image: user.image,
          user_id: userRes.raw[0].user_id
        }
      })
  } catch (erorr) {

    console.log(erorr, "erorrerorrerorr")
    return reply.code(409).send({ message: erorr.detail })

  }
}
const getRegisterssHandler: RouteHandlerMethod = async function (req: FastifyRequest<{}>, reply: FastifyReply) {
  const users: User[] = await userRepositry.createQueryBuilder("user").getMany()

  return reply.code(200).header("Content-Type", "application/json; charset=utf-8").send(
    users.map((a: User) => {
      return {
        first_name: a.first_name,
        last_name: a.last_name,
        email: a.email,
        phone_number: a.phone_number,
        image: a.image,
        user_id: a.user_id,


      }
    })
  )


}
const getOneUser: RouteHandlerMethod = async function (req: FastifyRequest<{ Querystring: getOneUsers }>, reply: FastifyReply) {
  const user = await userRepositry.createQueryBuilder("user").where("email = :email", { email: req.query.email }).getOne();
  return reply.code(200).send(user)
}
const loginHandler: RouteHandlerMethod = async function (req: FastifyRequest<{ Body: loginUser }>,
  reply: FastifyReply) {
  const { email, password } = req.body
  const user = await userRepositry.createQueryBuilder("user")
    .where('user.email = :email', { email: email })
    .getOne();


  if (!user) {
    return reply
      .code(401)
      .header("Content_Type", "application/json; charset=utf-8")
      .send({
        message: "UnAuthorized Login",
      });
  }
  const isPswrdValid: boolean = validatePassword(user, password);
  const token = generateToken(user.email, user.user_id);
  reply.cookie('token', token)

  if (!isPswrdValid) {
    return reply
      .code(401)
      .header("Content_Type", "application/json; charset=utf-8")
      .send({
        message: " not isPswrdValid",
      });
  } else {
    return reply
      .code(200)
      .header("Content_Type", "application/json; charset=utf-8")
      .send({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        image: user.image,
        token: token,
      });
  }

}


const updateInfoHandler: RouteHandlerMethod = async function (req: FastifyRequest<{ Body: updatedBody }>, reply: FastifyReply) {
  const {

    first_name,
    last_name,
    email,
    phone_number,
    image
  } = req.body

  const user = await userRepositry.create({
    first_name,
    last_name,
    email,
    phone_number,
    image,
    createdAt: new Date(),
    updatedAt: new Date()
  });



  const data = await userRepositry

    .createQueryBuilder("user")
    .update()
    .set({
      ...user,
    })
    .where("email = :email", { email })
    .returning([
      "first_name",
      "last_name",
      "email",
      "phone_number",
      "image"])
    .execute();

  return reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      first_name,
      last_name,
      email,
      phone_number,
      image
    });


}
export { createUserHandler, getRegisterssHandler, getOneUser, loginHandler, updateInfoHandler }


