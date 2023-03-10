import * as mongoose from 'mongoose';
import { Visits } from './visit.entity';
const schema = mongoose.Schema;

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    profileImage: { type: String, required: true },
    visitByUsername: [{ type: schema.Types.ObjectId, ref: "Visits" }],
})

export interface Users extends mongoose.Document {
    id: string;
    email: string;
    password: string;
    name: string;
    profileImage: string;
    visitByUsername: Visits[];
}