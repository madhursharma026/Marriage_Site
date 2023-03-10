import * as mongoose from 'mongoose';
import { Users } from './user.entity';
const schema = mongoose.Schema;


export const VisitSchema = new mongoose.Schema({
    visitBy: { type: String, required: true },
    visitTo: { type: String, required: true },
    visitByUsername: { type: schema.Types.ObjectId, ref: "Users" },
})

export interface Visits extends mongoose.Document {
    id: string;
    visitBy: string;
    visitTo: string;
    visitByUsername: Users;
}