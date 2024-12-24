import { Router } from "express";
import { getAllEvents } from "../controllers/crudController";

const cradRuter = Router()

cradRuter.get("/get-all",getAllEvents)


export default cradRuter