import { Router } from "express";
import { getObjOfYearAndAttacks, getYearsOrganization } from "../controller/Year.controller";

const yearRouter = Router()

yearRouter.get("/incident-trends", getObjOfYearAndAttacks) 

 //(5) אם יקבל שנה יחזיר יציג את הארגונים לפי מספר הארגונים, ואם יקבל ארגון יציג את התקריות לפי שנים
 yearRouter.get("/year-oranization", getYearsOrganization)

export default yearRouter