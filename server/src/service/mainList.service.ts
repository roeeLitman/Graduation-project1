import fs from 'fs'
import MainList from '../models/mainList'




export const seedMain = async () => {
    try {
        let number = 0
        const data = await JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
        for (const event of data) {
            if (!event || !event.iyear || !event.imonth || !event.city || !event.latitude || !event.longitude || !event.attacktype1_txt || !event.gname || !event.nkill || !event.nwound) {
                console.log("Worg");
                continue
            }
            const newMainList = new MainList({
                year: event.iyear,
                month: event.imonth,
                city: event.city,
                lat: event.latitude,
                long: event.longitude,
                attacktype: event.attacktype1_txt,
                organization: event.gname,
                casualties: (event.nkill + event.nwound)
            })
            number ++
            await newMainList.save()
            console.log(number);
            console.log("Main list Saved successfully");
            
        }
    } catch (err) {
        console.error(err)
        throw err
    }}