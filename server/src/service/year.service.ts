import YearModel from "../models/Year";
import { IFindByTaimeDto } from "../types/dto/FindByTaimeDto";
import { NewEvent } from "../types/dto/NewEventDTO";
import yearsOranizationDTO from "../types/dto/yearsOranizationDTO";

export const getYearService = async ({
    firstyear,
    lastyear,
    decade,
    fiveyear,
}: IFindByTaimeDto) => {
    const beforeDecade = new Date().getFullYear() - 10;
    const beforeFiveYea = new Date().getFullYear() - 5;

    try {
        if (!firstyear && !lastyear && !decade && !fiveyear) {
            throw new Error("No data");
        }
        if (firstyear && lastyear) {
            return await YearModel.find({
                year: { $gte: firstyear, $lte: lastyear },
            })
                .select("-listOrganization")
                .select("-listEvents");
        }
        if (firstyear) {
            return await YearModel.find({ year: firstyear })
                .select("-listOrganization")
                .select("-listEvents");
        }
        if (decade) {
            return await YearModel.find({ year: { $gte: beforeDecade } })
                .select("-listOrganization")
                .select("-listEvents");
        }
        if (fiveyear) {
            return await YearModel.find({ year: { $gte: beforeFiveYea } })
                .select("-listOrganization")
                .select("-listEvents");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const YearsOrganization = async (req: yearsOranizationDTO) => {
    const isNUmber = !isNaN(parseInt(req.req));
    try {
        if (isNUmber) {
            const yearFromClient = parseInt(req.req);
            const result = await YearModel.aggregate([
                { $match: { year: yearFromClient } },
                { $unwind: "$listOrganization" },
                {
                    $group: {
                        _id: {
                            organization: "$listOrganization.organization",
                            year: "$year",
                        },
                        totalEvents: { $sum: "$listOrganization.amount" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        organization: "$_id.organization",
                        year: "$_id.year",
                        totalEvents: 1,
                    },
                },
                { $sort: { totalEvents: -1 } },
            ]);

            return result;
        } else if (typeof req.req === "string") {
            const result = await YearModel.aggregate([
                { $unwind: "$listOrganization" },
                { $match: { "listOrganization.organization": req.req } },
                {
                    $group: {
                        _id: {
                            year: "$year",
                            organization: "$listOrganization.organization",
                        },
                        totalIncidents: { $sum: "$listOrganization.amount" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        year: "$_id.year",
                        organization: "$_id.organization",
                        totalIncidents: 1,
                    },
                },
                { $sort: { year: 1 } },
            ]);
            return result;
        } else {
            throw new Error(
                "Invalid input type. Must be a number (year) or string (organization)."
            );
        }
    } catch (error) {
        console.error("Error :", error);
        throw error;
    }
};

export const CreateNewYear = async (event: NewEvent) => {
    try {
        const yearData = await YearModel.findOne({ year: event.year });
        if (!yearData) {
            const newYear = new YearModel({
                year: event.year,
                listAmontType: [{ typeAttack: event.attacktype, ampount: 1 }],
                listOrganization: [
                    { organization: event.organization, amount: 1 },
                ],
                listEvents: [event._id],
            });
            await newYear.save();
            return newYear;
        } else {
            await yearData.updateOne({
                $push: { listEvents: event._id },
            });

            const typeFromDb = yearData.listAmontType.find(
                (e) => e.typeAttack === event.attacktype
            );
            if (!typeFromDb) {
                yearData.listAmontType.push({
                    typeAttack: event.attacktype,
                    ampount: 1,
                });
            } else {
                typeFromDb.ampount += 1;
            }
            const orgFromDb = yearData.listOrganization.find(
                (e) => e.organization === event.organization
            );
            if (!orgFromDb) {
                yearData.listOrganization.push({
                    organization: event.organization,
                    amount: 1,
                });
            } else {
                orgFromDb.amount += 1;
            }
            await yearData.save();
            return yearData;
        }
    } catch (err) {
        console.log("Error in seeding year:", err);
        throw err;
    }
};
