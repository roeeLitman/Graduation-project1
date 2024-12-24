import { Router } from "express";
import { createNewEvent, getAllEvents } from "../controller/crad.controlier";

const cradRuter = Router()

cradRuter.get("/get-hundred/:page",getAllEvents)

cradRuter.post("/create-event", createNewEvent)


export default cradRuter