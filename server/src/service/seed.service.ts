import fs from 'fs'
import mainListMOdel from '../models/mainList'
import AttackModel from '../models/TypesAttack'
import Organization from '../models/organization'
import loctionModel from '../models/Loction'
import YearModel from '../models/Year'


export const seedMain = async () => {
    try {
        let number = 0
        const data = await JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
        for (const event of data) {
            if (!event || !event.iyear || !event.imonth || !event.city || !event.latitude || !event.longitude || !event.attacktype1_txt || !event.gname ) {
                console.log("Worg");
                continue
            }
            const newMainList = new mainListMOdel({
                year: event.iyear,
                month: event.imonth,
                city: event.city,
                lat: event.latitude,
                long: event.longitude,
                attacktype: event.attacktype1_txt,
                organization: event.gname,
                casualties: (event.nkill || 0 + event.nwound || 0).toFixed()
            })
            number ++
            await newMainList.save()
            console.log(number);
            console.log("Main list Saved successfully");     
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

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
};

export const seedAttack = async () => {
    try {
        let number = 0;
        const data = await mainListMOdel.find({}).lean();
        for (const event of data) {
            const attackModel = await AttackModel.findOne({ name: event.attacktype });

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
                    listEvents: [event._id],
                    lat: event.lat,
                    long: event.long 
                });
                console.log(newOrganization);
                
                await newOrganization.save(); 
                number++; 
                console.log(`Saved new orgization`);
            } else {
                await organizationModel.updateOne({
                    $push: { listEvents: event._id }, 
                    $inc: { casualties: event.casualties } ,
                    $set: { lat: event.lat, long: event.long }
                });
                console.log(`Updated  orgization`);
            }
        }
        console.log(`new organization saved successfully`);
    } catch (err) {
        console.log('Error organization',err);
        throw err;
    }
};

export const seedYear = async () => {
    try {
        const events = await mainListMOdel.find({}); 
        for (const event of events) {
            const yearData = await YearModel.findOne({ year: event.year });
            if (!yearData) {
                const newYear = new YearModel({
                    year: event.year,
                    listAmontType: [{ typeAttack: event.attacktype, ampount: 1 }],
                    listOrganization: [{ organization: event.organization, amount: 1 }],
                    listEvents: [event._id]
                });
                await newYear.save();
                console.log(`Year created successfully.`);
            } else {
                await yearData.updateOne({
                    $push: { listEvents: event._id }
                });

                const typeFromDb = yearData.listAmontType.find(e => e.typeAttack === event.attacktype);
                if (!typeFromDb) {
                    yearData.listAmontType.push({ typeAttack: event.attacktype, ampount: 1 });
                } else {
                    typeFromDb.ampount += 1;
                }
                const orgFromDb = yearData.listOrganization.find(e => e.organization === event.organization);
                if (!orgFromDb) {
                    yearData.listOrganization.push({ organization: event.organization, amount: 1 });
                } else {
                    orgFromDb.amount += 1;
                }
                await yearData.save();
                console.log(`Year updated successfully.`);
            }
        }
    } catch (err) {
        console.log("Error in seeding year:", err);
    }
};