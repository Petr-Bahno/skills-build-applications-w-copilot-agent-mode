import mongoose, { Schema, Types } from 'mongoose';

export interface Team {
  name: string;
  members: Types.ObjectId[];
  points: number;
}

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export default mongoose.model('Team', teamSchema);
