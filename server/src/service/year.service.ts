import YearModel from "../models/Year";
import {IFindByTaimeDto} from "../types/dto/FindByTaimeDto";


export const getYearService = async ({firstyear,lastyear,decade,fiveyea}:IFindByTaimeDto) => {
    const beforeDecade = new Date().getFullYear() - 10;
    const beforeFiveYea = new Date().getFullYear() - 5;
    
    try {
        if(!firstyear && !lastyear && !decade && !fiveyea){
            throw new Error("No data");
        }
        if(firstyear && lastyear){
            return await YearModel.find({year:{$gte:firstyear,$lte:lastyear}});
        }
        if(firstyear){
            return await YearModel.find({year:firstyear});
        }
        if(decade){
            return await YearModel.find({year:{$gte:beforeDecade}});
        }
        if(fiveyea){
            return await YearModel.find({year:{$gte:beforeFiveYea}});
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getAllOrganizationByYearOrGetOrganizationAndEvent  = async (data: string ) => {
    const isNum: boolean = !isNaN(parseInt(data));
    try {
        if(isNum){
            const year = parseInt(data);
            const yearData = await YearModel.findOne({year:year});
            if(!yearData){
                throw new Error("No data");
            }
            return yearData.listOrganization.sort((a,b) => b.amount - a.amount)
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

