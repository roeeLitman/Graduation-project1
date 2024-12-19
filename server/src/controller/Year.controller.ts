import { Request, Response } from "express"
import { getAllOrganizationByYearOrGetOrganizationAndEvent, getYearService } from "../service/year.service"
import { IFindByTaimeDto } from "../types/dto/FindByTaimeDto"

export const getObjOfYearAndAttacks = async(req:Request<any,any,IFindByTaimeDto>,res:Response)=>{
    try {
        const yearFromDb = await getYearService(req.params)
        res.status(200).json(yearFromDb)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}