import fs from "fs";
import mainListMOdel from "../models/mainList";
import { NewEvent } from "../types/dto/NewEventDTO";

export const createNewEvent = async (event: NewEvent): Promise<NewEvent> => {
    try {
        if (
            !event.year ||
            !event.month ||
            !event.city ||
            !event.lat ||
            !event.long ||
            !event.attacktype ||
            !event.organization ||
            !event.casualties 
        ) {
            console.log("Worg");
            throw new Error("something went short");
        }
        const newMainList = new mainListMOdel({...event});
        await newMainList.save();
        return {
            _id: newMainList._id,
            year: newMainList.year,
            month: newMainList.month,
            city: newMainList.city,
            lat: newMainList.lat,
            long: newMainList.long,
            attacktype: newMainList.attacktype,
            organization: newMainList.organization,
            casualties: newMainList.casualties
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
};
