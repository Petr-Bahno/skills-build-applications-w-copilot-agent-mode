import mongoose, { Schema } from 'mongoose';

export interface Workout {
  title: string;
  description: string;
  activityType: 'running' | 'cycling' | 'walking' | 'strength';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  equipment: string[];
}

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    activityType: {
      type: String,
      enum: ['running', 'cycling', 'walking', 'strength'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    equipment: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export default mongoose.model('Workout', workoutSchema);
