import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

async function seedRecord<T>(
  existing: T | null,
  create: () => Promise<T>,
  update: (record: T) => Promise<T>,
): Promise<T> {
  return existing ? update(existing) : create();
}

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    const sampleUsers = [
      { username: 'alex-runner', email: 'alex@example.com', name: 'Alex Morgan', points: 320 },
      { username: 'jamie-cycles', email: 'jamie@example.com', name: 'Jamie Lee', points: 280 },
      { username: 'sam-strength', email: 'sam@example.com', name: 'Sam Rivera', points: 240 },
    ];
    const users = await Promise.all(
      sampleUsers.map(async (user) => {
        const existing = await User.findOne({ email: user.email });
        return seedRecord(
          existing,
          () => User.create(user),
          async (record) => {
            record.set(user);
            return record.save();
          },
        );
      }),
    );
    const userByUsername = new Map(users.map((user) => [user.username, user]));
    const sampleTeams = [
      { name: 'Trail Blazers', usernames: ['alex-runner', 'sam-strength'], points: 560 },
      { name: 'City Cyclers', usernames: ['jamie-cycles'], points: 280 },
    ];
    const teams = await Promise.all(
      sampleTeams.map(async ({ name, usernames, points }) => {
        const members = usernames.map((username) => {
          const user = userByUsername.get(username);
          if (!user) {
            throw new Error(`Missing seeded user: ${username}`);
          }
          return user._id;
        });
        const teamData = { name, members, points };
        const existing = await Team.findOne({ name });
        return seedRecord(
          existing,
          () => Team.create(teamData),
          async (record) => {
            record.set(teamData);
            return record.save();
          },
        );
      }),
    );
    const teamByName = new Map(teams.map((team) => [team.name, team]));

    await Promise.all(
      sampleTeams.flatMap(({ name, usernames }) =>
        usernames.map((username) => {
          const user = userByUsername.get(username);
          const team = teamByName.get(name);
          if (!user || !team) {
            throw new Error(`Unable to assign ${username} to ${name}`);
          }
          return User.updateOne({ _id: user._id }, { $set: { team: team._id } });
        }),
      ),
    );

    const sampleActivities = [
      {
        username: 'alex-runner',
        teamName: 'Trail Blazers',
        activityType: 'running' as const,
        durationMinutes: 35,
        distanceKm: 5.2,
        points: 120,
        completedAt: new Date('2026-10-10T08:00:00.000Z'),
      },
      {
        username: 'jamie-cycles',
        teamName: 'City Cyclers',
        activityType: 'cycling' as const,
        durationMinutes: 50,
        distanceKm: 18,
        points: 150,
        completedAt: new Date('2026-10-11T09:00:00.000Z'),
      },
      {
        username: 'sam-strength',
        teamName: 'Trail Blazers',
        activityType: 'strength' as const,
        durationMinutes: 40,
        points: 110,
        completedAt: new Date('2026-10-12T07:30:00.000Z'),
      },
    ];
    await Promise.all(
      sampleActivities.map(async (activity) => {
        const user = userByUsername.get(activity.username);
        const team = teamByName.get(activity.teamName);
        if (!user || !team) {
          throw new Error(`Unable to seed activity for ${activity.username}`);
        }
        const { username: _username, teamName: _teamName, ...activityData } = activity;
        const filter = {
          user: user._id,
          activityType: activity.activityType,
          completedAt: activity.completedAt,
        };
        const activityRecord = { ...activityData, user: user._id, team: team._id };
        const existing = await Activity.findOne(filter);
        return seedRecord(
          existing,
          () => Activity.create(activityRecord),
          async (record) => {
            record.set(activityRecord);
            return record.save();
          },
        );
      }),
    );

    const rankedUsers = [...users].sort((a, b) => b.points - a.points);
    await Promise.all(
      rankedUsers.map(async (user, index) => {
        const entry = {
          team: user.team,
          points: user.points,
          rank: index + 1,
          period: 'all-time' as const,
        };
        const existing = await Leaderboard.findOne({ user: user._id, period: 'all-time' });
        return seedRecord(
          existing,
          () => Leaderboard.create({ ...entry, user: user._id }),
          async (record) => {
            record.set(entry);
            return record.save();
          },
        );
      }),
    );

    const sampleWorkouts = [
      {
        title: 'Easy Park Run',
        description: 'A relaxed outdoor run to build an aerobic base.',
        activityType: 'running' as const,
        difficulty: 'beginner' as const,
        durationMinutes: 25,
        equipment: ['running shoes'],
      },
      {
        title: 'Full-Body Strength',
        description: 'A balanced strength session for major muscle groups.',
        activityType: 'strength' as const,
        difficulty: 'intermediate' as const,
        durationMinutes: 40,
        equipment: ['dumbbells', 'exercise mat'],
      },
      {
        title: 'Endurance Ride',
        description: 'A steady cycling workout focused on stamina.',
        activityType: 'cycling' as const,
        difficulty: 'intermediate' as const,
        durationMinutes: 45,
        equipment: ['bicycle', 'helmet'],
      },
    ];
    await Promise.all(
      sampleWorkouts.map(async (workout) => {
        const existing = await Workout.findOne({ title: workout.title });
        return seedRecord(
          existing,
          () => Workout.create(workout),
          async (record) => {
            record.set(workout);
            return record.save();
          },
        );
      }),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

await seedDatabase();
