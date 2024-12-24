import organization from "../models/organization";
import { NewEvent } from "../types/dto/NewEventDTO";

export const CreateNewOrganization = async (event: NewEvent) => {
    try {
        const organizationFromDb = await organization.findOne({
            name: event.organization,
        });
        if (!organizationFromDb) {
            const newOrganization = new organization({
                name: event.organization,
                casualties: event.casualties,
                listEvents: [event._id],
                lat: event.lat,
                long: event.long,
            });
            await newOrganization.save();
            return newOrganization;
        } else {
            await organizationFromDb.updateOne({
                $push: { listEvents: event._id },
                $inc: { casualties: event.casualties },
                $set: { lat: event.lat, long: event.long },
            });
            return organizationFromDb;
        }
    } catch (err) {
        console.log("Error organization", err);
        throw err;
    }
};
