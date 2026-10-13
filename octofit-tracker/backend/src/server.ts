import express from 'express';
import { connectDatabase } from './config/database.js';
import database from './config/database.js';
import Activity from './models/activity.js';
import Leaderboard from './models/leaderboard.js';
import Team from './models/team.js';
import User from './models/user.js';
import Workout from './models/workout.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const allowedOrigins = new Set([
  'http://localhost:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
]);

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use((request, response, next) => {
  const origin = request.get('origin');
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.vary('Origin');
  }

  if (request.method === 'OPTIONS') {
    if (!origin || !allowedOrigins.has(origin)) {
      response.sendStatus(403);
      return;
    }
    response.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.sendStatus(204);
    return;
  }

  next();
});

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: database.readyState === 1 ? 'connected' : 'connecting',
  });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().populate('team').lean());
});
app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members').lean());
});
app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user team').sort({ completedAt: -1 }).lean());
});
app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user team').sort({ rank: 1 }).lean());
});
app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ title: 1 }).lean());
});

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
});

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit API listening on port ${port} (base URL: ${apiBaseUrl})`);
    });
  } catch (error) {
    console.error('Unable to start OctoFit API:', error);
    process.exitCode = 1;
  }
}

void startServer();
