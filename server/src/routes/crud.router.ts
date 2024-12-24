import { Router } from "express";
import { getAllEvents } from "../controller/crad.controlier";

const cradRuter = Router()

cradRuter.get("/get-hundred/:page",getAllEvents)

cradRuter.post("/create-event",getAllEvents)


export default cradRuter