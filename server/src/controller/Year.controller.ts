import { Request, Response } from "express"
import {  getYearService, YearsOrganization } from "../service/year.service"
import { IFindByTaimeDto } from "../types/dto/FindByTaimeDto"

export const getObjOfYearAndAttacks = async(req:Request<any,any,any, IFindByTaimeDto>,res:Response)=>{
    try {
        
        const yearFromDb = await getYearService(req.query)
        res.status(200).json(yearFromDb)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}

//(5) אם יקבל שנה יחזיר יציג את הארגונים לפי מספר הארגונים, ואם יקבל ארגון יציג את התקריות לפי שנים
export const getYearsOrganization = async(req:Request<any,any,any,any>,res:Response)=>{
    try {
        const yearsOranization = await YearsOrganization(req.query)
        res.status(200).json(yearsOranization)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}