import MainListModel from "../models/mainList";
import OrganizationModel from "../models/organization";

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