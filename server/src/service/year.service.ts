import YearModel from "../models/Year";
import {IFindByTaimeDto} from "../types/dto/FindByTaimeDto";
import yearsOranizationDTO from "../types/dto/yearsOranizationDTO";


export const getYearService = async ({firstyear,lastyear,decade, fiveyear}:IFindByTaimeDto) => {
    const beforeDecade = new Date().getFullYear() - 10;
    const beforeFiveYea = new Date().getFullYear() - 5;
    
    try {
        if(!firstyear && !lastyear && !decade && !fiveyear){
            throw new Error("No data");
        }
        if(firstyear && lastyear){
            return await YearModel.find({year:{$gte:firstyear,$lte:lastyear}})
            .select('-listOrganization')
            .select('-listEvents');
        }
        if(firstyear){
            return await YearModel.find({year:firstyear})
            .select('-listOrganization')
            .select('-listEvents');

        }
        if(decade){
            return await YearModel.find({year:{$gte:beforeDecade}})
            .select('-listOrganization')
            .select('-listEvents');

        }
        if(fiveyear){
            return await YearModel.find({year:{$gte:beforeFiveYea}})
            .select('-listOrganization')
            .select('-listEvents');

        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

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
                        _id: { organization: "$listOrganization.organization", year: "$year" },
                        totalEvents: { $sum: "$listOrganization.amount" }
                    }
                },
                { 
                    $project: {
                        _id: 0,
                        organization: "$_id.organization",
                        year: "$_id.year",
                        totalEvents: 1
                    }
                },
                { $sort: { totalEvents: -1 } }
            ]);

            return result;
        } else if (typeof req.req === "string") {
            const result = await YearModel.aggregate([
                { $unwind: "$listOrganization" },
                { $match: { "listOrganization.organization": req.req } },
                { 
                    $group: { 
                        _id: { year: "$year", organization: "$listOrganization.organization" },
                        totalIncidents: { $sum: "$listOrganization.amount" }
                    }
                },
                { 
                    $project: {
                        _id: 0,
                        year: "$_id.year",
                        organization: "$_id.organization",
                        totalIncidents: 1
                    }
                },
                { $sort: { year: 1 } }
            ]);
            return result;
        } else {
            throw new Error("Invalid input type. Must be a number (year) or string (organization).");
        }
    } catch (error) {
        console.error("Error :", error);
        throw error;
    }
}

