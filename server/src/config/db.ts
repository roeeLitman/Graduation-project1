import { connect } from "mongoose";
import mainListModel from "../models/mainList";
import TypesAttackModel from "../models/TypesAttack";
import { seedAttack, seedLOction, seedMain, seedOrganization, seedYear } from "../service/seed.service";
import organizationModel from "../models/organization";
import LoctionModel from "../models/Loction";
import YearModel from "../models/Year";
export const connectDB = ( async()=>{
  try {
      await connect(process.env.MONGODB_URI as string)
      console.log("Connected to mongo successfully");
      const mainList = await mainListModel.find({})
      if(mainList.length === 0){
          await seedMain()
      }
      const typesAttack = await TypesAttackModel.find({})
      if(typesAttack.length === 0){
           await seedAttack()
      }  
      const organization = await organizationModel.find({})  
      if(organization.length === 0){
          await seedOrganization()
      }
      const location = await LoctionModel.find({}) 
      if(location.length === 0){
          await seedLOction()
      }
      const year = await YearModel.find({})
      if(year.length === 0){
          await seedYear()
      }
  } catch (err) {
      console.log("Can't connected to mongo", err)
      throw err  
  }
})