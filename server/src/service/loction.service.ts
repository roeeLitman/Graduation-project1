import LocationModel from "../models/Loction";
import OrganizationModel from "../models/organization";
import { NewEvent } from "../types/dto/NewEventDTO";
import topOranizationDTO from "../types/dto/topOranizationDTO";

export const placesWithMostCasualties = async (city: string | undefined) => {
    try {
        if (!city) {
            const location = await LocationModel.find({})
                .sort({ casualties: -1 })
                .select("-listEvents")
                .select("-events")
                .limit(10)
                .lean();
            return location;
        } else {
            const location = await LocationModel.findOne({ city: city })
                .sort({ casualties: -1 })
                .select("-listEvents")
                .select("-events")
                .limit(10)
                .lean();
            return location;
        }
    } catch (err) {
        console.error("service Error get top loction", err);
        throw err;
    }
};

// פונקציית עזר לארגונים ללא עיר
const getTopOrganizations = async () => {
    const organizations = await OrganizationModel.aggregate([
        {
            $addFields: {
                eventsCount: { $size: "$listEvents" },
            },
        },
        {
            $sort: { eventsCount: -1 },
        },
        {
            $limit: 5,
        },
        {
            $project: {
                name: 1,
                eventsCount: 1,
                lat: 1,
                long: 1,
                casualties: 1,
            },
        },
    ]);
    return organizations;
};

// פונקציית עזר לארגונים עם עיר
const getTopOrganizationsByCity = async (city: string) => {
    console.log(city);

    const location = await LocationModel.aggregate([
        { $match: { city: city } },
        { $unwind: "$events" },
        {
            $group: {
                _id: "$events.organization",
                totalEvents: { $sum: "$events.amountEvents" },
                lat: { $first: "$lat" },
                long: { $first: "$long" },
            },
        },
        {
            $sort: { totalEvents: -1 },
        },
        {
            $limit: 5,
        },
        {
            $project: {
                organization: "$_id",
                totalEvents: 1,
                lat: 1,
                long: 1,
                city: 1,
            },
        },
    ]);
    return location;
};

// מחזיר או את 5 האירגונים המובילים או את חמשת האירגונים המובילים בעיר
export const topOrganizationsFromDb = async (city: string) => {
    try {
        if (!city) {
            return await getTopOrganizations();
        }

        const location = await getTopOrganizationsByCity(city);

        if (location.length === 0) {
            return ["location not found"];
        }

        return location;
    } catch (error) {
        console.error("[service] Error in top organizations:", error);
        throw error;
    }
};

export const topLocationForOrgaization = async (
    organization: topOranizationDTO
) => {
    try {
        const locations = await LocationModel.find({
            "events.organization": organization.organization,
        })
            .sort({ casualties: -1 })
            .select("-listEvents")
            .select("-events")
            .limit(10);
        if (locations.length !== 0) {
            return locations;
        }
        throw new Error("Location not found");
    } catch (error) {
        console.error(" service Error top oranization location", error);
        throw error;
    }
};

export const cerwteNewLocation = async (event: NewEvent) => {
    try {
        // find if loction exist
        const loctionFromDb = await LocationModel.findOne({ city: event.city });
        if (loctionFromDb) {
            loctionFromDb.casualties =
            loctionFromDb.casualties + event.casualties;
            loctionFromDb.listEvents.push(event._id!);

            //find if organization exist
            const organizationFromDb = loctionFromDb.events.find(
                (e) => e.organization === event.organization
            );
            if (!organizationFromDb) {
                loctionFromDb.events.push({
                    organization: event.organization,
                    amountEvents: 1,
                });
            } else {
                loctionFromDb.events.find(
                    (e) => e.organization === event.organization
                )!.amountEvents += 1;
            }
            await loctionFromDb.save();
            return loctionFromDb;
        } else {
            const newLoction = new LocationModel({
                city: event.city,
                casualties: event.casualties,
                lat: event.lat,
                long: event.long,
                events: [{ organization: event.organization, amountEvents: 1 }],
                listEvents: [event._id],
            });
            newLoction.save();
            return newLoction;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
};
