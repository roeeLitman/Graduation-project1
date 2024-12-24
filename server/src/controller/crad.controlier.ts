import { Request, Response } from "express"
import { getAll } from "../service/crad.service"


export const getAllEvents = async(req:Request<any,any,{page:number}>,res:Response) => {
    try {
        const all = await getAll(req.params.page)
        res.status(200).json(all)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}

