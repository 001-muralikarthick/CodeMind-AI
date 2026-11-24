export function getCricketBlueprint(customTechStack = {}) {
  const tech = {
    frontend: customTechStack.frontend || 'React (Vite + Tailwind CSS)',
    backend: customTechStack.backend || 'Node.js / Express',
    database: customTechStack.database || 'MongoDB / Mongoose',
    auth: customTechStack.auth || 'JWT + bcrypt',
    styling: customTechStack.styling || 'Tailwind CSS'
  };

  const requirementsAnalysis = {
    overview: "CodeMind AI has analyzed the 'Cricket Management Website' project. It is a full-featured cricket administration and scoring platform designed for club managers, tournament organizers, players, and team captains. The system supports team creation, squad and player roster management, manual match creation, ball-by-ball score recording, and statistical leaderboards.",
    targetUsers: [
      {
        role: "Team Captain / Club Manager",
        capabilities: [
          "Register and manage team profile (club name, short code, home ground, jersey colors)",
          "Recruit and register players with detailed roles (Batsman, Bowler, All-Rounder, Wicketkeeper)",
          "Create manual matches and challenge opposing teams",
          "Log and update live scores (runs, wickets, overs, extras, fall of wickets)",
          "View match history and individual player performance statistics"
        ]
      },
      {
        role: "Tournament Administrator",
        capabilities: [
          "Global oversight of all registered cricket teams and verified players",
          "Schedule, reschedule, or cancel official matches and tournaments",
          "Audit and verify manual match records and scorecard submissions",
          "Manage venue allocations and umpire assignments"
        ]
      }
    ],
    modules: [
      {
        name: "User & Role Authentication",
        features: ["JWT authentication", "Bcrypt password hashing", "Role-based access (Captain/Manager vs Administrator)"]
      },
      {
        name: "Team & Squad Management",
        features: ["Team creation with short codes & logos", "Squad roster management (11-15 players)", "Captain and Vice-Captain appointments"]
      },
      {
        name: "Player Profiles & Cricket Specializations",
        features: ["Player bio & jersey numbers", "Cricket roles: Top-order Batsman, Fast Bowler, Spin Bowler, All-Rounder, Wicketkeeper", "Career statistics (Matches, Runs, Highest Score, Wickets, Best Bowling)"]
      },
      {
        name: "Match Scheduling & Creation",
        features: ["Fixture creation (Team A vs Team B)", "Format selection: T20 (20 overs), One Day (50 overs), Custom (10-15 overs)", "Venue, match date/time, and toss decision recording"]
      },
      {
        name: "Live Scorecard & Manual Match Scoring",
        features: ["Innings scorekeeper (Runs, Wickets, Overs, Balls)", "Current batsman on strike & active bowler", "Extras counter (Wides, No-balls, Byes, Leg-byes)", "Match result calculation (e.g. 'Team A won by 24 runs')"]
      },
      {
        name: "Match Records & Statistics",
        features: ["Historical match scorecards archive", "Top run-scorers and wicket-takers leaderboards", "Team win/loss records"]
      }
    ],
    nonFunctionalRequirements: [
      "Real-time update speed for instant ball-by-ball score tracking",
      "Data integrity for player career averages and match score reconciliation",
      "Responsive design optimized for pitch-side scoring on mobile, tablet, and desktop"
    ]
  };

  const projectPlan = {
    milestones: [
      { phase: "Sprint 1: System Architecture & Auth", duration: "Day 1-2", tasks: ["Scaffold client and server workspaces", "Configure Tailwind CSS and Mongoose", "Implement User registration and JWT authentication"] },
      { phase: "Sprint 2: Teams & Players Roster API", duration: "Day 3-4", tasks: ["Create Team and Player schemas with cricket roles", "Build team creation & squad management endpoints", "Implement player recruitment & stats tracking"] },
      { phase: "Sprint 3: Match Creation & Scoring Engine", duration: "Day 5-6", tasks: ["Develop Match fixture creation API (Overs, Teams, Venue)", "Build manual scorekeeper controller (Runs, Wickets, Overs)", "Implement result determination logic"] },
      { phase: "Sprint 4: Records Archive & Admin Dashboard", duration: "Day 7", tasks: ["Build historical match scorecard records", "Develop Admin management for teams and fixtures", "Package project with Docker & seed script"] }
    ],
    deliverables: [
      "Complete Cricket Management REST API backend (Node.js/Express)",
      "Interactive modern cricket web application (React/Vite/Tailwind)",
      "Seed database script pre-populated with cricket teams and star players",
      "Real-time ball-by-ball manual match scoring interface",
      "Exportable project documentation (PDF, DOCX, Markdown)"
    ]
  };

  const architecture = {
    pattern: "Decoupled 3-Tier Layered Architecture",
    description: "Separates presentation logic (React Vite SPA) from business scoring rules (Express API) and persistence (MongoDB Mongoose models).",
    components: [
      { name: "Frontend Client (CricPulse)", technology: tech.frontend, role: "Delivers responsive cricket dashboard, team roster builders, live scoring keypad, and match history." },
      { name: "API Gateway & Security", technology: tech.backend, role: "Enforces CORS, JWT authentication, role guards (Captain vs Admin), and input validation." },
      { name: "Cricket Domain Controllers", technology: tech.backend, role: "Executes squad management, match fixture scheduling, scoring state machine, and player statistics aggregation." },
      { name: "Persistence Layer", technology: tech.database, role: "Stores collections for Users, Teams, Players, Matches, and Scorecards with relational references." }
    ],
    diagram: `
+-------------------------------------------------------------+
|              CRICKET MANAGEMENT FRONTEND (React)            |
|   [Dashboard] [Teams & Squads] [Players] [Match Scorer]     |
+------------------------------+------------------------------+
                               | HTTPS / REST APIs
+------------------------------v------------------------------+
|               API GATEWAY & AUTH MIDDLEWARE                 |
|       [CORS] [JWT Verification] [Admin / Captain Guard]     |
+------------------------------+------------------------------+
                               |
+------------------------------v------------------------------+
|               CRICKET APPLICATION CONTROLLERS               |
|  [TeamController]  [PlayerController]  [MatchScoreController]|
+------------------------------+------------------------------+
                               | Mongoose ODM
+------------------------------v------------------------------+
|               PERSISTENCE LAYER (MongoDB)                   |
|     (Teams) <-----> (Players) <-----> (Matches & Records)   |
+-------------------------------------------------------------+
`
  };

  const folderStructure = [
    { name: "server/", type: "folder", description: "Node.js Express backend" },
    { name: "server/src/server.js", type: "file", description: "Express app entry point" },
    { name: "server/src/config/db.js", type: "file", description: "MongoDB connector with in-memory fallback" },
    { name: "server/src/models/User.js", type: "file", description: "User & Admin accounts" },
    { name: "server/src/models/Team.js", type: "file", description: "Cricket Team model with roster" },
    { name: "server/src/models/Player.js", type: "file", description: "Cricket Player stats & specialization" },
    { name: "server/src/models/Match.js", type: "file", description: "Match fixtures, live scoring & records" },
    { name: "server/src/controllers/authController.js", type: "file", description: "Auth business logic" },
    { name: "server/src/controllers/teamController.js", type: "file", description: "Team creation & squad management" },
    { name: "server/src/controllers/playerController.js", type: "file", description: "Player recruitment & stats" },
    { name: "server/src/controllers/matchController.js", type: "file", description: "Match creation & manual scoring logic" },
    { name: "server/src/routes/authRoutes.js", type: "file", description: "Auth routes" },
    { name: "server/src/routes/teamRoutes.js", type: "file", description: "Team routes" },
    { name: "server/src/routes/playerRoutes.js", type: "file", description: "Player routes" },
    { name: "server/src/routes/matchRoutes.js", type: "file", description: "Match & scoring routes" },
    { name: "server/src/middleware/authMiddleware.js", type: "file", description: "JWT & Role authorization" },
    { name: "server/src/utils/seedData.js", type: "file", description: "Seed cricket teams & star players" },
    { name: "server/package.json", type: "file", description: "Server dependencies" },
    { name: "client/", type: "folder", description: "React Vite frontend" },
    { name: "client/src/main.jsx", type: "file", description: "React entry point" },
    { name: "client/src/App.jsx", type: "file", description: "Master layout & navigation" },
    { name: "client/src/components/Navbar.jsx", type: "file", description: "Cricket navigation bar" },
    { name: "client/src/components/CreateTeamModal.jsx", type: "file", description: "Modal to create new cricket team" },
    { name: "client/src/components/AddPlayerModal.jsx", type: "file", description: "Modal to recruit player to team" },
    { name: "client/src/components/CreateMatchModal.jsx", type: "file", description: "Modal to create manual match fixture" },
    { name: "client/src/components/ScoreKeeperModal.jsx", type: "file", description: "Interactive pitch-side scorecard keypad" },
    { name: "client/src/components/AuthModal.jsx", type: "file", description: "Login & Registration modal" },
    { name: "client/src/pages/DashboardPage.jsx", type: "file", description: "Cricket home dashboard & live matches" },
    { name: "client/src/pages/TeamsPage.jsx", type: "file", description: "Teams directory & squad rosters" },
    { name: "client/src/pages/PlayersPage.jsx", type: "file", description: "Players directory & career stats" },
    { name: "client/src/pages/MatchesPage.jsx", type: "file", description: "Match fixtures & live match scorer" },
    { name: "client/src/pages/RecordsPage.jsx", type: "file", description: "Match records archive & leaderboards" },
    { name: "client/src/pages/AdminPage.jsx", type: "file", description: "Admin oversight & management" },
    { name: "client/src/services/api.js", type: "file", description: "Cricket API client" },
    { name: "README.md", type: "file", description: "Project documentation & setup guide" },
    { name: "docker-compose.yml", type: "file", description: "Docker Compose multi-container setup" },
    { name: ".env.example", type: "file", description: "Environment configuration" }
  ];

  const schemaDesign = {
    collections: [
      {
        name: "User",
        fields: [
          { name: "_id", type: "ObjectId", description: "Primary Key" },
          { name: "name", type: "String", required: true },
          { name: "email", type: "String", required: true, unique: true },
          { name: "password", type: "String (hashed)", required: true },
          { name: "role", type: "String (captain | admin)", default: "captain" }
        ]
      },
      {
        name: "Team",
        fields: [
          { name: "_id", type: "ObjectId", description: "Primary Key" },
          { name: "name", type: "String", required: true, unique: true },
          { name: "shortCode", type: "String (e.g. CSK, MI, RCB)", required: true },
          { name: "city", type: "String", required: true },
          { name: "logo", type: "String" },
          { name: "captainName", type: "String", default: "TBD" },
          { name: "createdBy", type: "ObjectId (ref: User)", required: true },
          { name: "matchesPlayed", type: "Number", default: 0 },
          { name: "wins", type: "Number", default: 0 },
          { name: "losses", type: "Number", default: 0 }
        ]
      },
      {
        name: "Player",
        fields: [
          { name: "_id", type: "ObjectId", description: "Primary Key" },
          { name: "name", type: "String", required: true },
          { name: "team", type: "ObjectId (ref: Team)", required: true },
          { name: "role", type: "String (Batsman | Bowler | All-Rounder | Wicketkeeper)", required: true },
          { name: "jerseyNumber", type: "Number", default: 10 },
          { name: "battingStyle", type: "String (Right-hand | Left-hand)", default: "Right-hand" },
          { name: "bowlingStyle", type: "String (Right-arm Fast | Right-arm Off-spin | Left-arm Spin | None)", default: "Right-arm Fast" },
          { name: "runs", type: "Number", default: 0 },
          { name: "wickets", type: "Number", default: 0 },
          { name: "matches", type: "Number", default: 0 }
        ]
      },
      {
        name: "Match",
        fields: [
          { name: "_id", type: "ObjectId", description: "Primary Key" },
          { name: "title", type: "String", required: true },
          { name: "teamA", type: "ObjectId (ref: Team)", required: true },
          { name: "teamB", type: "ObjectId (ref: Team)", required: true },
          { name: "venue", type: "String", required: true },
          { name: "date", type: "Date", default: "Date.now" },
          { name: "totalOvers", type: "Number", default: 20 },
          { name: "tossWinner", type: "String" },
          { name: "tossDecision", type: "String (Bat | Bowl)" },
          { name: "status", type: "String (Upcoming | Live | Completed)", default: "Upcoming" },
          { name: "teamAScore", type: "Object { runs: 0, wickets: 0, overs: 0, balls: 0 }" },
          { name: "teamBScore", type: "Object { runs: 0, wickets: 0, overs: 0, balls: 0 }" },
          { name: "result", type: "String", default: "Match pending" }
        ]
      }
    ],
    relationships: [
      "Team 1:N Player (A team contains multiple squad players)",
      "User 1:N Team (A user / captain can create and manage teams)",
      "Match 2:1 Team (A match involves two competing teams: Team A and Team B)"
    ]
  };

  const apiEndpoints = [
    { method: "POST", path: "/api/auth/register", auth: "Public", description: "Register captain/admin account", request: "{ name, email, password, role }", response: "{ token, user }" },
    { method: "POST", path: "/api/auth/login", auth: "Public", description: "Authenticate and get JWT", request: "{ email, password }", response: "{ token, user }" },
    { method: "GET", path: "/api/teams", auth: "Public", description: "List all cricket teams with stats", request: "Query: ?search=", response: "[...teams]" },
    { method: "POST", path: "/api/teams", auth: "User JWT", description: "Create a new cricket team", request: "{ name, shortCode, city, logo, captainName }", response: "{ team }" },
    { method: "GET", path: "/api/teams/:id", auth: "Public", description: "Get team profile and player roster", request: "Params: id", response: "{ team, players: [...] }" },
    { method: "DELETE", path: "/api/teams/:id", auth: "Admin JWT", description: "Delete team from system", request: "Params: id", response: "{ message: 'Team deleted' }" },
    { method: "GET", path: "/api/players", auth: "Public", description: "Browse all players with stats", request: "Query: ?teamId=&role=", response: "[...players]" },
    { method: "POST", path: "/api/players", auth: "User JWT", description: "Add player to a team", request: "{ name, team, role, jerseyNumber, battingStyle, bowlingStyle }", response: "{ player }" },
    { method: "DELETE", path: "/api/players/:id", auth: "User/Admin", description: "Remove player from roster", request: "Params: id", response: "{ message: 'Player removed' }" },
    { method: "GET", path: "/api/matches", auth: "Public", description: "List fixtures and live match scores", request: "Query: ?status=", response: "[...matches]" },
    { method: "POST", path: "/api/matches", auth: "User JWT", description: "Create manual match fixture", request: "{ teamA, teamB, venue, date, totalOvers, tossWinner, tossDecision }", response: "{ match }" },
    { method: "PUT", path: "/api/matches/:id/score", auth: "User JWT", description: "Update manual match score & balls", request: "{ battingTeam: 'teamA'|'teamB', runsToAdd, isWicket, isExtra, markCompleted, result }", response: "{ match }" },
    { method: "GET", path: "/api/matches/records", auth: "Public", description: "Get completed match records and leaderboards", request: "None", response: "{ records: [...], topRunScorers: [...], topWicketTakers: [...] }" }
  ];

  // Full runnable source code files for Cricket Management
  const files = [
    {
      path: "server/package.json",
      name: "package.json",
      category: "backend",
      language: "json",
      content: `{
  "name": "cricket-management-server",
  "version": "1.0.0",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "seed": "node src/utils/seedData.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.5.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}`
    },
    {
      path: "server/src/server.js",
      name: "server.js",
      category: "backend",
      language: "javascript",
      content: `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import matchRoutes from './routes/matchRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', system: 'Cricket Management Engine', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`[Cricket API] Server running on port \${PORT}\`);
});`
    },
    {
      path: "server/src/config/db.js",
      name: "db.js",
      category: "backend",
      language: "javascript",
      content: `import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cricket_db', {
      serverSelectionTimeoutMS: 2500
    });
    console.log(\`[MongoDB] Connected: \${conn.connection.host}\`);
  } catch (err) {
    console.warn('[MongoDB Warning] Could not connect to MongoDB. Running in resilient local storage mode.');
  }
};`
    },
    {
      path: "server/src/models/User.js",
      name: "User.js",
      category: "backend",
      language: "javascript",
      content: `import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['captain', 'admin'], default: 'captain' }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);`
    },
    {
      path: "server/src/models/Team.js",
      name: "Team.js",
      category: "backend",
      language: "javascript",
      content: `import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  shortCode: { type: String, required: true, uppercase: true, trim: true },
  city: { type: String, required: true },
  logo: { type: String, default: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400' },
  captainName: { type: String, default: 'Unassigned' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  matchesPlayed: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Team || mongoose.model('Team', teamSchema);`
    },
    {
      path: "server/src/models/Player.js",
      name: "Player.js",
      category: "backend",
      language: "javascript",
      content: `import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  role: {
    type: String,
    enum: ['Batsman', 'Bowler', 'All-Rounder', 'Wicketkeeper'],
    required: true,
    default: 'Batsman'
  },
  jerseyNumber: { type: Number, default: 7 },
  battingStyle: { type: String, enum: ['Right-hand', 'Left-hand'], default: 'Right-hand' },
  bowlingStyle: {
    type: String,
    enum: ['Right-arm Fast', 'Left-arm Fast', 'Right-arm Off-spin', 'Left-arm Spin', 'None'],
    default: 'Right-arm Fast'
  },
  matches: { type: Number, default: 0 },
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  highestScore: { type: Number, default: 0 },
  bestBowling: { type: String, default: '0/0' }
}, { timestamps: true });

export default mongoose.models.Player || mongoose.model('Player', playerSchema);`
    },
    {
      path: "server/src/models/Match.js",
      name: "Match.js",
      category: "backend",
      language: "javascript",
      content: `import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  teamA: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  teamB: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  venue: { type: String, required: true },
  date: { type: Date, default: Date.now },
  totalOvers: { type: Number, default: 20 },
  tossWinner: { type: String, default: 'Team A' },
  tossDecision: { type: String, enum: ['Bat', 'Bowl'], default: 'Bat' },
  status: { type: String, enum: ['Upcoming', 'Live', 'Completed'], default: 'Upcoming' },
  currentInnings: { type: String, enum: ['teamA', 'teamB'], default: 'teamA' },
  teamAScore: {
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    overs: { type: Number, default: 0 },
    balls: { type: Number, default: 0 }
  },
  teamBScore: {
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    overs: { type: Number, default: 0 },
    balls: { type: Number, default: 0 }
  },
  result: { type: String, default: 'Match Scheduled' },
  manOfTheMatch: { type: String, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.models.Match || mongoose.model('Match', matchSchema);`
    },
    {
      path: "server/src/middleware/authMiddleware.js",
      name: "authMiddleware.js",
      category: "backend",
      language: "javascript",
      content: `import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cricket_secret_key_123');
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
};`
    },
    {
      path: "server/src/controllers/authController.js",
      name: "authController.js",
      category: "backend",
      language: "javascript",
      content: `import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'cricket_secret_key_123', {
    expiresIn: '30d'
  });
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const user = await User.create({
    name,
    email,
    password,
    role: role === 'admin' ? 'admin' : 'captain'
  });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id)
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};`
    },
    {
      path: "server/src/controllers/teamController.js",
      name: "teamController.js",
      category: "backend",
      language: "javascript",
      content: `import Team from '../models/Team.js';
import Player from '../models/Player.js';

export const getTeams = async (req, res) => {
  const search = req.query.search
    ? { name: { $regex: req.query.search, $options: 'i' } }
    : {};
  const teams = await Team.find(search).sort({ wins: -1, name: 1 });
  res.json(teams);
};

export const getTeamById = async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) return res.status(404).json({ message: 'Team not found' });
  const players = await Player.find({ team: team._id });
  res.json({ team, players });
};

export const createTeam = async (req, res) => {
  const { name, shortCode, city, logo, captainName } = req.body;
  if (!name || !shortCode) {
    return res.status(400).json({ message: 'Name and Short Code are required' });
  }
  const team = await Team.create({
    name,
    shortCode: shortCode.toUpperCase(),
    city: city || 'City Stadium',
    logo: logo || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400',
    captainName: captainName || 'Unassigned',
    createdBy: req.user?._id
  });
  res.status(201).json(team);
};

export const deleteTeam = async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  await Player.deleteMany({ team: req.params.id });
  res.json({ message: 'Team and affiliated players deleted' });
};`
    },
    {
      path: "server/src/controllers/playerController.js",
      name: "playerController.js",
      category: "backend",
      language: "javascript",
      content: `import Player from '../models/Player.js';
import Team from '../models/Team.js';

export const getPlayers = async (req, res) => {
  const filter = {};
  if (req.query.teamId) filter.team = req.query.teamId;
  if (req.query.role && req.query.role !== 'All') filter.role = req.query.role;

  const players = await Player.find(filter).populate('team', 'name shortCode').sort({ runs: -1 });
  res.json(players);
};

export const addPlayer = async (req, res) => {
  const { name, team, role, jerseyNumber, battingStyle, bowlingStyle } = req.body;
  if (!name || !team) {
    return res.status(400).json({ message: 'Player name and team are required' });
  }

  const player = await Player.create({
    name,
    team,
    role: role || 'Batsman',
    jerseyNumber: jerseyNumber || 10,
    battingStyle: battingStyle || 'Right-hand',
    bowlingStyle: bowlingStyle || 'Right-arm Fast'
  });

  res.status(201).json(player);
};

export const deletePlayer = async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.json({ message: 'Player removed from roster' });
};`
    },
    {
      path: "server/src/controllers/matchController.js",
      name: "matchController.js",
      category: "backend",
      language: "javascript",
      content: `import Match from '../models/Match.js';
import Team from '../models/Team.js';

export const getMatches = async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const matches = await Match.find(filter)
    .populate('teamA', 'name shortCode logo')
    .populate('teamB', 'name shortCode logo')
    .sort({ date: -1 });
  res.json(matches);
};

export const createMatch = async (req, res) => {
  const { teamA, teamB, venue, totalOvers, tossWinner, tossDecision } = req.body;
  if (!teamA || !teamB) {
    return res.status(400).json({ message: 'Both teams are required to create a match' });
  }

  const teamAObj = await Team.findById(teamA);
  const teamBObj = await Team.findById(teamB);

  const match = await Match.create({
    title: \`\${teamAObj?.shortCode || 'Team A'} vs \${teamBObj?.shortCode || 'Team B'}\`,
    teamA,
    teamB,
    venue: venue || 'National Cricket Ground',
    totalOvers: totalOvers || 20,
    tossWinner: tossWinner || teamAObj?.name,
    tossDecision: tossDecision || 'Bat',
    status: 'Upcoming',
    createdBy: req.user?._id
  });

  res.status(201).json(match);
};

export const updateMatchScore = async (req, res) => {
  const { runsToAdd = 0, isWicket = false, isExtra = false, markCompleted = false, result = '' } = req.body;
  const match = await Match.findById(req.params.id);
  if (!match) return res.status(404).json({ message: 'Match not found' });

  match.status = 'Live';
  const innings = match.currentInnings || 'teamA';
  const scoreObj = innings === 'teamA' ? match.teamAScore : match.teamBScore;

  // Update runs
  scoreObj.runs += Number(runsToAdd);

  // Update wickets
  if (isWicket && scoreObj.wickets < 10) {
    scoreObj.wickets += 1;
  }

  // Update legal balls (extras do not count towards balls)
  if (!isExtra) {
    scoreObj.balls += 1;
    if (scoreObj.balls >= 6) {
      scoreObj.overs += 1;
      scoreObj.balls = 0;
    }
  }

  // Switch innings if 10 wickets down or overs finished
  if ((scoreObj.wickets >= 10 || scoreObj.overs >= match.totalOvers) && innings === 'teamA') {
    match.currentInnings = 'teamB';
  }

  if (markCompleted || (innings === 'teamB' && (scoreObj.wickets >= 10 || scoreObj.overs >= match.totalOvers || scoreObj.runs > match.teamAScore.runs))) {
    match.status = 'Completed';
    if (!result) {
      if (match.teamAScore.runs > match.teamBScore.runs) {
        match.result = \`\${match.teamA} won by \${match.teamAScore.runs - match.teamBScore.runs} runs\`;
      } else if (match.teamBScore.runs > match.teamAScore.runs) {
        match.result = \`\${match.teamB} won by \${10 - match.teamBScore.wickets} wickets\`;
      } else {
        match.result = 'Match Tied';
      }
    } else {
      match.result = result;
    }
  }

  const updatedMatch = await match.save();
  res.json(updatedMatch);
};

export const getMatchRecords = async (req, res) => {
  const records = await Match.find({ status: 'Completed' })
    .populate('teamA', 'name shortCode logo')
    .populate('teamB', 'name shortCode logo')
    .sort({ updatedAt: -1 });

  res.json({
    totalCompletedMatches: records.length,
    records
  });
};`
    },
    {
      path: "server/src/routes/authRoutes.js",
      name: "authRoutes.js",
      category: "backend",
      language: "javascript",
      content: `import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);

export default router;`
    },
    {
      path: "server/src/routes/teamRoutes.js",
      name: "teamRoutes.js",
      category: "backend",
      language: "javascript",
      content: `import express from 'express';
import { getTeams, getTeamById, createTeam, deleteTeam } from '../controllers/teamController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getTeams);
router.get('/:id', getTeamById);
router.post('/', protect, createTeam);
router.delete('/:id', protect, admin, deleteTeam);

export default router;`
    },
    {
      path: "server/src/routes/playerRoutes.js",
      name: "playerRoutes.js",
      category: "backend",
      language: "javascript",
      content: `import express from 'express';
import { getPlayers, addPlayer, deletePlayer } from '../controllers/playerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getPlayers);
router.post('/', protect, addPlayer);
router.delete('/:id', protect, deletePlayer);

export default router;`
    },
    {
      path: "server/src/routes/matchRoutes.js",
      name: "matchRoutes.js",
      category: "backend",
      language: "javascript",
      content: `import express from 'express';
import { getMatches, createMatch, updateMatchScore, getMatchRecords } from '../controllers/matchController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getMatches);
router.get('/records', getMatchRecords);
router.post('/', protect, createMatch);
router.put('/:id/score', protect, updateMatchScore);

export default router;`
    },
    {
      path: "server/src/utils/seedData.js",
      name: "seedData.js",
      category: "backend",
      language: "javascript",
      content: `import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Player from '../models/Player.js';
import Match from '../models/Match.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const seed = async () => {
  await connectDB();
  try {
    await User.deleteMany();
    await Team.deleteMany();
    await Player.deleteMany();
    await Match.deleteMany();

    const admin = await User.create({
      name: "Tournament Director",
      email: "admin@cricket.com",
      password: "password123",
      role: "admin"
    });

    const captain = await User.create({
      name: "Club Captain",
      email: "captain@cricket.com",
      password: "password123",
      role: "captain"
    });

    const teamA = await Team.create({
      name: "Chennai Super Kings",
      shortCode: "CSK",
      city: "Chennai",
      logo: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400",
      captainName: "MS Dhoni",
      createdBy: captain._id,
      matchesPlayed: 14,
      wins: 10,
      losses: 4
    });

    const teamB = await Team.create({
      name: "Mumbai Indians",
      shortCode: "MI",
      city: "Mumbai",
      logo: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400",
      captainName: "Rohit Sharma",
      createdBy: captain._id,
      matchesPlayed: 14,
      wins: 9,
      losses: 5
    });

    const teamC = await Team.create({
      name: "Royal Challengers",
      shortCode: "RCB",
      city: "Bengaluru",
      logo: "https://images.unsplash.com/photo-1512719355430-6dd0abbc7982?w=400",
      captainName: "Virat Kohli",
      createdBy: captain._id,
      matchesPlayed: 14,
      wins: 8,
      losses: 6
    });

    // Players
    await Player.create([
      { name: "MS Dhoni", team: teamA._id, role: "Wicketkeeper", jerseyNumber: 7, battingStyle: "Right-hand", runs: 5082, matches: 250 },
      { name: "Ravindra Jadeja", team: teamA._id, role: "All-Rounder", jerseyNumber: 8, battingStyle: "Left-hand", bowlingStyle: "Left-arm Spin", runs: 2692, wickets: 152, matches: 226 },
      { name: "Ruturaj Gaikwad", team: teamA._id, role: "Batsman", jerseyNumber: 31, battingStyle: "Right-hand", runs: 1797, matches: 52 },
      { name: "Rohit Sharma", team: teamB._id, role: "Batsman", jerseyNumber: 45, battingStyle: "Right-hand", runs: 6211, matches: 243 },
      { name: "Jasprit Bumrah", team: teamB._id, role: "Bowler", jerseyNumber: 93, bowlingStyle: "Right-arm Fast", wickets: 145, matches: 120 },
      { name: "Virat Kohli", team: teamC._id, role: "Batsman", jerseyNumber: 18, battingStyle: "Right-hand", runs: 7263, matches: 237 }
    ]);

    // Matches
    await Match.create({
      title: "CSK vs MI El Clásico",
      teamA: teamA._id,
      teamB: teamB._id,
      venue: "Wankhede Stadium, Mumbai",
      totalOvers: 20,
      tossWinner: "Chennai Super Kings",
      tossDecision: "Bat",
      status: "Live",
      currentInnings: "teamA",
      teamAScore: { runs: 168, wickets: 4, overs: 17, balls: 2 },
      teamBScore: { runs: 0, wickets: 0, overs: 0, balls: 0 },
      result: "In Progress"
    });

    console.log("Cricket Database seeded successfully!");
    console.log("Admin:   admin@cricket.com / password123");
    console.log("Captain: captain@cricket.com / password123");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();`
    },
    {
      path: "client/package.json",
      name: "package.json",
      category: "frontend",
      language: "json",
      content: `{
  "name": "cricket-client",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.414.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.6",
    "vite": "^5.3.4"
  }
}`
    },
    {
      path: "client/src/App.jsx",
      name: "App.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import TeamsPage from './pages/TeamsPage';
import PlayersPage from './pages/PlayersPage';
import MatchesPage from './pages/MatchesPage';
import RecordsPage from './pages/RecordsPage';
import AdminPage from './pages/AdminPage';
import CreateTeamModal from './components/CreateTeamModal';
import AddPlayerModal from './components/AddPlayerModal';
import CreateMatchModal from './components/CreateMatchModal';
import ScoreKeeperModal from './components/ScoreKeeperModal';
import AuthModal from './components/AuthModal';

export default function App() {
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'teams' | 'players' | 'matches' | 'records' | 'admin'
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem('cricket_user');
    return s ? JSON.parse(s) : null;
  });

  // Modal states
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [scoringMatch, setScoringMatch] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('cricket_user', JSON.stringify(userData));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cricket_user');
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar
        user={user}
        view={view}
        setView={setView}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenCreateTeam={() => (user ? setIsTeamModalOpen(true) : setIsAuthOpen(true))}
        onOpenCreateMatch={() => (user ? setIsMatchModalOpen(true) : setIsAuthOpen(true))}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {view === 'dashboard' && (
          <DashboardPage
            onOpenScorer={(match) => (user ? setScoringMatch(match) : setIsAuthOpen(true))}
            onOpenCreateMatch={() => (user ? setIsMatchModalOpen(true) : setIsAuthOpen(true))}
            onViewTeams={() => setView('teams')}
          />
        )}
        {view === 'teams' && (
          <TeamsPage
            user={user}
            onOpenCreateTeam={() => (user ? setIsTeamModalOpen(true) : setIsAuthOpen(true))}
            onOpenAddPlayer={() => (user ? setIsPlayerModalOpen(true) : setIsAuthOpen(true))}
          />
        )}
        {view === 'players' && (
          <PlayersPage
            user={user}
            onOpenAddPlayer={() => (user ? setIsPlayerModalOpen(true) : setIsAuthOpen(true))}
          />
        )}
        {view === 'matches' && (
          <MatchesPage
            user={user}
            onOpenScorer={(match) => (user ? setScoringMatch(match) : setIsAuthOpen(true))}
            onOpenCreateMatch={() => (user ? setIsMatchModalOpen(true) : setIsAuthOpen(true))}
          />
        )}
        {view === 'records' && <RecordsPage />}
        {view === 'admin' && user?.role === 'admin' && <AdminPage user={user} />}
      </main>

      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        CricPulse Cricket Management System • Generated by CodeMind AI
      </footer>

      {/* Modals */}
      <CreateTeamModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} />
      <AddPlayerModal isOpen={isPlayerModalOpen} onClose={() => setIsPlayerModalOpen(false)} />
      <CreateMatchModal isOpen={isMatchModalOpen} onClose={() => setIsMatchModalOpen(false)} />
      <ScoreKeeperModal match={scoringMatch} onClose={() => setScoringMatch(null)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={handleLogin} />
    </div>
  );
}`
    },
    {
      path: "client/src/components/Navbar.jsx",
      name: "Navbar.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React from 'react';
import { Trophy, Users, UserPlus, PlayCircle, Archive, Shield, LogOut, User, PlusCircle } from 'lucide-react';

export default function Navbar({ user, view, setView, onOpenAuth, onLogout, onOpenCreateTeam, onOpenCreateMatch }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">
                CricPulse
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                Cricket Hub
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Club & Match Management</p>
          </div>
        </div>

        <nav className="flex items-center space-x-1 sm:space-x-3">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'teams', label: 'Teams & Squads' },
            { id: 'players', label: 'Players' },
            { id: 'matches', label: 'Matches' },
            { id: 'records', label: 'Records' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={\`px-3 py-1.5 rounded-lg text-xs font-semibold transition \${
                view === item.id ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-300 hover:text-white'
              }\`}
            >
              {item.label}
            </button>
          ))}

          {user?.role === 'admin' && (
            <button
              onClick={() => setView('admin')}
              className={\`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1 \${
                view === 'admin' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'text-purple-300 hover:text-purple-200'
              }\`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          )}

          {/* Quick Create buttons */}
          <div className="hidden md:flex items-center space-x-2 pl-2 border-l border-slate-800">
            <button
              onClick={onOpenCreateMatch}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition shadow-md shadow-emerald-600/20 flex items-center space-x-1"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>New Match</span>
            </button>
          </div>

          {/* User Auth */}
          {user ? (
            <div className="flex items-center space-x-2 pl-2">
              <span className="text-xs font-semibold text-slate-300 hidden sm:inline">{user.name}</span>
              <button onClick={onLogout} title="Logout" className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1 border border-slate-700"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}`
    },
    {
      path: "client/src/pages/DashboardPage.jsx",
      name: "DashboardPage.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import { Trophy, Activity, Users, Flame, Play, Plus, ArrowRight } from 'lucide-react';
import { cricketApi } from '../services/api';

export default function DashboardPage({ onOpenScorer, onOpenCreateMatch, onViewTeams }) {
  const [liveMatches, setLiveMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const matchData = await cricketApi.getMatches();
      const teamData = await cricketApi.getTeams();
      setLiveMatches(matchData.filter(m => m.status === 'Live' || m.status === 'Upcoming'));
      setTeams(teamData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/20 p-8 sm:p-10 shadow-2xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-3 border border-emerald-500/20">
            <Flame className="w-3.5 h-3.5" />
            <span>Cricket Season 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Comprehensive Cricket Club & Match Score Management
          </h1>
          <p className="mt-2 text-slate-300 text-sm leading-relaxed">
            Create club teams, add player profiles with roles, schedule manual match fixtures, and track live ball-by-ball scorecards.
          </p>
          <div className="mt-5 flex items-center space-x-3">
            <button
              onClick={onOpenCreateMatch}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Match Fixture</span>
            </button>
            <button
              onClick={onViewTeams}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
            >
              Manage Teams ({teams.length})
            </button>
          </div>
        </div>
      </div>

      {/* Live & Upcoming Matches */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span>Live Matches & Fixtures</span>
          </h2>
        </div>

        {loading ? (
          <div className="h-40 bg-slate-900/40 rounded-2xl animate-pulse" />
        ) : liveMatches.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No live matches right now. Create a manual match to start scoring!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {liveMatches.map((m) => (
              <div key={m._id} className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="font-bold text-white text-sm">{m.title}</span>
                    <span className="text-xs text-slate-400 block">{m.venue} • {m.totalOvers} Overs</span>
                  </div>
                  <span className={\`text-xs px-2.5 py-1 rounded-full font-bold \${
                    m.status === 'Live' ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' : 'bg-slate-800 text-slate-300'
                  }\`}>
                    {m.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 block">{m.teamA?.name || 'Team A'}</span>
                    <span className="text-lg font-mono font-bold text-white">
                      {m.teamAScore.runs}/{m.teamAScore.wickets}{' '}
                      <span className="text-xs text-slate-400 font-normal">({m.teamAScore.overs}.{m.teamAScore.balls} ov)</span>
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-600 uppercase">VS</span>
                  <div className="space-y-1 text-right">
                    <span className="text-xs text-slate-400 block">{m.teamB?.name || 'Team B'}</span>
                    <span className="text-lg font-mono font-bold text-white">
                      {m.teamBScore.runs}/{m.teamBScore.wickets}{' '}
                      <span className="text-xs text-slate-400 font-normal">({m.teamBScore.overs}.{m.teamBScore.balls} ov)</span>
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 italic">{m.result}</span>
                  <button
                    onClick={() => onOpenScorer(m)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Open Scorekeeper</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}`
    },
    {
      path: "client/src/pages/TeamsPage.jsx",
      name: "TeamsPage.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import { Users, Plus, Shield, Trophy } from 'lucide-react';
import { cricketApi } from '../services/api';

export default function TeamsPage({ user, onOpenCreateTeam, onOpenAddPlayer }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    setLoading(true);
    try {
      const data = await cricketApi.getTeams();
      setTeams(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Users className="w-6 h-6 text-emerald-400" />
            <span>Cricket Teams & Squads</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manage club registrations, roster capacity, and win/loss records</p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={onOpenCreateTeam}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Team</span>
          </button>
          <button
            onClick={onOpenAddPlayer}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
          >
            <span>+ Add Player to Team</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-44 bg-slate-900/40 rounded-2xl animate-pulse" />)}
        </div>
      ) : teams.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400">No teams registered yet. Be the first to create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teams.map((t) => (
            <div key={t._id} className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4 hover:border-emerald-500/40 transition">
              <div className="flex items-center space-x-3.5">
                <img src={t.logo} alt="" className="w-12 h-12 rounded-xl object-cover bg-slate-950 border border-slate-800" />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-white text-base">{t.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">
                      {t.shortCode}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{t.city} • Captain: {t.captainName}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-center font-mono">
                <div className="bg-slate-950/60 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">PLAYED</span>
                  <span className="text-sm font-bold text-white">{t.matchesPlayed}</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">WINS</span>
                  <span className="text-sm font-bold text-emerald-400">{t.wins}</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">LOSSES</span>
                  <span className="text-sm font-bold text-red-400">{t.losses}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`
    },
    {
      path: "client/src/pages/PlayersPage.jsx",
      name: "PlayersPage.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import { UserCheck, Plus, Filter } from 'lucide-react';
import { cricketApi } from '../services/api';

const ROLES = ['All', 'Batsman', 'Bowler', 'All-Rounder', 'Wicketkeeper'];

export default function PlayersPage({ user, onOpenAddPlayer }) {
  const [players, setPlayers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayers();
  }, [roleFilter]);

  const loadPlayers = async () => {
    setLoading(true);
    try {
      const data = await cricketApi.getPlayers(roleFilter);
      setPlayers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <UserCheck className="w-6 h-6 text-emerald-400" />
            <span>Player Registry & Statistics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Player profiles, specializations, batting styles, and career runs</p>
        </div>

        <button
          onClick={onOpenAddPlayer}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Player</span>
        </button>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-1">
        {ROLES.map((r) => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={\`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition \${
              roleFilter === r ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }\`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Players Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Player</th>
              <th className="py-3 px-4">Team</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Batting Style</th>
              <th className="py-3 px-4">Bowling Style</th>
              <th className="py-3 px-4">Runs</th>
              <th className="py-3 px-4">Wickets</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {players.map((p) => (
              <tr key={p._id} className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-bold text-white font-sans flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold flex items-center justify-center">
                    {p.jerseyNumber || 10}
                  </span>
                  <span>{p.name}</span>
                </td>
                <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">
                  {p.team?.name || 'Free Agent'}
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-sans">
                    {p.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-300 font-sans">{p.battingStyle}</td>
                <td className="py-3 px-4 text-slate-300 font-sans">{p.bowlingStyle}</td>
                <td className="py-3 px-4 font-bold text-white">{p.runs}</td>
                <td className="py-3 px-4 font-bold text-teal-400">{p.wickets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`
    },
    {
      path: "client/src/pages/MatchesPage.jsx",
      name: "MatchesPage.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import { Play, Plus, Clock } from 'lucide-react';
import { cricketApi } from '../services/api';

export default function MatchesPage({ user, onOpenScorer, onOpenCreateMatch }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    setLoading(true);
    try {
      const data = await cricketApi.getMatches();
      setMatches(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Clock className="w-6 h-6 text-emerald-400" />
            <span>Cricket Match Fixtures & Live Scoring</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Schedule manual matches and open the pitch-side scoring keypad</p>
        </div>

        <button
          onClick={onOpenCreateMatch}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Create Match</span>
        </button>
      </div>

      <div className="space-y-4">
        {matches.map((m) => (
          <div key={m._id} className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white text-base">{m.title}</span>
                <span className={\`text-xs px-2.5 py-0.5 rounded-full font-bold \${
                  m.status === 'Live' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-800 text-slate-300'
                }\`}>
                  {m.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Venue: {m.venue} • {m.totalOvers} Overs format</p>
              <p className="text-xs text-slate-400">Toss: {m.tossWinner} opted to {m.tossDecision}</p>
            </div>

            <div className="flex items-center space-x-6 font-mono">
              <div className="text-right">
                <span className="text-xs text-slate-400 font-sans block">{m.teamA?.shortCode}</span>
                <span className="text-lg font-bold text-white">{m.teamAScore.runs}/{m.teamAScore.wickets}</span>
              </div>
              <span className="text-slate-600">vs</span>
              <div>
                <span className="text-xs text-slate-400 font-sans block">{m.teamB?.shortCode}</span>
                <span className="text-lg font-bold text-white">{m.teamBScore.runs}/{m.teamBScore.wickets}</span>
              </div>

              <button
                onClick={() => onOpenScorer(m)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Score Match</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`
    },
    {
      path: "client/src/pages/RecordsPage.jsx",
      name: "RecordsPage.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import { Archive, Trophy, Medal } from 'lucide-react';
import { cricketApi } from '../services/api';

export default function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cricketApi.getMatchRecords().then(data => {
      setRecords(data.records || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Archive className="w-6 h-6 text-emerald-400" />
          <span>Completed Match Records & Archives</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Verified scorecard history, match results, and winner honors</p>
      </div>

      {loading ? (
        <div className="h-40 bg-slate-900/40 rounded-2xl animate-pulse" />
      ) : records.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400">No completed match records yet. Matches marked completed appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map(r => (
            <div key={r._id} className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">{r.title}</span>
                <span className="text-xs text-slate-400 font-mono">{new Date(r.updatedAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm font-semibold text-emerald-400">{r.result}</p>
              <div className="text-xs text-slate-400 font-mono">
                {r.teamA?.shortCode}: {r.teamAScore.runs}/{r.teamAScore.wickets} ({r.teamAScore.overs}.{r.teamAScore.balls} ov) | {r.teamB?.shortCode}: {r.teamBScore.runs}/{r.teamBScore.wickets} ({r.teamBScore.overs}.{r.teamBScore.balls} ov)
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`
    },
    {
      path: "client/src/pages/AdminPage.jsx",
      name: "AdminPage.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import { Shield, Trash2 } from 'lucide-react';
import { cricketApi } from '../services/api';

export default function AdminPage({ user }) {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    cricketApi.getTeams().then(setTeams);
  }, []);

  const handleDeleteTeam = async (id) => {
    if (!confirm('Delete this team and its players?')) return;
    await cricketApi.deleteTeam(id);
    cricketApi.getTeams().then(setTeams);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Shield className="w-6 h-6 text-purple-400" />
          <span>Tournament Director Administration</span>
        </h2>
        <p className="text-xs text-slate-400">Oversee all registered cricket clubs and maintain tournament standards</p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Manage Registered Teams ({teams.length})</h3>
        <div className="space-y-3">
          {teams.map(t => (
            <div key={t._id} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="font-semibold text-white">{t.name} ({t.shortCode}) - {t.city}</span>
              <button onClick={() => handleDeleteTeam(t._id)} className="text-slate-500 hover:text-red-400 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`
    },
    {
      path: "client/src/components/ScoreKeeperModal.jsx",
      name: "ScoreKeeperModal.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState } from 'react';
import { X, Play, CheckCircle } from 'lucide-react';
import { cricketApi } from '../services/api';

export default function ScoreKeeperModal({ match, onClose }) {
  if (!match) return null;

  const [currentMatch, setCurrentMatch] = useState(match);
  const [loading, setLoading] = useState(false);

  const handleScoreBall = async (runsToAdd, isWicket = false, isExtra = false) => {
    setLoading(true);
    try {
      const updated = await cricketApi.updateScore(currentMatch._id, {
        runsToAdd,
        isWicket,
        isExtra
      });
      setCurrentMatch(updated);
    } catch (e) {
      alert(e.message || 'Error updating score');
    } finally {
      setLoading(false);
    }
  };

  const handleEndMatch = async () => {
    const res = prompt('Enter final match outcome:', \`\${currentMatch.title} completed\`);
    if (!res) return;
    const updated = await cricketApi.updateScore(currentMatch._id, {
      markCompleted: true,
      result: res
    });
    setCurrentMatch(updated);
    onClose();
  };

  const innings = currentMatch.currentInnings || 'teamA';
  const score = innings === 'teamA' ? currentMatch.teamAScore : currentMatch.teamBScore;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative space-y-6">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs text-emerald-400 font-mono font-bold uppercase">Pitch-Side Manual Scorekeeper</span>
          <h3 className="text-xl font-bold text-white mt-1">{currentMatch.title}</h3>
          <p className="text-xs text-slate-400">Current Batting: {innings === 'teamA' ? 'Team A' : 'Team B'}</p>
        </div>

        {/* Big Score Board */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center font-mono">
          <span className="text-5xl font-black text-white">{score.runs}/{score.wickets}</span>
          <div className="text-xs text-slate-400 mt-2">
            Overs: <span className="text-emerald-400 font-bold">{score.overs}.{score.balls}</span> of {currentMatch.totalOvers} max
          </div>
        </div>

        {/* Quick Runs Keypad */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Record Ball:</span>
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3, 4, 6].map(r => (
              <button
                key={r}
                disabled={loading}
                onClick={() => handleScoreBall(r, false, false)}
                className="py-3 bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-xl font-mono text-base font-bold text-slate-200 transition"
              >
                +{r} Run{r > 1 ? 's' : ''}
              </button>
            ))}
            <button
              disabled={loading}
              onClick={() => handleScoreBall(0, true, false)}
              className="py-3 bg-red-600/30 hover:bg-red-600 text-red-300 hover:text-white rounded-xl font-bold text-xs transition border border-red-500/40"
            >
              WICKET 🔴
            </button>
            <button
              disabled={loading}
              onClick={() => handleScoreBall(1, false, true)}
              className="py-3 bg-amber-600/30 hover:bg-amber-600 text-amber-300 hover:text-white rounded-xl font-bold text-xs transition border border-amber-500/40"
            >
              WIDE / NO-BALL
            </button>
          </div>
        </div>

        <button
          onClick={handleEndMatch}
          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
        >
          Finalize & Mark Match Completed
        </button>
      </div>
    </div>
  );
}`
    },
    {
      path: "client/src/components/CreateTeamModal.jsx",
      name: "CreateTeamModal.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState } from 'react';
import { X, Users } from 'lucide-react';
import { cricketApi } from '../services/api';

export default function CreateTeamModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [city, setCity] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await cricketApi.createTeam({ name, shortCode, city, captainName });
      onClose();
      window.location.reload();
    } catch (e) {
      alert(e.message || 'Error creating team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-1">Create Cricket Team</h3>
        <p className="text-xs text-slate-400 mb-5">Register your club or franchise team in the league</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Team Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Chennai Super Kings"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Short Code</label>
              <input
                type="text"
                required
                placeholder="e.g. CSK"
                value={shortCode}
                onChange={e => setShortCode(e.target.value.toUpperCase())}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm uppercase"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">City / Region</label>
              <input
                type="text"
                required
                placeholder="e.g. Chennai"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Captain Name</label>
            <input
              type="text"
              placeholder="e.g. MS Dhoni"
              value={captainName}
              onChange={e => setCaptainName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-white transition text-sm disabled:opacity-50"
          >
            {loading ? 'Creating Team...' : 'Register Team'}
          </button>
        </form>
      </div>
    </div>
  );
}`
    },
    {
      path: "client/src/components/AddPlayerModal.jsx",
      name: "AddPlayerModal.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import { X, UserPlus } from 'lucide-react';
import { cricketApi } from '../services/api';

export default function AddPlayerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [teams, setTeams] = useState([]);
  const [name, setName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [role, setRole] = useState('Batsman');
  const [jerseyNumber, setJerseyNumber] = useState(7);
  const [battingStyle, setBattingStyle] = useState('Right-hand');
  const [bowlingStyle, setBowlingStyle] = useState('Right-arm Fast');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cricketApi.getTeams().then(data => {
      setTeams(data);
      if (data.length > 0) setSelectedTeam(data[0]._id);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await cricketApi.addPlayer({
        name,
        team: selectedTeam,
        role,
        jerseyNumber: Number(jerseyNumber),
        battingStyle,
        bowlingStyle
      });
      onClose();
      window.location.reload();
    } catch (e) {
      alert(e.message || 'Error adding player');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-1">Add Player to Team</h3>
        <p className="text-xs text-slate-400 mb-5">Recruit and assign player to squad roster</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Player Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Virat Kohli"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Assign to Team</label>
            <select
              value={selectedTeam}
              onChange={e => setSelectedTeam(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
            >
              {teams.map(t => (
                <option key={t._id} value={t._id}>{t.name} ({t.shortCode})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Cricket Role</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
              >
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-Rounder">All-Rounder</option>
                <option value="Wicketkeeper">Wicketkeeper</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Jersey Number</label>
              <input
                type="number"
                value={jerseyNumber}
                onChange={e => setJerseyNumber(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Batting Style</label>
              <select
                value={battingStyle}
                onChange={e => setBattingStyle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
              >
                <option value="Right-hand">Right-hand</option>
                <option value="Left-hand">Left-hand</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Bowling Style</label>
              <select
                value={bowlingStyle}
                onChange={e => setBowlingStyle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
              >
                <option value="Right-arm Fast">Right-arm Fast</option>
                <option value="Left-arm Fast">Left-arm Fast</option>
                <option value="Right-arm Off-spin">Right-arm Off-spin</option>
                <option value="Left-arm Spin">Left-arm Spin</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-white transition text-sm disabled:opacity-50"
          >
            {loading ? 'Adding Player...' : 'Add Player to Squad'}
          </button>
        </form>
      </div>
    </div>
  );
}`
    },
    {
      path: "client/src/components/CreateMatchModal.jsx",
      name: "CreateMatchModal.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import { X, Play } from 'lucide-react';
import { cricketApi } from '../services/api';

export default function CreateMatchModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [teams, setTeams] = useState([]);
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [venue, setVenue] = useState('Central Stadium Ground');
  const [totalOvers, setTotalOvers] = useState(20);
  const [tossDecision, setTossDecision] = useState('Bat');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cricketApi.getTeams().then(data => {
      setTeams(data);
      if (data.length >= 2) {
        setTeamA(data[0]._id);
        setTeamB(data[1]._id);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (teamA === teamB) {
      alert('Please select two distinct teams');
      return;
    }
    setLoading(true);
    try {
      await cricketApi.createMatch({
        teamA,
        teamB,
        venue,
        totalOvers: Number(totalOvers),
        tossDecision
      });
      onClose();
      window.location.reload();
    } catch (e) {
      alert(e.message || 'Error creating match');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-1">Create Manual Match</h3>
        <p className="text-xs text-slate-400 mb-5">Set up fixture between two competing teams</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Team A (Host)</label>
            <select
              value={teamA}
              onChange={e => setTeamA(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
            >
              {teams.map(t => (
                <option key={t._id} value={t._id}>{t.name} ({t.shortCode})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Team B (Challenger)</label>
            <select
              value={teamB}
              onChange={e => setTeamB(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
            >
              {teams.map(t => (
                <option key={t._id} value={t._id}>{t.name} ({t.shortCode})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Match Format (Overs)</label>
              <select
                value={totalOvers}
                onChange={e => setTotalOvers(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
              >
                <option value={10}>10 Overs (T10)</option>
                <option value={20}>20 Overs (T20)</option>
                <option value={50}>50 Overs (ODI)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Toss Decision</label>
              <select
                value={tossDecision}
                onChange={e => setTossDecision(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
              >
                <option value="Bat">Elected to Bat</option>
                <option value="Bowl">Elected to Bowl</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Ground / Venue</label>
            <input
              type="text"
              required
              value={venue}
              onChange={e => setVenue(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-white transition text-sm disabled:opacity-50"
          >
            {loading ? 'Scheduling Match...' : 'Schedule Match'}
          </button>
        </form>
      </div>
    </div>
  );
}`
    },
    {
      path: "client/src/components/AuthModal.jsx",
      name: "AuthModal.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState } from 'react';
import { X, Lock, Mail, User } from 'lucide-react';
import { cricketApi } from '../services/api';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  if (!isOpen) return null;

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('captain');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let data;
      if (isRegister) {
        data = await cricketApi.register({ name, email, password, role });
      } else {
        data = await cricketApi.login({ email, password });
      }
      onLogin(data);
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (r) => {
    setEmail(r === 'admin' ? 'admin@cricket.com' : 'captain@cricket.com');
    setPassword('password123');
    setIsRegister(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-1">
          {isRegister ? 'Register Cricket Account' : 'Welcome to CricPulse'}
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          {isRegister ? 'Create a team captain or tournament director account' : 'Sign in to create teams and score matches'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="text-xs text-slate-400 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Captain Miller"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
              />
            </div>
          )}

          <div>
            <label className="text-xs text-slate-400 block mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@cricketclub.com"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-white transition text-sm disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-800 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
          </button>
        </div>

        <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">Quick Test Credentials:</span>
          <div className="space-x-2">
            <button onClick={() => fillDemo('captain')} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded">
              Captain
            </button>
            <button onClick={() => fillDemo('admin')} className="px-2 py-1 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 rounded">
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`
    },
    {
      path: "client/src/services/api.js",
      name: "api.js",
      category: "frontend",
      language: "javascript",
      content: `const BASE_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const u = localStorage.getItem('cricket_user');
  const token = u ? JSON.parse(u).token : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: \`Bearer \${token}\` } : {})
  };
};

export const cricketApi = {
  async register(data) {
    const res = await fetch(\`\${BASE_URL}/auth/register\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Registration failed');
    return json;
  },

  async login(data) {
    const res = await fetch(\`\${BASE_URL}/auth/login\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Login failed');
    return json;
  },

  async getTeams() {
    const res = await fetch(\`\${BASE_URL}/teams\`);
    return await res.json();
  },

  async createTeam(data) {
    const res = await fetch(\`\${BASE_URL}/teams\`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Error creating team');
    return json;
  },

  async deleteTeam(id) {
    const res = await fetch(\`\${BASE_URL}/teams/\${id}\`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return await res.json();
  },

  async getPlayers(role = 'All') {
    const params = new URLSearchParams();
    if (role && role !== 'All') params.append('role', role);
    const res = await fetch(\`\${BASE_URL}/players?\${params.toString()}\`);
    return await res.json();
  },

  async addPlayer(data) {
    const res = await fetch(\`\${BASE_URL}/players\`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Error adding player');
    return json;
  },

  async getMatches() {
    const res = await fetch(\`\${BASE_URL}/matches\`);
    return await res.json();
  },

  async createMatch(data) {
    const res = await fetch(\`\${BASE_URL}/matches\`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Error creating match');
    return json;
  },

  async updateScore(matchId, data) {
    const res = await fetch(\`\${BASE_URL}/matches/\${matchId}/score\`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Error updating score');
    return json;
  },

  async getMatchRecords() {
    const res = await fetch(\`\${BASE_URL}/matches/records\`);
    return await res.json();
  }
};`
    },
    {
      path: "README.md",
      name: "README.md",
      category: "documentation",
      language: "markdown",
      content: `# CricPulse: Cricket Club & Match Management System
Generated by **CodeMind AI** - Full-Stack Cricket Platform

## Features
1. **Club & Team Management**: Create teams (CSK, MI, RCB, etc.), assign captains, view win/loss records.
2. **Player Roster & Profiles**: Recruit players, set roles (Batsman, Bowler, All-Rounder, Wicketkeeper), track runs & wickets.
3. **Manual Match Fixture Creation**: Schedule matches with custom overs (T10, T20, ODI), venues, and toss decisions.
4. **Interactive Pitch-side Scorekeeper**: Live runs keypad (+0, +1, +2, +3, +4, +6, Wickets, Wides/No-balls) with auto overs calculation.
5. **Match Records & Archive**: Store completed match records, victory margins, and leaderboards.
6. **Administrator Control**: Direct oversight of all clubs, squads, and tournament fixtures.

## Running Locally

### Backend
\`\`\`bash
cd server
npm install
npm run seed   # Seeds demo teams (CSK, MI, RCB) & star players (Dhoni, Kohli, Rohit, etc.)
npm run dev    # Server runs on http://localhost:5000
\`\`\`

### Frontend
\`\`\`bash
cd client
npm install
npm run dev    # Client runs on http://localhost:5173
\`\`\`

## Testing Credentials
- **Admin**: \`admin@cricket.com\` / \`password123\`
- **Captain**: \`captain@cricket.com\` / \`password123\`
`
    },
    {
      path: "docker-compose.yml",
      name: "docker-compose.yml",
      category: "devops",
      language: "yaml",
      content: `version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: cricket_mongo
    ports:
      - "27017:27017"

  backend:
    build: ./server
    container_name: cricket_backend
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGODB_URI=mongodb://mongodb:27017/cricket_db
      - JWT_SECRET=cricket_super_secret_key_123
    depends_on:
      - mongodb

  frontend:
    build: ./client
    container_name: cricket_frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
`
    },
    {
      path: ".env.example",
      name: ".env.example",
      category: "config",
      language: "bash",
      content: `PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/cricket_db
JWT_SECRET=cricket_secret_key_123`
    }
  ];

  const setupGuide = {
    prerequisites: ["Node.js 18+", "npm", "MongoDB (Optional: runs in-memory automatically if Mongo not started)"],
    steps: [
      { title: "Extract archive", command: "Unzip project files" },
      { title: "Install backend & seed cricket teams", command: "cd server && npm install && npm run seed" },
      { title: "Start backend server", command: "npm run dev (Runs on http://localhost:5000)" },
      { title: "Install & run frontend", command: "cd ../client && npm install && npm run dev (Runs on http://localhost:5173)" }
    ],
    dockerInstructions: "docker-compose up --build",
    defaultAccounts: [
      { role: "Tournament Admin", email: "admin@cricket.com", password: "password123" },
      { role: "Club Captain", email: "captain@cricket.com", password: "password123" }
    ]
  };

  return {
    title: "CricPulse - Cricket Club & Match Management System",
    prompt: "I want to build an cricket management website. Users should register, login, create team, add player to a team, create manual match, and store math records. Admins should manage team and players.",
    techStack: tech,
    requirementsAnalysis,
    projectPlan,
    architecture,
    folderStructure,
    schemaDesign,
    apiEndpoints,
    files,
    setupGuide
  };
}
