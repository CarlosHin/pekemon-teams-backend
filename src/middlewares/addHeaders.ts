import { Request, Response, NextFunction} from "express";
import { getTokenFrom } from "../utils/tokenUtilities";
import  jwt from "jsonwebtoken";


export const addHeaders  = (req: Request, res:Response, next:NextFunction) => {
    try{
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
          "Access-Control-Allow-Methods",
          "OPTIONS, GET, POST, PUT, PATCH, DELETE"
        );
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        if (req.method === "OPTIONS") {
            return res.status(200).end();
        }
        next();
    }catch(error){
        if (error instanceof Error) return res.status(500).send(error.message);
        return res.status(500).send("Unknown error Auth");
    }
};