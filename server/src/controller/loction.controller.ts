import { Request, Response } from "express"
import { placesWithMostCasualties } from "../service/loction.service"

export const getPlacesWithMostCasualties = async(req:Request<any,any,any,string>,res:Response)=>{
    try {
        console.log(req.query);
        const topPlace = await placesWithMostCasualties(req.query)
        res.status(200).json(topPlace)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}