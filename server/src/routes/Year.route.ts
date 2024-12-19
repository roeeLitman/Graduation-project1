import { Router } from "express";
import { getObjOfYearAndAttacks } from "../controller/Year.controller";

const yearRouter = Router()

yearRouter.get("/incident-trends", getObjOfYearAndAttacks) 
yearRouter.get("/groups-by-year", ()=>{})


export default yearRouter