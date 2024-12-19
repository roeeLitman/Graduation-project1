import { Request, Response } from "express"
import { placesWithMostCasualties, topOrganizationsFromDb } from "../service/loction.service"
import { ICityDto } from "../types/dto/ICityDto"

export const getPlacesWithMostCasualties = async(req:Request<any,any,any,string>,res:Response)=>{
    try {
        const topPlace = await placesWithMostCasualties(req.query)
        res.status(200).json(topPlace)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}


export const getTopOrganizations = async(req:Request<any, any, any, ICityDto>,res:Response)=>{
    try {
        const oranization = await topOrganizationsFromDb(req.query.city)
        res.status(200).json(oranization)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}
