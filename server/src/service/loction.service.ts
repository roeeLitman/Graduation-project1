import loctionModel from '../models/Loction'
import mainListMOdel from '../models/mainList'


export const seedLOction = async () => {
    try {
        //get all events
        const events = await mainListMOdel.find({});

        for (const event of events) {
            // find if loction exist
            
            const loctionFromDb = await loctionModel.findOne({city : event.city})
            if(loctionFromDb){
                loctionFromDb.casualties = loctionFromDb.casualties + event.casualties
                loctionFromDb.listEvents.push(event._id)

                //find if organization exist
                const organizationFromDb = loctionFromDb.events.find(e => e.organization === event.organization)
                if(!organizationFromDb){
                    loctionFromDb.events.push({organization:event.organization, amountEvents: 1})
                }else{
                    loctionFromDb.events.find(e => e.organization === event.organization)!.amountEvents += 1
                }
                await loctionFromDb.save()
                console.log("Main list Saved successfully")
            }else{
            const newLoction = new loctionModel({
                city: event.city,
                casualties: event.casualties,
                lat: event.lat,
                long: event.long,
                events: [{organization: event.organization, amountEvents: 1}],
                listEvents: [event._id]
            })
            newLoction.save()
            console.log("Main list Saved successfully")
            }
        }
    } catch (err) {
        console.log(err);
        
    }
} 
