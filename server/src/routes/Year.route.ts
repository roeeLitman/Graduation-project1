import { Router } from "express";
import { getRatingTypesAttacks } from "../controllers/Year.controller";

const yearRouter = Router()

yearRouter.get("/incident-trends",getRatingTypesAttacks)
yearRouter.get("/groups-by-year",getRatingTypesAttacks)


export default yearRouter