import mongoose from "mongoose";

export interface NewEvent {
    _id?: mongoose.Types.ObjectId;
    year: number;
    month: number;
    city: string
    lat: number;
    long: number;
    attacktype: string
    organization: string
    casualties: number;
}