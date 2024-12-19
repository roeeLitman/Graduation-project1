import { Request, Response } from "express"
import { listAttackSorted} from "../service/typeAttack.service"

export const getAllAttackSorte = async(req:Request,res:Response)=>{
    try {
        const listAttackSortedFromDb = await listAttackSorted()
        res.status(200).json(listAttackSortedFromDb)
    } catch (err) {
        res.status(400).json((err as Error).message)  
    }
}