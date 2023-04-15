import { Request, Response, NextFunction} from "express";
import { getTokenFrom } from "../utils/tokenUtilities";
import  jwt from "jsonwebtoken";


export const isLogged  = (req: Request, res:Response, next:NextFunction) => {
    try{

        const token = getTokenFrom(req)
        if (!token ) 
        return res.status(401).json({ error: 'token missing' })
        
        const decodedToken = jwt.verify(token, process.env.SECRET!)
        if (!decodedToken) {
            return res.status(401).json({ error: 'token invalid' })
        }
        res.locals.decodedToken = decodedToken; 
        return next();
    }catch(error){
        if (error instanceof Error) return res.status(500).send(error.message);
        return res.status(500).send("Unknown error Auth");
    }
}