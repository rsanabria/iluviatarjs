import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, lowercase: true, index: { unique: true }, required: true },
  password: String
});


import { Document } from 'mongoose';

export interface iUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}