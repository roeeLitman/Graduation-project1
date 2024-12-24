import { Request, Response } from "express"
import { getAll, createInformtionInAllColctions } from "../service/crad.service"
import { NewEvent } from "../types/dto/NewEventDTO"


export const getAllEvents = async(req:Request<any,any,{page:number}>,res:Response) => {
    try {
        const all = await getAll(req.params.page)
        res.status(200).json(all)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}

export const createNewEvent = async(req:Request<any,any,any, NewEvent>,res:Response) => {
    try {
        const all = await createInformtionInAllColctions(req.body)
        res.status(200).json(all)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}

