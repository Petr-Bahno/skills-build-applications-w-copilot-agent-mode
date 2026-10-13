import mongoose, { Schema, Types } from 'mongoose';

export interface User {
  username: string;
  email: string;
  name: string;
  team?: Types.ObjectId;
  points: number;
}

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    name: { type: String, required: true, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export default mongoose.model('User', userSchema);
