import TypesAttackModel from "../models/TypesAttack";
import { NewEvent } from "../types/dto/NewEventDTO";

export const listAttackSorted = async () => {
    try {
        return await TypesAttackModel.find()
            .sort({ casualties: -1 })
            .select("-listEvents")
            .lean();
    } catch (err) {
        console.error("[service]Error fetching types of attacks:", err);
        throw err;
    }
};

export const createNewAttack = async (event: NewEvent) => {
    try {
        const attackModel = await TypesAttackModel.findOne({
            name: event.attacktype,
        });
        if (!attackModel) {
            const newTypesAttack = new TypesAttackModel({
                name: event.attacktype,
                casualties: event.casualties,
                listEvents: [event._id],
            });
            await newTypesAttack.save();
            return newTypesAttack;
        } else {
            await attackModel.updateOne({
                $push: { listEvents: event._id },
                $inc: { casualties: event.casualties },
            });
            return attackModel;
        }
    } catch (err) {
        console.error("Error attack types:", err);
        throw err;
    }
};
