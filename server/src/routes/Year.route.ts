import { Router } from "express";
import { getObjOfYearAndAttacks, getYearsOrganization } from "../controller/Year.controller";

const yearRouter = Router()

yearRouter.get("/incident-trends", getObjOfYearAndAttacks) 

 //5
 yearRouter.get("/year-oranization", getYearsOrganization)

export default yearRouter