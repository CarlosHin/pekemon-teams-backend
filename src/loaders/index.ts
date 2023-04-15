import * as express from "express";
import expressLoader from "./express";
import mongoLoader from "./mongo"
export default async ({ expressApp }: { expressApp: express.Application }) => {


  await mongoLoader();
  await expressLoader({ app: expressApp });
  console.log("Express Initialized");
};
