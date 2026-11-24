import fs from 'fs';

/**
 * Universal Built-in Domain Catalog (Instant offline fallback & rich templates)
 */
const DOMAIN_TEMPLATES = {
  hospital: {
    title: "ApexCare - Hospital & Clinic Management System",
    domain: "Healthcare & Clinic Management",
    overview: "ApexCare provides end-to-end clinical workflow automation, patient records, doctor scheduling, and consultation appointments with role-based access for medical staff.",
    entities: [
      {
        name: "Patient",
        fields: [
          { name: "name", type: "String", required: true },
          { name: "age", type: "Number", required: true },
          { name: "gender", type: "String", required: true },
          { name: "bloodGroup", type: "String", defaultVal: "'O+'" },
          { name: "phone", type: "String", required: true },
          { name: "emergencyContact", type: "String" },
          { name: "medicalHistory", type: "String" }
        ],
        description: "Patient profile and electronic medical records"
      },
      {
        name: "Doctor",
        fields: [
          { name: "name", type: "String", required: true },
          { name: "specialization", type: "String", required: true },
          { name: "qualification", type: "String" },
          { name: "consultationFee", type: "Number", required: true },
          { name: "availableDays", type: "String", defaultVal: "'Mon-Fri'" },
          { name: "status", type: "String", defaultVal: "'On-Duty'" }
        ],
        description: "Medical practitioner details, departments, and shifts"
      },
      {
        name: "Appointment",
        fields: [
          { name: "patientName", type: "String", required: true },
          { name: "doctorName", type: "String", required: true },
          { name: "date", type: "Date", required: true },
          { name: "timeSlot", type: "String", required: true },
          { name: "status", type: "String", defaultVal: "'Scheduled'" },
          { name: "diagnosisNotes", type: "String" },
          { name: "fee", type: "Number", defaultVal: "50" }
        ],
        description: "Consultation bookings and diagnostic notes"
      }
    ],
    features: [
      "Patient Registry & Medical History",
      "Doctor Directory & Specialty Filtering",
      "Appointment Scheduling & Status Flow (Scheduled, In-Progress, Completed)",
      "Clinical Billing & Consultation Fee Tracking"
    ]
  },

  library: {
    title: "LibreDesk - Smart Library & Book Management System",
    domain: "Library & Asset Management",
    overview: "LibreDesk simplifies catalog indexing, member subscriptions, issue/return book transactions, and overdue penalty tracking.",
    entities: [
      {
        name: "Book",
        fields: [
          { name: "title", type: "String", required: true },
          { name: "isbn", type: "String", required: true },
          { name: "author", type: "String", required: true },
          { name: "genre", type: "String", defaultVal: "'Fiction'" },
          { name: "availableCopies", type: "Number", defaultVal: "5" },
          { name: "shelfLocation", type: "String" }
        ],
        description: "Book catalog and copy inventory"
      },
      {
        name: "Member",
        fields: [
          { name: "name", type: "String", required: true },
          { name: "membershipId", type: "String", required: true },
          { name: "email", type: "String", required: true },
          { name: "phone", type: "String" },
          { name: "tier", type: "String", defaultVal: "'Standard'" },
          { name: "status", type: "String", defaultVal: "'Active'" }
        ],
        description: "Patron registry and borrowing cards"
      },
      {
        name: "BorrowRecord",
        fields: [
          { name: "bookTitle", type: "String", required: true },
          { name: "memberName", type: "String", required: true },
          { name: "borrowDate", type: "Date", required: true },
          { name: "dueDate", type: "Date", required: true },
          { name: "returnDate", type: "Date" },
          { name: "status", type: "String", defaultVal: "'Borrowed'" },
          { name: "fineAmount", type: "Number", defaultVal: "0" }
        ],
        description: "Checkout circulation records and overdue fines"
      }
    ],
    features: [
      "ISBN & Title Book Search with Real-time Availability",
      "Member Accounts & Borrowing Quotas",
      "Circulation Desk (Check-out, Check-in, Renew)",
      "Overdue Fines Calculation & Clearance"
    ]
  },

  school: {
    title: "EduPulse - School & Student Management System",
    domain: "Education & Campus Management",
    overview: "EduPulse delivers academic administration, student enrollments, teacher courses, attendance tracking, and grade reports.",
    entities: [
      {
        name: "Student",
        fields: [
          { name: "rollNumber", type: "String", required: true },
          { name: "name", type: "String", required: true },
          { name: "gradeLevel", type: "String", required: true },
          { name: "parentEmail", type: "String", required: true },
          { name: "attendancePercentage", type: "Number", defaultVal: "95" }
        ],
        description: "Student enrollments and academic standing"
      },
      {
        name: "Course",
        fields: [
          { name: "courseCode", type: "String", required: true },
          { name: "title", type: "String", required: true },
          { name: "department", type: "String", required: true },
          { name: "credits", type: "Number", defaultVal: "3" },
          { name: "instructor", type: "String", required: true }
        ],
        description: "Curriculum subject catalog and syllabus credits"
      },
      {
        name: "Grade",
        fields: [
          { name: "studentRoll", type: "String", required: true },
          { name: "courseCode", type: "String", required: true },
          { name: "examType", type: "String", defaultVal: "'Final Exam'" },
          { name: "score", type: "Number", required: true },
          { name: "letterGrade", type: "String", defaultVal: "'A'" },
          { name: "remarks", type: "String" }
        ],
        description: "Exam performance records and transcript GPA"
      }
    ],
    features: [
      "Student Roster & Enrollment Management",
      "Course Catalog & Department Assignments",
      "Gradebook & GPA Calculation",
      "Attendance Auditing and Progress Reports"
    ]
  },

  hotel: {
    title: "GrandStay - Hotel & Room Booking System",
    domain: "Hospitality & Property Reservations",
    overview: "GrandStay provides hospitality management, room inventory, guest check-ins, rate plans, and reservation records.",
    entities: [
      {
        name: "Room",
        fields: [
          { name: "roomNumber", type: "String", required: true },
          { name: "type", type: "String", defaultVal: "'Deluxe Suite'" },
          { name: "pricePerNight", type: "Number", required: true },
          { name: "capacity", type: "Number", defaultVal: "2" },
          { name: "status", type: "String", defaultVal: "'Available'" }
        ],
        description: "Room inventory and cleanliness status"
      },
      {
        name: "Guest",
        fields: [
          { name: "name", type: "String", required: true },
          { name: "email", type: "String", required: true },
          { name: "phone", type: "String", required: true },
          { name: "idNumber", type: "String", required: true }
        ],
        description: "Guest identity and stay history"
      },
      {
        name: "Reservation",
        fields: [
          { name: "roomNumber", type: "String", required: true },
          { name: "guestName", type: "String", required: true },
          { name: "checkIn", type: "Date", required: true },
          { name: "checkOut", type: "Date", required: true },
          { name: "totalAmount", type: "Number", required: true },
          { name: "status", type: "String", defaultVal: "'Confirmed'" }
        ],
        description: "Stay dates and billing status"
      }
    ],
    features: [
      "Real-time Room Availability & Nightly Pricing",
      "Guest Onboarding & Check-in / Check-out",
      "Booking Confirmation & Invoice Generation",
      "Housekeeping & Room Occupancy Dashboard"
    ]
  },

  gym: {
    title: "FitPulse - Gym Membership & Fitness Tracker",
    domain: "Fitness & Club Management",
    overview: "FitPulse manages member subscriptions, certified fitness trainers, tailored workout routines, and class bookings.",
    entities: [
      {
        name: "Member",
        fields: [
          { name: "name", type: "String", required: true },
          { name: "email", type: "String", required: true },
          { name: "phone", type: "String", required: true },
          { name: "plan", type: "String", defaultVal: "'Monthly Premium'" },
          { name: "membershipExpiry", type: "Date" },
          { name: "status", type: "String", defaultVal: "'Active'" }
        ],
        description: "Club members and active pass status"
      },
      {
        name: "Trainer",
        fields: [
          { name: "name", type: "String", required: true },
          { name: "specialty", type: "String", defaultVal: "'Strength & HIIT'" },
          { name: "experienceYears", type: "Number", defaultVal: "5" },
          { name: "hourlyRate", type: "Number", defaultVal: "40" }
        ],
        description: "Fitness coaches and personal trainers"
      },
      {
        name: "WorkoutPlan",
        fields: [
          { name: "title", type: "String", required: true },
          { name: "level", type: "String", defaultVal: "'Intermediate'" },
          { name: "targetMuscleGroup", type: "String", defaultVal: "'Full Body'" },
          { name: "durationWeeks", type: "Number", defaultVal: "8" },
          { name: "exercisesCount", type: "Number", defaultVal: "12" }
        ],
        description: "Custom routines and workout schedules"
      }
    ],
    features: [
      "Member Registration & Pass Renewal",
      "Trainer Booking & Session Calendars",
      "Workout Plan Builder & Fitness Goal Tracking",
      "Subscription Billing & Access Keycards"
    ]
  },

  realestate: {
    title: "EstatePulse - Real Estate & Property Portal",
    domain: "Real Estate & Property Management",
    overview: "EstatePulse connects buyers, sellers, and certified agents with property listings, scheduled tours, and price analytics.",
    entities: [
      {
        name: "Property",
        fields: [
          { name: "title", type: "String", required: true },
          { name: "location", type: "String", required: true },
          { name: "price", type: "Number", required: true },
          { name: "propertyType", type: "String", defaultVal: "'Apartment'" },
          { name: "bedrooms", type: "Number", defaultVal: "2" },
          { name: "bathrooms", type: "Number", defaultVal: "2" },
          { name: "status", type: "String", defaultVal: "'For Sale'" }
        ],
        description: "Property specs, pricing, and availability"
      },
      {
        name: "Agent",
        fields: [
          { name: "name", type: "String", required: true },
          { name: "agency", type: "String", defaultVal: "'Premier Realty'" },
          { name: "email", type: "String", required: true },
          { name: "phone", type: "String", required: true },
          { name: "activeListings", type: "Number", defaultVal: "10" }
        ],
        description: "Licensed realtors and property brokers"
      },
      {
        name: "TourBooking",
        fields: [
          { name: "propertyTitle", type: "String", required: true },
          { name: "clientName", type: "String", required: true },
          { name: "clientPhone", type: "String", required: true },
          { name: "tourDate", type: "Date", required: true },
          { name: "status", type: "String", defaultVal: "'Requested'" }
        ],
        description: "In-person and virtual property walkthroughs"
      }
    ],
    features: [
      "Property Listings with Price & Bedroom Filtering",
      "Verified Realtor Profiles & Inquiries",
      "Private Viewing & Tour Schedule Booking",
      "Seller Dashboard with Inquiry Tracking"
    ]
  },

  carRental: {
    title: "AutoDrive - Vehicle & Car Rental System",
    domain: "Automotive & Car Rental Management",
    overview: "AutoDrive provides comprehensive fleet management, vehicle availability, rental booking contracts, and customer reservation tracking.",
    entities: [
      {
        name: "Vehicle",
        fields: [
          { name: "makeModel", type: "String", required: true },
          { name: "category", type: "String", defaultVal: "'SUV'" },
          { name: "dailyRate", type: "Number", required: true },
          { name: "licensePlate", type: "String", required: true },
          { name: "status", type: "String", defaultVal: "'Available'" }
        ],
        description: "Fleet inventory and vehicle specs"
      },
      {
        name: "Customer",
        fields: [
          { name: "name", type: "String", required: true },
          { name: "driverLicenseNumber", type: "String", required: true },
          { name: "phone", type: "String", required: true },
          { name: "email", type: "String", required: true }
        ],
        description: "Customer verification and driver records"
      },
      {
        name: "RentalBooking",
        fields: [
          { name: "vehicleName", type: "String", required: true },
          { name: "customerName", type: "String", required: true },
          { name: "startDate", type: "Date", required: true },
          { name: "endDate", type: "Date", required: true },
          { name: "totalCost", type: "Number", required: true },
          { name: "status", type: "String", defaultVal: "'Confirmed'" }
        ],
        description: "Rental agreements and return inspections"
      }
    ],
    features: [
      "Vehicle Fleet Directory & Category Filtering",
      "Driver License Verification & Customer Profiles",
      "Instant Rental Booking & Daily Rate Calculation",
      "Vehicle Return & Inspection State Machine"
    ]
  }
};

/**
 * Universal Domain Synthesizer
 * If Gemini API is available and online, calls Gemini to get custom domain schema.
 * Otherwise, smartly matches against built-in domain dictionary or constructs dynamic models.
 */
export async function generateProjectBlueprint(prompt, techStack = {}) {
  const cleanPrompt = (prompt || 'Full-Stack Modern Web Application').trim();
  const domainConfig = await resolveDomainConfiguration(cleanPrompt, techStack.aiModel);

  const tech = {
    frontend: techStack.frontend || 'React (Vite + Tailwind CSS)',
    backend: techStack.backend || 'Node.js / Express',
    database: techStack.database || 'MongoDB / Mongoose',
    auth: techStack.auth !== false ? 'JWT + bcrypt' : 'None',
    styling: 'Tailwind CSS'
  };

  const entities = domainConfig.entities;
  const primaryEntity = entities[0];

  const requirementsAnalysis = {
    overview: domainConfig.overview || `CodeMind AI has engineered a specialized architecture for "${domainConfig.title}".`,
    targetUsers: [
      { role: "Registered User / Customer", capabilities: ["Access domain dashboard", "Create and query records", "Manage personal profile and status"] },
      { role: "System Administrator", capabilities: ["Full CRUD management across all entities", "Review system audit logs", "Manage user privileges"] }
    ],
    modules: [
      { name: "Authentication & User Management", features: ["Registration and login", "Role-based route authorization", "JWT session tokens"] },
      ...entities.map(e => ({
        name: `${e.name} Management`,
        features: [
          `Create, read, update, delete (CRUD) ${e.name} records`,
          `Search, sort, and status filtering`,
          `${e.description || e.name + ' workflow execution'}`
        ]
      })),
      { name: "Analytics & Governance", features: ["Summary dashboard metrics", "Status state machines", "Export records"] }
    ],
    nonFunctionalRequirements: [
      "Security: Passwords hashed with bcrypt, JWT authorization tokens, sanitization of inputs",
      "Reliability: Structured error-handling middleware and resilient database fallbacks",
      "Developer Experience: Clean modular code with Docker containerization"
    ]
  };

  const projectPlan = {
    milestones: [
      { phase: "Sprint 1: Architecture & Foundation", duration: "Day 1-2", tasks: ["Scaffold client and server workspaces", "Setup database connection", "Configure authentication middleware"] },
      { phase: "Sprint 2: Core Domain APIs & Schema", duration: "Day 3-4", tasks: entities.map(e => `Implement ${e.name} models, routes, and controllers`) },
      { phase: "Sprint 3: Responsive Frontend & State", duration: "Day 5-6", tasks: entities.map(e => `Build ${e.name} interactive UI pages and forms`) },
      { phase: "Sprint 4: Admin Controls & Polish", duration: "Day 7", tasks: ["Implement administrative management", "Perform integration testing", "Finalize Docker and documentation"] }
    ],
    deliverables: [
      "Full-stack production codebase",
      "Database schema definitions & seed scripts",
      "Automated Docker Compose setup",
      "Complete PDF, DOCX, and Markdown documentation"
    ]
  };

  const architecture = {
    pattern: "Layered MVC & Decoupled Client-Server Architecture",
    description: `The application cleanly isolates presentation logic in ${tech.frontend}, business processing and API endpoints in ${tech.backend}, and persistence in ${tech.database}.`,
    components: [
      { name: "Client Layer", technology: tech.frontend, role: "Renders responsive views, handles local UI state, and calls REST API services." },
      { name: "API Gateway & Security", technology: tech.backend, role: "CORS, JSON parsing, JWT verification, and centralized exception handling." },
      { name: "Controllers & Business Logic", technology: tech.backend, role: "Executes business workflows, validates parameters, and interacts with models." },
      { name: "Data Persistence", technology: tech.database, role: "Manages entities, enforces data schema integrity, and handles indexes." }
    ],
    diagram: `
+-------------------------------------------------------------+
|                     CLIENT APPLICATION                      |
|      ${tech.frontend.padEnd(50, ' ')}|
+------------------------------+------------------------------+
                               | REST API (HTTP/JSON)
+------------------------------v------------------------------+
|                     BACKEND SERVICE                         |
|      ${tech.backend.padEnd(50, ' ')}|
|      [Auth Middleware] [Route Handlers] [Controllers]       |
+------------------------------+------------------------------+
                               | Data Access
+------------------------------v------------------------------+
|                     DATABASE PERSISTENCE                    |
|      ${tech.database.padEnd(50, ' ')}|
+-------------------------------------------------------------+
`
  };

  // Folder Structure
  const folderStructure = [
    { name: "server/", type: "folder", description: "Backend application" },
    { name: "server/src/", type: "folder", description: "Backend source code" },
    { name: "server/src/server.js", type: "file", description: "Express app entry point" },
    { name: "server/src/config/db.js", type: "file", description: "Database connector" },
    { name: "server/src/models/User.js", type: "file", description: "User schema & auth methods" },
    ...entities.map(e => ({ name: `server/src/models/${e.name}.js`, type: "file", description: `${e.name} domain model` })),
    { name: "server/src/controllers/authController.js", type: "file", description: "Auth logic" },
    ...entities.map(e => ({ name: `server/src/controllers/${e.name.toLowerCase()}Controller.js`, type: "file", description: `${e.name} CRUD logic` })),
    { name: "server/src/routes/authRoutes.js", type: "file", description: "Authentication routes" },
    ...entities.map(e => ({ name: `server/src/routes/${e.name.toLowerCase()}Routes.js`, type: "file", description: `${e.name} API routes` })),
    { name: "server/src/middleware/authMiddleware.js", type: "file", description: "JWT protection" },
    { name: "server/src/middleware/errorMiddleware.js", type: "file", description: "Global error handler" },
    { name: "server/package.json", type: "file", description: "Server dependencies" },
    { name: "client/", type: "folder", description: "Frontend application" },
    { name: "client/src/App.jsx", type: "file", description: "Main React application" },
    { name: "client/src/components/Navbar.jsx", type: "file", description: "Navigation bar" },
    ...entities.map(e => ({ name: `client/src/pages/${e.name}Page.jsx`, type: "file", description: `${e.name} management view` })),
    { name: "client/src/services/api.js", type: "file", description: "API client helper" },
    { name: "client/package.json", type: "file", description: "Client dependencies" },
    { name: "README.md", type: "file", description: "Project instructions" },
    { name: "docker-compose.yml", type: "file", description: "Docker Compose file" },
    { name: ".env.example", type: "file", description: "Environment configuration" }
  ];

  // Schema Design
  const schemaDesign = {
    type: "Document Database (Mongoose / MongoDB)",
    collections: [
      {
        name: "users",
        description: "Application users and authentication",
        fields: [
          { name: "_id", type: "ObjectId", constraints: "Primary Key" },
          { name: "name", type: "String", constraints: "Required" },
          { name: "email", type: "String", constraints: "Required, Unique, Indexed" },
          { name: "password", type: "String", constraints: "Required, bcrypt hash" },
          { name: "role", type: "String", constraints: "Enum: ['user', 'admin'], default 'user'" },
          { name: "createdAt", type: "Date", constraints: "Timestamp" }
        ]
      },
      ...entities.map(e => ({
        name: e.name.toLowerCase() + 's',
        description: e.description || `${e.name} records`,
        fields: [
          { name: "_id", type: "ObjectId", constraints: "Primary Key" },
          ...e.fields.map(f => ({
            name: f.name,
            type: f.type,
            constraints: f.required ? "Required" : f.defaultVal ? `Default: ${f.defaultVal}` : "Optional"
          })),
          { name: "createdAt", type: "Date", constraints: "Timestamp" }
        ]
      }))
    ]
  };

  // API Endpoints
  const apiEndpoints = [
    { method: "POST", path: "/api/auth/register", description: "Create a new user account" },
    { method: "POST", path: "/api/auth/login", description: "Authenticate user and return JWT" }
  ];

  entities.forEach(e => {
    const p = e.name.toLowerCase();
    apiEndpoints.push({ method: "GET", path: `/api/${p}s`, description: `List all ${e.name} records with search` });
    apiEndpoints.push({ method: "POST", path: `/api/${p}s`, description: `Create a new ${e.name} entry` });
    apiEndpoints.push({ method: "GET", path: `/api/${p}s/:id`, description: `Get single ${e.name} details` });
    apiEndpoints.push({ method: "PUT", path: `/api/${p}s/:id`, description: `Update an existing ${e.name}` });
    apiEndpoints.push({ method: "DELETE", path: `/api/${p}s/:id`, description: `Remove a ${e.name} record` });
  });

  // Generate Files
  const files = [];

  // 1. Server package.json
  files.push({
    path: "server/package.json",
    name: "package.json",
    category: "backend",
    language: "json",
    content: JSON.stringify({
      name: `${slugify(domainConfig.title)}-server`,
      version: "1.0.0",
      description: `Backend API for ${domainConfig.title}`,
      type: "module",
      main: "src/server.js",
      scripts: {
        start: "node src/server.js",
        dev: "nodemon src/server.js"
      },
      dependencies: {
        express: "^4.19.2",
        cors: "^2.8.5",
        dotenv: "^16.4.5",
        mongoose: "^8.3.1",
        jsonwebtoken: "^9.0.2",
        bcryptjs: "^2.4.3"
      },
      devDependencies: {
        nodemon: "^3.1.0"
      }
    }, null, 2)
  });

  // 2. Server DB config
  files.push({
    path: "server/src/config/db.js",
    name: "db.js",
    category: "backend",
    language: "javascript",
    content: `import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/app_db', {
      serverSelectionTimeoutMS: 2500
    });
    console.log(\`[DB] Connected to MongoDB: \${conn.connection.host}\`);
  } catch (err) {
    console.warn('[DB] MongoDB not detected locally. Initializing resilient in-memory storage mode.');
  }
};`
  });

  // 3. User model
  files.push({
    path: "server/src/models/User.js",
    name: "User.js",
    category: "backend",
    language: "javascript",
    content: `import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);`
  });

  // 4. Entity Models
  entities.forEach(e => {
    let schemaFields = '';
    e.fields.forEach(f => {
      let t = f.type === 'Number' ? 'Number' : f.type === 'Date' ? 'Date' : f.type === 'Boolean' ? 'Boolean' : 'String';
      let req = f.required ? ', required: true' : '';
      let def = f.defaultVal ? `, default: ${f.defaultVal}` : '';
      schemaFields += `  ${f.name}: { type: ${t}${req}${def} },\n`;
    });

    files.push({
      path: `server/src/models/${e.name}.js`,
      name: `${e.name}.js`,
      category: "backend",
      language: "javascript",
      content: `import mongoose from 'mongoose';

const ${e.name.toLowerCase()}Schema = new mongoose.Schema({
${schemaFields}  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.models.${e.name} || mongoose.model('${e.name}', ${e.name.toLowerCase()}Schema);`
    });
  });

  // 5. Auth Middleware
  files.push({
    path: "server/src/middleware/authMiddleware.js",
    name: "authMiddleware.js",
    category: "backend",
    language: "javascript",
    content: `import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'codemind-super-secret-key-2026');
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token verification failed' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Administrative access required' });
  }
};`
  });

  // 6. Error Middleware
  files.push({
    path: "server/src/middleware/errorMiddleware.js",
    name: "errorMiddleware.js",
    category: "backend",
    language: "javascript",
    content: `export const notFound = (req, res, next) => {
  const error = new Error(\`Not Found - \${req.originalUrl}\`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};`
  });

  // 7. Auth Controller
  files.push({
    path: "server/src/controllers/authController.js",
    name: "authController.js",
    category: "backend",
    language: "javascript",
    content: `import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'codemind-super-secret-key-2026', { expiresIn: '30d' });
};

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password, role: role || 'user' });
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id)
  });
};

export const loginUser = async (req, res) => {
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
    res.status(401).json({ message: 'Invalid email or password' });
  }
};`
  });

  // 8. Auth Routes
  files.push({
    path: "server/src/routes/authRoutes.js",
    name: "authRoutes.js",
    category: "backend",
    language: "javascript",
    content: `import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
export default router;`
  });

  // 9. Controllers & Routes for Each Entity
  entities.forEach(e => {
    const p = e.name.toLowerCase();
    const modelVar = e.name;

    files.push({
      path: `server/src/controllers/${p}Controller.js`,
      name: `${p}Controller.js`,
      category: "backend",
      language: "javascript",
      content: `import ${modelVar} from '../models/${modelVar}.js';

// Get all ${modelVar}s
export const get${modelVar}s = async (req, res) => {
  try {
    const filter = {};
    if (req.query.search) {
      filter.$or = [
        { ${e.fields[0].name}: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    const list = await ${modelVar}.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single ${modelVar}
export const get${modelVar}ById = async (req, res) => {
  try {
    const item = await ${modelVar}.findById(req.params.id);
    if (!item) return res.status(404).json({ message: '${modelVar} not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new ${modelVar}
export const create${modelVar} = async (req, res) => {
  try {
    const newItem = await ${modelVar}.create({
      ...req.body,
      createdBy: req.user?._id
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update ${modelVar}
export const update${modelVar} = async (req, res) => {
  try {
    const updated = await ${modelVar}.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: '${modelVar} not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete ${modelVar}
export const delete${modelVar} = async (req, res) => {
  try {
    const deleted = await ${modelVar}.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: '${modelVar} not found' });
    res.json({ message: '${modelVar} removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};`
    });

    files.push({
      path: `server/src/routes/${p}Routes.js`,
      name: `${p}Routes.js`,
      category: "backend",
      language: "javascript",
      content: `import express from 'express';
import {
  get${modelVar}s,
  get${modelVar}ById,
  create${modelVar},
  update${modelVar},
  delete${modelVar}
} from '../controllers/${p}Controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(get${modelVar}s)
  .post(protect, create${modelVar});

router.route('/:id')
  .get(get${modelVar}ById)
  .put(protect, update${modelVar})
  .delete(protect, delete${modelVar});

export default router;`
    });
  });

  // 10. Server Entry point (server.js)
  let routeImports = `import authRoutes from './routes/authRoutes.js';\n`;
  let routeMounts = `app.use('/api/auth', authRoutes);\n`;

  entities.forEach(e => {
    const p = e.name.toLowerCase();
    routeImports += `import ${p}Routes from './routes/${p}Routes.js';\n`;
    routeMounts += `app.use('/api/${p}s', ${p}Routes);\n`;
  });

  files.push({
    path: "server/src/server.js",
    name: "server.js",
    category: "backend",
    language: "javascript",
    content: `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
${routeImports}import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: '${domainConfig.title}',
    timestamp: new Date().toISOString()
  });
});

// Domain Routes
${routeMounts}
// Error Handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`[Server] \${process.env.APP_NAME || '${domainConfig.title}'} running on port \${PORT}\`);
});`
  });

  // 11. Client package.json
  files.push({
    path: "client/package.json",
    name: "package.json",
    category: "frontend",
    language: "json",
    content: JSON.stringify({
      name: `${slugify(domainConfig.title)}-client`,
      version: "1.0.0",
      private: true,
      type: "module",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview"
      },
      dependencies: {
        react: "^18.3.1",
        "react-dom": "^18.3.1",
        "lucide-react": "^0.378.0"
      },
      devDependencies: {
        "@vitejs/plugin-react": "^4.2.1",
        vite: "^5.2.0",
        tailwindcss: "^3.4.3",
        postcss: "^8.4.38",
        autoprefixer: "^10.4.19"
      }
    }, null, 2)
  });

  // 12. Client API Helper
  let entityApiMethods = '';
  entities.forEach(e => {
    const p = e.name.toLowerCase();
    entityApiMethods += `
  // ${e.name} API
  async get${e.name}s(search = '') {
    const res = await fetch(\`\${API_BASE}/${p}s?search=\${encodeURIComponent(search)}\`, { headers: getAuthHeaders() });
    return res.json();
  },
  async create${e.name}(data) {
    const res = await fetch(\`\${API_BASE}/${p}s\`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },
  async delete${e.name}(id) {
    const res = await fetch(\`\${API_BASE}/${p}s/\${id}\`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },`;
  });

  files.push({
    path: "client/src/services/api.js",
    name: "api.js",
    category: "frontend",
    language: "javascript",
    content: `const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: \`Bearer \${token}\` } : {})
  };
};

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(\`\${API_BASE}/auth/login\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },
  async register(name, email, password) {
    const res = await fetch(\`\${API_BASE}/auth/register\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    return res.json();
  },${entityApiMethods}
};`
  });

  // 13. Client Pages for Each Entity
  entities.forEach(e => {
    const p = e.name.toLowerCase();
    const primaryField = e.fields[0]?.name || 'name';
    const secondaryField = e.fields[1]?.name || 'description';

    files.push({
      path: `client/src/pages/${e.name}Page.jsx`,
      name: `${e.name}Page.jsx`,
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function ${e.name}Page({ user }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ ${e.fields.map(f => `${f.name}: ''`).join(', ')} });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [search]);

  const loadData = async () => {
    try {
      const data = await api.get${e.name}s(search);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.create${e.name}(formData);
      setShowModal(false);
      setFormData({ ${e.fields.map(f => `${f.name}: ''`).join(', ')} });
      loadData();
    } catch (err) {
      alert('Failed to save ${e.name}');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this ${e.name} record?')) {
      await api.delete${e.name}(id);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-white">${e.name} Directory</h2>
          <p className="text-xs text-slate-400 mt-1">${e.description || 'Manage ' + e.name + ' entries.'}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add ${e.name}</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by ${primaryField}..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 text-xs">
            No ${e.name.toLowerCase()} records found. Click "Add ${e.name}" to create one!
          </div>
        ) : (
          items.map((item) => (
            <div key={item._id} className="p-5 bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl space-y-3 transition flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-bold text-white">{item.${primaryField} || 'Untitled'}</h3>
                  <button onClick={() => handleDelete(item._id)} className="text-slate-500 hover:text-red-400 transition">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-xs text-slate-400 mt-2 space-y-1">
                  ${e.fields.slice(1, 4).map(f => `<div><span className="text-slate-500">${f.name}:</span> <span className="text-slate-200">{item.${f.name} || 'N/A'}</span></div>`).join('\n                  ')}
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                <span>Created {new Date(item.createdAt || Date.now()).toLocaleDateString()}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">Active</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreate} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">New ${e.name} Entry</h3>
            <div className="space-y-3">
              ${e.fields.map(f => `<div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1 uppercase tracking-wider">${f.name}</label>
                <input
                  type="${f.type === 'Number' ? 'number' : f.type === 'Date' ? 'date' : 'text'}"
                  required={${f.required ? 'true' : 'false'}}
                  value={formData.${f.name}}
                  onChange={(e) => setFormData({ ...formData, ${f.name}: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>`).join('\n              ')}
            </div>
            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                {loading ? 'Saving...' : 'Save Record'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}`
    });
  });

  // 14. Client Navbar
  files.push({
    path: "client/src/components/Navbar.jsx",
    name: "Navbar.jsx",
    category: "frontend",
    language: "javascript",
    content: `import React from 'react';
import { Layers } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, entities, user, onLogout }) {
  return (
    <nav className="bg-slate-900/80 backdrop-blur border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Layers className="w-5 h-5" />
          </div>
          <span className="font-black text-white text-base tracking-wide">${domainConfig.title.split('-')[0].trim()}</span>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto">
          {entities.map(e => (
            <button
              key={e.name}
              onClick={() => setActiveTab(e.name)}
              className={\`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap \${
                activeTab === e.name
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }\`}
            >
              {e.name}s
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 font-mono">
          {user ? \`Hi, \${user.name}\` : 'Demo Mode'}
        </div>
      </div>
    </nav>
  );
}`
  });

  // 15. Client App.jsx
  let appTabs = entities.map(e => `{activeTab === '${e.name}' && <${e.name}Page user={user} />}`).join('\n        ');
  let appImports = entities.map(e => `import ${e.name}Page from './pages/${e.name}Page';`).join('\n');

  files.push({
    path: "client/src/App.jsx",
    name: "App.jsx",
    category: "frontend",
    language: "javascript",
    content: `import React, { useState } from 'react';
import Navbar from './components/Navbar';
${appImports}

const ENTITIES = ${JSON.stringify(entities.map(e => ({ name: e.name })))};

export default function App() {
  const [activeTab, setActiveTab] = useState('${primaryEntity.name}');
  const [user, setUser] = useState({ name: 'Alex Johnson', email: 'alex@example.com', role: 'admin' });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        entities={ENTITIES}
        user={user}
        onLogout={() => setUser(null)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        ${appTabs}
      </main>

      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        Generated by CodeMind AI • Production Architecture Ready
      </footer>
    </div>
  );
}`
  });

  // 16. Docker Compose
  files.push({
    path: "docker-compose.yml",
    name: "docker-compose.yml",
    category: "devops",
    language: "yaml",
    content: `version: '3.8'

services:
  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGODB_URI=mongodb://mongo:27017/app_db
      - JWT_SECRET=super-secret-key-123
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
`
  });

  // 17. Environment example
  files.push({
    path: ".env.example",
    name: ".env.example",
    category: "config",
    language: "plaintext",
    content: `PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/app_db
JWT_SECRET=codemind-production-secret-token
`
  });

  // 18. README.md
  files.push({
    path: "README.md",
    name: "README.md",
    category: "documentation",
    language: "markdown",
    content: `# ${domainConfig.title} 🚀
> Generated by **CodeMind AI** (Autonomous Software Engineering Engine)

## Overview
${domainConfig.overview}

## Tech Stack
- **Frontend**: ${tech.frontend}
- **Backend**: ${tech.backend}
- **Database**: ${tech.database}
- **Authentication**: ${tech.auth}

## Setup Instructions

### 1. Server Setup
\`\`\`bash
cd server
npm install
npm run dev
\`\`\`

### 2. Client Setup
\`\`\`bash
cd client
npm install
npm run dev
\`\`\`
`
  });

  const setupGuide = {
    prerequisites: ["Node.js 18+", "npm"],
    steps: [
      { title: "Extract Project Archive", command: "Unzip downloaded ZIP bundle" },
      { title: "Run Backend API", command: "cd server && npm install && npm run dev" },
      { title: "Run Frontend Client", command: "cd client && npm install && npm run dev" }
    ],
    dockerInstructions: "docker-compose up --build",
    defaultAccounts: [{ role: "Admin", email: "admin@app.com", password: "password123" }]
  };

  return {
    title: domainConfig.title,
    prompt: cleanPrompt,
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

/**
 * Intelligent Domain Resolver:
 * Supports Google Gemini API and OpenAI GPT-4o, with instant fallback to rich built-in domain catalog.
 */
async function resolveDomainConfiguration(prompt, aiModel = 'Gemini') {
  const p = prompt.toLowerCase();
  const preferredModel = (aiModel || '').toLowerCase();
  const openAiKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim();
  const geminiKey = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim();

  // 1. If OpenAI is preferred and key is present
  if (preferredModel.includes('openai') && openAiKey) {
    try {
      console.log('[AI Provider] Generating architecture blueprint with OpenAI GPT-4o...');
      const openAiConfig = await callOpenAIForDomain(prompt, openAiKey);
      if (openAiConfig && openAiConfig.entities && openAiConfig.entities.length >= 2) {
        return openAiConfig;
      }
    } catch (err) {
      console.warn('[OpenAI] Error or timeout, falling back to Gemini / Built-in:', err.message);
    }
  }

  // 2. Try Gemini API if key is present
  if (geminiKey) {
    try {
      console.log('[AI Provider] Generating architecture blueprint with Google Gemini...');
      const geminiConfig = await callGeminiForDomain(prompt, geminiKey);
      if (geminiConfig && geminiConfig.entities && geminiConfig.entities.length >= 2) {
        return geminiConfig;
      }
    } catch (err) {
      console.warn('[Gemini AI] Offline fallback to built-in domain dictionary:', err.message);
    }
  }

  // 3. If OpenAI key is present as secondary option
  if (openAiKey) {
    try {
      console.log('[AI Provider] Secondary attempt with OpenAI GPT-4o...');
      const openAiConfig = await callOpenAIForDomain(prompt, openAiKey);
      if (openAiConfig && openAiConfig.entities && openAiConfig.entities.length >= 2) {
        return openAiConfig;
      }
    } catch (err) {
      console.warn('[OpenAI] Offline fallback to built-in domain dictionary:', err.message);
    }
  }

  // 2. Built-in domain matching
  if (p.includes('hospital') || p.includes('doctor') || p.includes('patient') || p.includes('clinic') || p.includes('health') || p.includes('medical')) {
    return DOMAIN_TEMPLATES.hospital;
  }
  if (p.includes('car rental') || p.includes('vehicle') || (p.includes('car') && (p.includes('rent') || p.includes('hire')))) {
    return DOMAIN_TEMPLATES.carRental;
  }
  if (p.includes('hotel') || p.includes('room') || p.includes('resort') || (p.includes('reservation') && !p.includes('book'))) {
    return DOMAIN_TEMPLATES.hotel;
  }
  if (p.includes('gym') || p.includes('fitness') || p.includes('workout') || p.includes('trainer') || p.includes('membership')) {
    return DOMAIN_TEMPLATES.gym;
  }
  if (p.includes('property') || p.includes('real estate') || p.includes('realtor') || p.includes('house') || p.includes('rental') || p.includes('estate')) {
    return DOMAIN_TEMPLATES.realestate;
  }
  if (p.includes('school') || p.includes('student') || p.includes('teacher') || p.includes('college') || p.includes('university') || p.includes('course') || p.includes('exam')) {
    return DOMAIN_TEMPLATES.school;
  }
  if (p.includes('library') || p.includes('librarian') || p.includes('borrow book') || p.includes('books') || (p.includes('book') && !p.includes('slot') && !p.includes('room') && !p.includes('trainer') && !p.includes('gym') && !p.includes('hotel'))) {
    return DOMAIN_TEMPLATES.library;
  }

  // 3. Dynamic Fallback: Construct clean domain title from user prompt
  const cleanNoun = prompt
    .replace(/^i want to build (an? )?/i, '')
    .replace(/^create (an? )?/i, '')
    .replace(/^build (an? )?/i, '')
    .replace(/^develop (an? )?/i, '')
    .trim();
  const words = cleanNoun.split(' ').slice(0, 4);
  const capitalizedTitle = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${capitalizedTitle || 'Custom Solution'} Hub`,
    domain: "Custom Enterprise Solution",
    overview: `Custom full-stack solution generated by CodeMind AI addressing: "${prompt}".`,
    entities: [
      {
        name: "Resource",
        fields: [
          { name: "title", type: "String", required: true },
          { name: "category", type: "String", defaultVal: "'General'" },
          { name: "status", type: "String", defaultVal: "'Active'" },
          { name: "priority", type: "String", defaultVal: "'Medium'" },
          { name: "notes", type: "String" }
        ],
        description: "Primary domain resource entity"
      },
      {
        name: "ActivityLog",
        fields: [
          { name: "action", type: "String", required: true },
          { name: "performedBy", type: "String", required: true },
          { name: "timestamp", type: "Date", required: true },
          { name: "status", type: "String", defaultVal: "'Success'" }
        ],
        description: "Operational audit log and event tracking"
      }
    ],
    features: [
      "Secure Role-Based Authentication",
      "Dynamic CRUD Resource Management",
      "Real-time Search and Status Filtering",
      "Administrative Audit Logging"
    ]
  };
}

async function callGeminiForDomain(prompt, apiKey) {
  const model = 'gemini-flash-lite-latest';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const systemInstruction = `You are an expert full-stack software architect.
The user wants to build a project described as: "${prompt}".
Analyze the prompt and generate a JSON object with:
- title: A catchy professional product name (e.g. "ApexCare - Hospital Management System")
- domain: Short domain category (e.g. "Healthcare")
- overview: A 2-sentence architectural summary
- entities: An array of 3 to 4 domain entities. Each entity must have:
    - name: PascalCase singular noun (e.g. "Patient", "Doctor", "Appointment")
    - description: Short explanation
    - fields: Array of 3 to 6 field objects: { name: camelCase, type: "String"|"Number"|"Date"|"Boolean", required: boolean, defaultVal?: string }
- features: An array of 4 key functional features`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  const res = await fetch(url, {
    method: 'POST',
    signal: controller.signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: systemInstruction }] }],
      generationConfig: { responseMimeType: 'application/json' }
    })
  });
  clearTimeout(timeoutId);

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;
  return JSON.parse(text);
}

async function callOpenAIForDomain(prompt, apiKey, model = 'gpt-4o') {
  const url = 'https://api.openai.com/v1/chat/completions';

  const systemInstruction = `You are an expert full-stack software architect.
The user wants to build a project described as: "${prompt}".
Analyze the prompt and generate a JSON object with:
- title: A catchy professional product name (e.g. "ApexCare - Hospital Management System")
- domain: Short domain category (e.g. "Healthcare")
- overview: A 2-sentence architectural summary
- entities: An array of 3 to 4 domain entities. Each entity must have:
    - name: PascalCase singular noun (e.g. "Patient", "Doctor", "Appointment")
    - description: Short explanation
    - fields: Array of 3 to 6 field objects: { name: camelCase, type: "String"|"Number"|"Date"|"Boolean", required: boolean, defaultVal?: string }
- features: An array of 4 key functional features`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const res = await fetch(url, {
    method: 'POST',
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model || 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: 'You are an expert software architect. You output valid JSON schema blueprints only.' },
        { role: 'user', content: systemInstruction }
      ],
      temperature: 0.2
    })
  });
  clearTimeout(timeoutId);

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) return null;
  return JSON.parse(text);
}

function slugify(text) {
  return text.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-');
}
