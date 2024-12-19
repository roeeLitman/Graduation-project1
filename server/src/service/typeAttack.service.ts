import TypesAttackModel from "../models/TypesAttack";

const listAttackSorted = async () => {
    return await TypesAttackModel.find().lean().sort({ casualties: -1 });
};