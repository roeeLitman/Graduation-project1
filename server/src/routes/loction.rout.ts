import { Router } from "express";
import { getPlacesWithMostCasualties, gettopLocationForOrgaization, getTopOrganizations } from "../controller/loction.controller";

const loctionRouter = Router()

loctionRouter.get("/top-location", getPlacesWithMostCasualties)

loctionRouter.get("/top-organization", getTopOrganizations)

loctionRouter.get("/top-location-for-organization", gettopLocationForOrgaization)

export default loctionRouter