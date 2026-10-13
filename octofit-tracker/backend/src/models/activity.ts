import mongoose, { Schema, Types } from 'mongoose';

export interface Activity {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  activityType: 'running' | 'cycling' | 'walking' | 'strength';
  durationMinutes: number;
  distanceKm?: number;
  points: number;
  completedAt: Date;
}

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    activityType: {
      type: String,
      enum: ['running', 'cycling', 'walking', 'strength'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model('Activity', activitySchema);
