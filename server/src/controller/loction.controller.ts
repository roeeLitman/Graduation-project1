import { Request, Response } from "express"
import { placesWithMostCasualties, topLocationForOrgaization, topOrganizationsFromDb } from "../service/loction.service"
import { ICityDto } from "../types/dto/ICityDto"
import topOranizationDTO from "../types/dto/topOranizationDTO"

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

//(6) יקבל שם של ארגון ויחזיר אפה היה לאותו ארגון התקפות עם הכי הרבה נפגעים
export const gettopLocationForOrgaization= async(req:Request<any,any,any,topOranizationDTO>,res:Response)=>{
    try {
        const location = await topLocationForOrgaization(req.query)
        res.status(200).json(location)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}
