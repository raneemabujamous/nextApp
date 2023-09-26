import { FastifyInstance } from "fastify";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User"
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  ssl: false,
  username: "postgres",
  password: "MYDKHDR@2018",
  database: "postgres",
  logging: true,
  entities: [User],
  synchronize: true,
});

export async function dbConnector(fastify: FastifyInstance) {
  try {
    await AppDataSource.initialize()
      .then(async () => {
        console.log("DB conn success");
      })
      .catch((error) => console.log(error));

  } catch (e) {
    console.error(`Something went dreadfully wrong: ${e}`);
  }
}
