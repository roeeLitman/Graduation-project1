import TypesAttackModel from "../models/TypesAttack";

export const listAttackSorted = async () => {
    try {
        return await TypesAttackModel.find()
        .sort({ casualties: -1 })
        .select('-listEvents')
        .lean();
    } catch (err) {
        console.error("[service]Error fetching types of attacks:", err);
        throw err
    }
};

