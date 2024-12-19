import YearModel from "../models/Year";
import {IFindByTaimeDto} from "../types/dto/FindByTaimeDto";


export const getYearService = async ({firstYear,lastYear,decade,fiveYea}:IFindByTaimeDto) => {
    const beforeDecade = new Date().getFullYear() - 11;
    const beforeFiveYea = new Date().getFullYear() - 6;
    try {
        if(firstYear && lastYear){
            return await YearModel.find({year:{$gte:firstYear,$lte:lastYear}});
        }
        //לא יהיה בשימוש מכיוון שהנתונים יגיעו רק בתווך 
        if(decade){
            return await YearModel.find({year:{$gte:beforeDecade}});
        }
        //לא יהיה בשימוש מכיוון שהנתונים יגיעו רק בטווך 
        if(fiveYea){
            return await YearModel.find({year:{$gte:beforeFiveYea}});
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

