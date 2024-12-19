import { Router } from "express";
import { getPlacesWithMostCasualties } from "../controller/loction.controller";

const loctionRouter = Router()

loctionRouter.get("/top-location",getPlacesWithMostCasualties)

export default loctionRouter