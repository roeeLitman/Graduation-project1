import loctionModel from '../models/Loction'
import mainListMOdel from '../models/mainList'
import AttackModel from '../models/TypesAttack'
import Organization from '../models/organization'




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

export const seedAttack = async () => {
    try {
        let number = 0;
        const data = await mainListMOdel.find({}).lean();
        for (const event of data) {
            const attackModel = await mainListMOdel.findOne({ name: event.attacktype });

            if (!attackModel) {
                const newTypesAttack = new AttackModel({
                    name: event.attacktype,
                    casualties: event.casualties,
                    listEvents: [event._id] 
                });
                await newTypesAttack.save(); 
                number++; 
                console.log(`Saved new attack type`);
            } else {
                await attackModel.updateOne({
                    $push: { listEvents: event._id }, 
                    $inc: { casualties: event.casualties } 
                });
                console.log(`Updated existing attack type`);
            }
        }
        console.log(`new attack types saved successfully`);
    } catch (err) {
        console.error('Error attack types:',  err);
        throw err;
    }
};

export const seedOrganization = async () => {
    try {
        let number = 0;
        const data = await mainListMOdel.find({}).lean();
        for (const event of data) {
            const organizationModel = await Organization.findOne({ name: event.organization });
            if (!organizationModel) {
                const newOrganization = new Organization({
                    name: event.organization,
                    casualties: event.casualties,
                    listEvents: [event._id] 
                });
                await newOrganization.save(); 
                number++; 
                console.log(`Saved new orgization`);
            } else {
                await organizationModel.updateOne({
                    $push: { listEvents: event._id }, 
                    $inc: { casualties: event.casualties } 
                });
                console.log(`Updated  orgization`);
            }
        }
        console.log(`new organization saved successfully`);
    } catch (err) {
        console.error('Error organization:', err);
        throw err;
    }
};
