import LocationModel from "../models/Loction";


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







