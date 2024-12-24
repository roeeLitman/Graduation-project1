import MainListModel from "../models/mainList";
import OrganizationModel from "../models/organization";
import { NewEvent } from "../types/dto/NewEventDTO";
import { cerwteNewLocation } from "./loction.service";
import { createNewEvent } from "./mainList.service";
import { CreateNewOrganization } from "./organizations.service";
import { createNewAttack } from "./typeAttack.service";
import { CreateNewYear } from "./year.service";

export const getAll = async(page:number)=>{
    try {
        const limit = 100; 
        const skip = (page - 1) * limit; 
        const all = await MainListModel.find({})
        .skip(skip)
        .limit(100)
        .select('-listEvents');
        return all
    } catch (err) {
        console.log(`cant' get all: ${err}`);    
    }
}


export const createInformtionInAllColctions = async (event: NewEvent): Promise<NewEvent> => {
    try {
        const newEvent: NewEvent = await createNewEvent(event)
        await cerwteNewLocation(newEvent)
        await createNewAttack(newEvent)
        await CreateNewOrganization(newEvent)
        await CreateNewYear(newEvent)
        return newEvent
    } catch (err) {
        console.log(err);
        throw err
        
    }

    
}
