import loctionModel from '../models/Loction'
import mainListMOdel from '../models/mainList'


export const seedLOction = async () => {
    try {
        //get all events
        const events = await mainListMOdel.find({}).lean()

        for (const event of events) {
            // find if loction exist
            const loctionFromDb = await loctionModel.findOne({city : event.city})
            if(loctionFromDb){
                loctionFromDb.casualties = loctionFromDb.casualties + event.casualties

                //find if organization exist
                const organizationFromDb = loctionFromDb.events.find(e => e.organization === event.organization)
                if(!organizationFromDb){
                    loctionFromDb.events.push({organization:event.organization, amountEvents: 1})
                }else{
                    loctionFromDb.events.find(e => e.organization === event.organization)!.amountEvents += 1
                }
                loctionFromDb.listEvents.push(event._id)
                await loctionFromDb.save()
            }
            
        }
    } catch (err) {
        
    }
} 
