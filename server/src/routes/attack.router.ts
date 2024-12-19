import { Router } from "express";
import { getAllAttackSorte } from "../controller/typeAttack.controller";

const attackRouter = Router()

attackRouter.get("/get-rating", getAllAttackSorte)



export default attackRouter