import { Router } from "express";
import { getPlacesWithMostCasualties, getTopOrganizations } from "../controller/loction.controller";

const loctionRouter = Router()

loctionRouter.get("/top-location",getPlacesWithMostCasualties)

loctionRouter.get("/top-organization",getTopOrganizations)

export default loctionRouter