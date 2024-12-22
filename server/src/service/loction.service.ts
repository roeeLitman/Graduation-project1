import LocationModel from "../models/Loction";
import OrganizationModel from "../models/organization";
import topOranizationDTO from "../types/dto/topOranizationDTO";


export const placesWithMostCasualties = async(city:string)=>{
    try {
        if(!!city){            
            const location =await LocationModel.find({})
            .sort({ casualties: -1 }) 
            .select('-listEvents')
            .select('-events') 
            .limit(10)
            .lean()
            return location
        }else{
            const location = await LocationModel.findOne({city:city})
            .sort({ casualties: -1 }) 
            .select('-listEvents') 
            .select('-events') 
            .limit(10)
            .lean()
            return location
        }
    } catch (err) {
        console.error("service Error get top loction", err);
        throw err;    
    }
}


// פונקציית עזר לארגונים ללא עיר
const getTopOrganizations = async () => {
    return OrganizationModel.aggregate([
        {
            $addFields: {
                eventsCount: { $size: "$listEvents" }, // ספירת האירועים
            },
        },
        { $sort: { eventsCount: -1 } }, // מיון לפי כמות אירועים
        { $limit: 5 }, // הגבלת התוצאה ל-5
        {
            $project: {
                name: 1,
                eventsCount: 1, // רק שדות נדרשים
            },
        },
    ]);
};


// פונקציית עזר לארגונים עם עיר
const getTopOrganizationsByCity = async (city: string) => {
    return LocationModel.aggregate([
        { $match: { city } }, 
        { $unwind: "$events" }, 
        {
            $group: {
                _id: "$events.organization",
                totalEvents: { $sum: "$events.amountEvents" }, 
            },
        },
        { $sort: { totalEvents: -1 } }, // מיון לפי כמות האירועים
        { $limit: 5 }, // הגבלת התוצאה ל-5
        {
            $project: {
                organization: "$_id",
                totalEvents: 1,
            },
        },
    ]);
};

// פונקציה ראשית
export const topOrganizationsFromDb = async (city: string) => {
    try {
        
        if (!city) {
            // אין עיר
            return await getTopOrganizations();
        }
        // יש עיר
        const location = await getTopOrganizationsByCity(city);

        if (location.length === 0) {
            return ["location not found"];
        }

        return location;
    } catch (error) {
        console.error("[service] Error in top organizations:", error);
        throw error; // ניהול שגיאות
    }
};


export const topLocationForOrgaization = async(organization:topOranizationDTO) => {
    try {
        const locations = await LocationModel.find({"events.organization": organization.organization})
        .sort({ casualties: -1 }) 
        .select('-listEvents')
        .select('-events')
        .limit(10)
        if(locations.length !== 0){
        return locations}
        throw new Error("Location not found")
    } catch (error) {
        console.error(" service Error top oranization location", error);
        throw error
    }
}



