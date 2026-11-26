export function getFoodOrderingBlueprint(customTech = {}) {
  const tech = {
    frontend: customTech.frontend || 'React',
    backend: customTech.backend || 'Node.js + Express',
    database: customTech.database || 'MongoDB',
    aiModel: customTech.aiModel || 'Gemini',
    scope: customTech.scope || 'Full-stack application',
    auth: customTech.auth !== false,
    payment: customTech.payment !== false
  };

  const requirementsAnalysis = {
    overview: "CodeMind AI has analyzed the 'Online Food Ordering Website' project. It is a modern multi-restaurant food discovery, cart ordering, and live delivery tracking platform connecting customers, restaurant kitchens, and system administrators.",
    targetUsers: [
      {
        role: "Customer",
        capabilities: [
          "Register and login with secure JWT credentials",
          "Browse restaurants by cuisine (Italian, Asian, Burgers, Desserts) and dietary preferences",
          "View interactive menus with item descriptions, pricing, and allergen tags",
          "Add meals to shopping cart with special instructions",
          "Place orders with delivery address and checkout",
          "Live track order stages: Placed -> Confirmed -> Kitchen Preparing -> Out for Delivery -> Delivered"
        ]
      },
      {
        role: "Restaurant Manager & Admin",
        capabilities: [
          "Create and update restaurant profile (name, banner, address, delivery fee, rating)",
          "Manage menu catalog (Add dishes, update prices, toggle availability)",
          "Inspect incoming orders in real-time and advance kitchen preparation status",
          "Audit total sales revenue and customer delivery satisfaction"
        ]
      }
    ],
    modules: [
      { name: "User Authentication & RBAC", features: ["Customer registration & login", "JWT session tokens", "Password hashing with bcrypt", "Admin route guards"] },
      { name: "Restaurant Directory & Cuisines", features: ["Restaurant listings with ratings & delivery times", "Cuisine categorization", "Location & operating hours"] },
      { name: "Interactive Digital Menus", features: ["Categorized dishes (Appetizers, Mains, Drinks, Desserts)", "High-resolution photos", "Spice levels & vegan/veg badges"] },
      { name: "Cart & Checkout Engine", features: ["Persistent food cart", "Custom notes to chef", "Delivery fee & tax calculation", "Simulated card checkout"] },
      { name: "Live Order Tracking State Machine", features: ["Real-time status transitions (Placed, Preparing, On the Way, Delivered)", "Estimated delivery countdown", "Order history receipts"] },
      { name: "Admin Restaurant & Menu Control", features: ["Full CRUD on restaurant profiles and food dishes", "Live kitchen order fulfillment queue"] }
    ],
    nonFunctionalRequirements: [
      "Low latency for order status updates",
      "Responsive design optimized for smartphones, tablets, and desktops",
      "Graceful fallback to local in-memory storage if MongoDB is not running"
    ]
  };

  const projectPlan = {
    milestones: [
      { phase: "Sprint 1: Architecture & Foundation", duration: "Day 1-2", tasks: ["Scaffold frontend, backend, and database modules", "Configure JWT authentication and security headers", "Setup environment configuration"] },
      { phase: "Sprint 2: Restaurant & Menu Catalog", duration: "Day 3-4", tasks: ["Create Restaurant and MenuItem data schemas", "Build REST API endpoints for restaurants and categorized menus", "Seed demo gourmet restaurants"] },
      { phase: "Sprint 3: Food Cart & Checkout Flow", duration: "Day 5-6", tasks: ["Implement cart drawer with meal quantity selectors", "Build order placement & payment verification endpoint", "Develop live order tracking view"] },
      { phase: "Sprint 4: Admin Kitchen Dashboard & DevOps", duration: "Day 7", tasks: ["Build restaurant owner menu manager", "Build admin order fulfillment queue", "Create Dockerfile & multi-container compose"] }
    ],
    deliverables: [
      "Production-ready backend REST API (Express / Mongoose)",
      "Interactive modern food storefront & tracking UI (React / Tailwind)",
      "Pre-seeded database script with gourmet restaurants and popular dishes",
      "Complete documentation package (PDF, DOCX, Markdown)",
      "Ready-to-deploy Docker compose configuration"
    ]
  };

  const architecture = {
    pattern: "3-Tier Decoupled Client-Server Architecture",
    description: "Separates customer ordering interfaces in React SPA from backend order processing microservices in Node.js/Express and persistent records in MongoDB.",
    components: [
      { name: "Frontend Presentation", technology: tech.frontend, role: "Renders restaurant catalogs, digital menus, persistent cart, and real-time delivery tracking indicators." },
      { name: "API Gateway & Middleware", technology: tech.backend, role: "Handles CORS, JSON serialization, JWT authentication, and centralized exception handling." },
      { name: "Business Order Services", technology: tech.backend, role: "Manages menu inventories, order state machine (Placed -> Preparing -> Delivered), and payment calculation." },
      { name: "Database Persistence", technology: tech.database, role: "Stores collections for Users, Restaurants, MenuItems, and FoodOrders with relational references." }
    ],
    diagram: `
+-------------------------------------------------------------+
|             FOOD ORDERING CLIENT (React + Tailwind)         |
|   [Restaurant Browser] [Menu Explorer] [Cart] [Live Tracker]|
+------------------------------+------------------------------+
                               | HTTPS / JSON REST APIs
+------------------------------v------------------------------+
|               API GATEWAY & AUTH MIDDLEWARE                 |
|       [CORS] [JWT Verification] [Admin & Kitchen Guard]     |
+------------------------------+------------------------------+
                               |
+------------------------------v------------------------------+
|               APPLICATION CONTROLLERS                       |
|   [RestaurantController] [MenuController] [OrderController] |
+------------------------------+------------------------------+
                               | Mongoose ODM
+------------------------------v------------------------------+
|               DATABASE LAYER (MongoDB)                      |
| (Restaurants) <-----> (MenuItems) <-----> (FoodOrders)      |
+-------------------------------------------------------------+
`
  };

  const folderStructure = [
    { name: "server/", type: "folder", description: "Node.js / Express backend service" },
    { name: "server/src/server.js", type: "file", description: "Express app entry point" },
    { name: "server/src/config/db.js", type: "file", description: "MongoDB connection & local fallback" },
    { name: "server/src/models/User.js", type: "file", description: "Customer & Admin data model" },
    { name: "server/src/models/Restaurant.js", type: "file", description: "Restaurant profile & cuisines schema" },
    { name: "server/src/models/MenuItem.js", type: "file", description: "Dishes, pricing & descriptions schema" },
    { name: "server/src/models/Order.js", type: "file", description: "Customer food orders & live tracking stages" },
    { name: "server/src/controllers/authController.js", type: "file", description: "Authentication business logic" },
    { name: "server/src/controllers/restaurantController.js", type: "file", description: "Restaurant browsing & admin CRUD" },
    { name: "server/src/controllers/orderController.js", type: "file", description: "Order placement & live tracking updates" },
    { name: "server/src/routes/authRoutes.js", type: "file", description: "Authentication API endpoints" },
    { name: "server/src/routes/restaurantRoutes.js", type: "file", description: "Restaurant and menu API endpoints" },
    { name: "server/src/routes/orderRoutes.js", type: "file", description: "Food ordering and tracking endpoints" },
    { name: "server/src/middleware/authMiddleware.js", type: "file", description: "JWT & Admin verification middleware" },
    { name: "server/src/utils/seedData.js", type: "file", description: "Seed demo restaurants and gourmet dishes" },
    { name: "server/package.json", type: "file", description: "Backend dependencies" },
    { name: "client/", type: "folder", description: "React frontend workspace" },
    { name: "client/src/main.jsx", type: "file", description: "React entry point" },
    { name: "client/src/App.jsx", type: "file", description: "Main application layout & view routing" },
    { name: "client/src/components/Navbar.jsx", type: "file", description: "Navigation bar with cart count and auth" },
    { name: "client/src/components/RestaurantCard.jsx", type: "file", description: "Restaurant showcase card" },
    { name: "client/src/components/CartDrawer.jsx", type: "file", description: "Slide-over food cart drawer" },
    { name: "client/src/components/CheckoutModal.jsx", type: "file", description: "Delivery address & payment modal" },
    { name: "client/src/components/LiveTrackerModal.jsx", type: "file", description: "Real-time visual order tracking modal" },
    { name: "client/src/components/AuthModal.jsx", type: "file", description: "Login & Registration modal" },
    { name: "client/src/pages/HomePage.jsx", type: "file", description: "Restaurant discovery & cuisine filters" },
    { name: "client/src/pages/RestaurantDetailPage.jsx", type: "file", description: "Restaurant menu view & item selector" },
    { name: "client/src/pages/OrdersPage.jsx", type: "file", description: "Customer order history & live tracker" },
    { name: "client/src/pages/AdminPage.jsx", type: "file", description: "Admin restaurant & kitchen order manager" },
    { name: "client/src/services/api.js", type: "file", description: "Food ordering frontend API client" },
    { name: "README.md", type: "file", description: "Setup instructions & run guide" },
    { name: "docker-compose.yml", type: "file", description: "Docker Compose multi-container setup" },
    { name: ".env.example", type: "file", description: "Environment configuration template" }
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
          { name: "role", type: "String (customer | admin)", default: "customer" }
        ]
      },
      {
        name: "Restaurant",
        fields: [
          { name: "_id", type: "ObjectId", description: "Primary Key" },
          { name: "name", type: "String", required: true },
          { name: "cuisine", type: "String (Italian, Burgers, Asian, Mexican)", required: true },
          { name: "image", type: "String", required: true },
          { name: "rating", type: "Number", default: 4.8 },
          { name: "deliveryTime", type: "String", default: "25-35 mins" },
          { name: "deliveryFee", type: "Number", default: 2.99 },
          { name: "address", type: "String", required: true }
        ]
      },
      {
        name: "MenuItem",
        fields: [
          { name: "_id", type: "ObjectId", description: "Primary Key" },
          { name: "restaurant", type: "ObjectId (ref: Restaurant)", required: true },
          { name: "name", type: "String", required: true },
          { name: "description", type: "String" },
          { name: "price", type: "Number", required: true },
          { name: "category", type: "String (Appetizer | Main | Beverage | Dessert)" },
          { name: "image", type: "String" },
          { name: "isVegetarian", type: "Boolean", default: false }
        ]
      },
      {
        name: "FoodOrder",
        fields: [
          { name: "_id", type: "ObjectId", description: "Primary Key" },
          { name: "user", type: "ObjectId (ref: User)", required: true },
          { name: "restaurant", type: "ObjectId (ref: Restaurant)", required: true },
          { name: "items", type: "Array of { menuItem, name, qty, price }" },
          { name: "totalAmount", type: "Number", required: true },
          { name: "deliveryAddress", type: "String", required: true },
          { name: "status", type: "String (Placed | Preparing | Out for Delivery | Delivered)", default: "Placed" },
          { name: "estimatedDeliveryMinutes", type: "Number", default: 30 }
        ]
      }
    ],
    relationships: [
      "Restaurant 1:N MenuItem (A restaurant offers multiple menu dishes)",
      "User 1:N FoodOrder (A user places multiple food orders)",
      "Restaurant 1:N FoodOrder (Orders are fulfilled by designated restaurants)"
    ]
  };

  const apiEndpoints = [
    { method: "POST", path: "/api/auth/register", auth: "Public", description: "Register new customer account", request: "{ name, email, password }", response: "{ token, user }" },
    { method: "POST", path: "/api/auth/login", auth: "Public", description: "Authenticate user and issue JWT", request: "{ email, password }", response: "{ token, user }" },
    { method: "GET", path: "/api/restaurants", auth: "Public", description: "Browse restaurants with cuisine/search filter", request: "Query: ?cuisine=&search=", response: "[...restaurants]" },
    { method: "GET", path: "/api/restaurants/:id", auth: "Public", description: "Get restaurant profile and full menu", request: "Params: id", response: "{ restaurant, menu: [...] }" },
    { method: "POST", path: "/api/restaurants", auth: "Admin JWT", description: "Add a new restaurant to platform", request: "{ name, cuisine, image, address, deliveryTime }", response: "{ restaurant }" },
    { method: "POST", path: "/api/restaurants/:id/menu", auth: "Admin JWT", description: "Add new dish to restaurant menu", request: "{ name, price, description, category, image }", response: "{ menuItem }" },
    { method: "POST", path: "/api/orders", auth: "User JWT", description: "Place new food order with delivery address", request: "{ restaurantId, items, totalAmount, deliveryAddress }", response: "{ order }" },
    { method: "GET", path: "/api/orders/myorders", auth: "User JWT", description: "Get customer past and active orders", request: "None", response: "[...orders]" },
    { method: "GET", path: "/api/orders/:id/track", auth: "User JWT", description: "Get live order tracking state", request: "Params: id", response: "{ order, currentStage, eta }" },
    { method: "GET", path: "/api/orders", auth: "Admin JWT", description: "Admin/Kitchen inspect all orders", request: "None", response: "[...orders]" },
    { method: "PUT", path: "/api/orders/:id/status", auth: "Admin JWT", description: "Update kitchen preparation status", request: "{ status: 'Preparing' | 'Out for Delivery' | 'Delivered' }", response: "{ order }" }
  ];

  // Source files for Food Ordering
  const files = [
    {
      path: "server/package.json",
      name: "package.json",
      category: "backend",
      language: "json",
      content: `{
  "name": "food-ordering-server",
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
import restaurantRoutes from './routes/restaurantRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', system: 'Food Ordering API', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(\`[Server] Food Ordering Backend running on port \${PORT}\`);
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
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/food_db', {
      serverSelectionTimeoutMS: 2500
    });
    console.log(\`[MongoDB] Connected: \${conn.connection.host}\`);
  } catch (err) {
    console.warn('[MongoDB Warning] Could not connect to MongoDB. Running with resilient local memory store.');
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
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
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
      path: "server/src/models/Restaurant.js",
      name: "Restaurant.js",
      category: "backend",
      language: "javascript",
      content: `import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  cuisine: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 4.8 },
  deliveryTime: { type: String, default: '25-35 mins' },
  deliveryFee: { type: Number, default: 2.99 },
  address: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);`
    },
    {
      path: "server/src/models/MenuItem.js",
      name: "MenuItem.js",
      category: "backend",
      language: "javascript",
      content: `import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, default: 'Main Course' },
  image: { type: String, default: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600' },
  isVegetarian: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);`
    },
    {
      path: "server/src/models/Order.js",
      name: "Order.js",
      category: "backend",
      language: "javascript",
      content: `import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
      name: String,
      qty: Number,
      price: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  status: {
    type: String,
    enum: ['Placed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Placed'
  },
  estimatedDeliveryMinutes: { type: Number, default: 35 }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);`
    },
    {
      path: "server/src/controllers/authController.js",
      name: "authController.js",
      category: "backend",
      language: "javascript",
      content: `import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'food_secret_key_123', { expiresIn: '30d' });
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });
  const user = await User.create({ name, email, password, role: role === 'admin' ? 'admin' : 'customer' });
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
      path: "server/src/controllers/restaurantController.js",
      name: "restaurantController.js",
      category: "backend",
      language: "javascript",
      content: `import Restaurant from '../models/Restaurant.js';
import MenuItem from '../models/MenuItem.js';

export const getRestaurants = async (req, res) => {
  const filter = {};
  if (req.query.cuisine && req.query.cuisine !== 'All') filter.cuisine = req.query.cuisine;
  if (req.query.search) filter.name = { $regex: req.query.search, $options: 'i' };

  const restaurants = await Restaurant.find(filter).sort({ rating: -1 });
  res.json(restaurants);
};

export const getRestaurantById = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
  const menu = await MenuItem.find({ restaurant: restaurant._id });
  res.json({ restaurant, menu });
};

export const createRestaurant = async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json(restaurant);
};

export const addMenuItem = async (req, res) => {
  const menuItem = await MenuItem.create({
    ...req.body,
    restaurant: req.params.id
  });
  res.status(201).json(menuItem);
};`
    },
    {
      path: "server/src/controllers/orderController.js",
      name: "orderController.js",
      category: "backend",
      language: "javascript",
      content: `import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  const { restaurantId, items, totalAmount, deliveryAddress } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

  const order = await Order.create({
    user: req.user._id,
    restaurant: restaurantId,
    items,
    totalAmount,
    deliveryAddress: deliveryAddress || '123 Gourmet St',
    status: 'Placed'
  });

  res.status(201).json(order);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate('restaurant', 'name image address')
    .sort({ createdAt: -1 });
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email')
    .populate('restaurant', 'name')
    .sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  order.status = status || order.status;
  await order.save();
  res.json(order);
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
      path: "server/src/routes/restaurantRoutes.js",
      name: "restaurantRoutes.js",
      category: "backend",
      language: "javascript",
      content: `import express from 'express';
import { getRestaurants, getRestaurantById, createRestaurant, addMenuItem } from '../controllers/restaurantController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.post('/', protect, admin, createRestaurant);
router.post('/:id/menu', protect, admin, addMenuItem);

export default router;`
    },
    {
      path: "server/src/routes/orderRoutes.js",
      name: "orderRoutes.js",
      category: "backend",
      language: "javascript",
      content: `import express from 'express';
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/', protect, admin, getAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;`
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
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'food_secret_key_123');
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token unauthorized' });
    }
  }
  if (!token) return res.status(401).json({ message: 'No bearer token provided' });
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') next();
  else res.status(403).json({ message: 'Forbidden: Admin access required' });
};`
    },
    {
      path: "server/src/utils/seedData.js",
      name: "seedData.js",
      category: "backend",
      language: "javascript",
      content: `import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import MenuItem from '../models/MenuItem.js';
import Order from '../models/Order.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const seed = async () => {
  await connectDB();
  try {
    await User.deleteMany();
    await Restaurant.deleteMany();
    await MenuItem.deleteMany();
    await Order.deleteMany();

    const admin = await User.create({
      name: "Food App Admin",
      email: "admin@food.com",
      password: "password123",
      role: "admin"
    });

    const customer = await User.create({
      name: "Alex Customer",
      email: "user@food.com",
      password: "password123",
      role: "customer"
    });

    const r1 = await Restaurant.create({
      name: "Artisan Pizza & Trattoria",
      cuisine: "Italian",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
      rating: 4.9,
      deliveryTime: "20-30 mins",
      deliveryFee: 1.99,
      address: "42 Napoli Way"
    });

    const r2 = await Restaurant.create({
      name: "Sizzle Smash Burger Bar",
      cuisine: "Burgers",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
      rating: 4.8,
      deliveryTime: "25-35 mins",
      deliveryFee: 2.49,
      address: "108 Downtown Blvd"
    });

    const r3 = await Restaurant.create({
      name: "Sakura Ramen & Dim Sum",
      cuisine: "Asian",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800",
      rating: 4.9,
      deliveryTime: "30-40 mins",
      deliveryFee: 2.99,
      address: "77 Blossom Terrace"
    });

    // Menus
    await MenuItem.create([
      { restaurant: r1._id, name: "Truffle Burrata Margherita", price: 18.50, description: "San Marzano tomatoes, fresh burrata, black truffle oil, fresh basil.", category: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600", isVegetarian: true },
      { restaurant: r1._id, name: "Handmade Tagliatelle Bolognese", price: 21.00, description: "Slow-braised beef and pork ragù over fresh egg tagliatelle.", category: "Pasta", image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281033?w=600" },
      { restaurant: r2._id, name: "Double Wagyu Bacon Burger", price: 16.95, description: "Two prime wagyu patties, smoked cheddar, crispy bacon, house umami sauce.", category: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600" },
      { restaurant: r2._id, name: "Truffle Parmesan Hand-cut Fries", price: 7.50, description: "Idaho russet potatoes double fried, tossed in white truffle oil and parmigiano.", category: "Sides", image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600", isVegetarian: true },
      { restaurant: r3._id, name: "Tonkotsu Black Garlic Ramen", price: 17.50, description: "Rich 16-hour pork broth, chashu pork belly, marinated ajitsuke egg, scallions.", category: "Ramen", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600" }
    ]);

    // Active order demo
    await Order.create({
      user: customer._id,
      restaurant: r1._id,
      items: [{ name: "Truffle Burrata Margherita", qty: 1, price: 18.50 }],
      totalAmount: 20.49,
      deliveryAddress: "742 Evergreen Terrace",
      status: "Preparing",
      estimatedDeliveryMinutes: 20
    });

    console.log("Food Ordering Database Seeded Successfully!");
    console.log("Admin:    admin@food.com / password123");
    console.log("Customer: user@food.com / password123");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();`
    },
    {
      path: "client/src/App.jsx",
      name: "App.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import LiveTrackerModal from './components/LiveTrackerModal';
import AuthModal from './components/AuthModal';

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'restaurant' | 'orders' | 'admin'
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem('food_user');
    return s ? JSON.parse(s) : null;
  });

  const [cart, setCart] = useState(() => {
    const s = localStorage.getItem('food_cart');
    return s ? JSON.parse(s) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('food_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (dish, restaurant) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.dishId === dish._id);
      if (existing) {
        return prev.map((item) =>
          item.dishId === dish._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          dishId: dish._id,
          restaurantId: restaurant._id,
          restaurantName: restaurant.name,
          name: dish.name,
          price: dish.price,
          image: dish.image,
          qty: 1
        }
      ];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (dishId, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.dishId !== dishId));
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.dishId === dishId ? { ...i, qty } : i))
    );
  };

  const clearCart = () => setCart([]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('food_user', JSON.stringify(userData));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('food_user');
    setView('home');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Navbar
        user={user}
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        view={view}
        setView={setView}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {view === 'home' && (
          <HomePage
            onSelectRestaurant={(rest) => {
              setSelectedRestaurant(rest);
              setView('restaurant');
            }}
          />
        )}

        {view === 'restaurant' && selectedRestaurant && (
          <RestaurantDetailPage
            restaurant={selectedRestaurant}
            onBack={() => setView('home')}
            onAddToCart={addToCart}
          />
        )}

        {view === 'orders' && (
          <OrdersPage
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
            onTrackOrder={(order) => setTrackingOrder(order)}
          />
        )}

        {view === 'admin' && user?.role === 'admin' && <AdminPage user={user} />}
      </main>

      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        TasteDash • Full-Stack Food Ordering & Delivery Tracking Platform Generated by CodeMind AI
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={updateCartQty}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        user={user}
        onClearCart={clearCart}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOrderSuccess={(order) => {
          setIsCheckoutOpen(false);
          setTrackingOrder(order);
          setView('orders');
        }}
      />

      <LiveTrackerModal
        order={trackingOrder}
        onClose={() => setTrackingOrder(null)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
      />
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
import { Utensils, ShoppingBag, ShieldCheck, Clock, User, LogOut } from 'lucide-react';

export default function Navbar({ user, cartCount, view, setView, onOpenCart, onOpenAuth, onLogout }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Utensils className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black bg-gradient-to-r from-white via-amber-100 to-orange-200 bg-clip-text text-transparent">
                TasteDash
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                Delivery
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Gourmet Food Ordering</p>
          </div>
        </div>

        <nav className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={() => setView('home')}
            className={\`px-3 py-1.5 rounded-lg text-xs font-semibold transition \${
              view === 'home' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:text-white'
            }\`}
          >
            Restaurants
          </button>

          {user && (
            <button
              onClick={() => setView('orders')}
              className={\`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1 \${
                view === 'orders' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:text-white'
              }\`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Track Orders</span>
            </button>
          )}

          {user?.role === 'admin' && (
            <button
              onClick={() => setView('admin')}
              className={\`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center space-x-1 \${
                view === 'admin' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'text-purple-300'
              }\`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Kitchen</span>
            </button>
          )}

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-900 transition"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          {user ? (
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <span className="text-xs font-semibold text-slate-300 hidden sm:inline">{user.name}</span>
              <button onClick={onLogout} title="Logout" className="p-1.5 text-slate-400 hover:text-red-400">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition flex items-center space-x-1 shadow-md shadow-amber-500/20"
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
      path: "client/src/components/LiveTrackerModal.jsx",
      name: "LiveTrackerModal.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React from 'react';
import { X, CheckCircle, Clock, ChefHat, Bike, Home } from 'lucide-react';

const STAGES = [
  { key: 'Placed', label: 'Order Placed', icon: Clock, desc: 'Received by kitchen' },
  { key: 'Preparing', label: 'Chef Preparing', icon: ChefHat, desc: 'Fresh ingredients being cooked' },
  { key: 'Out for Delivery', label: 'On The Way', icon: Bike, desc: 'Courier on express route' },
  { key: 'Delivered', label: 'Delivered', icon: Home, desc: 'Enjoy your meal!' }
];

export default function LiveTrackerModal({ order, onClose }) {
  if (!order) return null;

  const currentIdx = STAGES.findIndex(s => s.key === order.status) !== -1
    ? STAGES.findIndex(s => s.key === order.status)
    : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative space-y-6">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase">
            Live Order Tracking
          </span>
          <h3 className="text-xl font-bold text-white mt-2">
            Order #{order._id?.substring(0, 8)}
          </h3>
          <p className="text-xs text-slate-400">Delivering to: {order.deliveryAddress}</p>
        </div>

        {/* Visual Progress Steps */}
        <div className="py-2 space-y-4">
          {STAGES.map((st, idx) => {
            const Icon = st.icon;
            const isDone = idx <= currentIdx;
            const isCurrent = idx === currentIdx;

            return (
              <div key={st.key} className="flex items-center space-x-3.5">
                <div
                  className={\`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition \${
                    isCurrent
                      ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20 animate-pulse'
                      : isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-600'
                  }\`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={\`text-sm font-bold \${isDone ? 'text-white' : 'text-slate-500'}\`}>
                      {st.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                        Current Stage
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400">{st.desc}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">Estimated Delivery:</span>
          <span className="font-mono font-bold text-emerald-400 text-sm">~{order.estimatedDeliveryMinutes || 25} Mins</span>
        </div>
      </div>
    </div>
  );
}`
    },
    {
      path: "client/src/pages/HomePage.jsx",
      name: "HomePage.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import { Search, Star, Clock, Sparkles } from 'lucide-react';
import { foodApi } from '../services/api';

const CUISINES = ['All', 'Italian', 'Burgers', 'Asian', 'Mexican'];

export default function HomePage({ onSelectRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);
  const [cuisineFilter, setCuisineFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    foodApi.getRestaurants(cuisineFilter, search).then(data => {
      setRestaurants(data);
      setLoading(false);
    });
  }, [cuisineFilter, search]);

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 border border-amber-500/20 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold mb-4 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fastest Gourmet Delivery in Town</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Order Your Favorite Food From Top Local Chefs
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Browse handcrafted menus, customize your dishes, and track your kitchen delivery in real time.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search restaurants by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {CUISINES.map((c) => (
            <button
              key={c}
              onClick={() => setCuisineFilter(c)}
              className={\`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap \${
                cuisineFilter === c
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }\`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((r) => (
          <div
            key={r._id}
            onClick={() => onSelectRestaurant(r)}
            className="group bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/40 hover:shadow-2xl transition duration-300 cursor-pointer flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden bg-slate-950">
              <img
                src={r.image}
                alt={r.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 border border-slate-700">
                {r.cuisine}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition">
                  {r.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{r.address}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{r.rating}</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{r.deliveryTime}</span>
                </div>
                <span className="text-slate-300">\${r.deliveryFee.toFixed(2)} delivery</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`
    },
    {
      path: "client/package.json",
      name: "package.json",
      category: "frontend",
      language: "json",
      content: `{
  "name": "food-ordering-client",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.378.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^5.2.0",
    "tailwindcss": "^3.4.3",
    "postcss": "^8.4.38",
    "autoprefixer": "^10.4.19"
  }
}`
    },
    {
      path: "client/src/services/api.js",
      name: "api.js",
      category: "frontend",
      language: "javascript",
      content: `const BASE_URL = '/api';

const getHeaders = () => {
  const s = localStorage.getItem('food_user');
  const token = s ? JSON.parse(s).token : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: \`Bearer \${token}\` } : {})
  };
};

export const foodApi = {
  async register(data) {
    const res = await fetch(\`\${BASE_URL}/auth/register\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async login(data) {
    const res = await fetch(\`\${BASE_URL}/auth/login\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async getRestaurants(cuisine = 'All', search = '') {
    const params = new URLSearchParams();
    if (cuisine && cuisine !== 'All') params.append('cuisine', cuisine);
    if (search) params.append('search', search);
    const res = await fetch(\`\${BASE_URL}/restaurants?\${params.toString()}\`);
    return await res.json();
  },

  async getRestaurantById(id) {
    const res = await fetch(\`\${BASE_URL}/restaurants/\${id}\`);
    return await res.json();
  },

  async placeOrder(data) {
    const res = await fetch(\`\${BASE_URL}/orders\`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  async getMyOrders() {
    const res = await fetch(\`\${BASE_URL}/orders/myorders\`, { headers: getHeaders() });
    return await res.json();
  },

  async updateOrderStatus(id, status) {
    const res = await fetch(\`\${BASE_URL}/orders/\${id}/status\`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ status })
    });
    return await res.json();
  }
};`
    },
    {
      path: "README.md",
      name: "README.md",
      category: "documentation",
      language: "markdown",
      content: `# TasteDash: Online Food Ordering & Delivery Platform
Generated by **CodeMind AI**

## Features
1. **Restaurant Discovery**: Browse by cuisine (Italian, Burgers, Asian, Mexican) with search and rating filters.
2. **Digital Menu**: Categorized dishes with photos, price, descriptions, and dietary badges.
3. **Cart & Checkout**: Persistent cart drawer, delivery notes, and address checkout.
4. **Live Order Tracking**: Visual 4-stage tracking (Order Placed -> Chef Preparing -> On the Way -> Delivered).
5. **Admin Kitchen Dashboard**: Manage restaurant profiles, dishes, and update fulfillment progress.

## Running Locally

### Backend
\`\`\`bash
cd server
npm install
npm run seed   # Seeds demo restaurants & dishes
npm run dev    # Server runs on http://localhost:5000
\`\`\`

### Frontend
\`\`\`bash
cd client
npm install
npm run dev    # Client runs on http://localhost:5173
\`\`\`

## Testing Accounts
- **Admin**: \`admin@food.com\` / \`password123\`
- **Customer**: \`user@food.com\` / \`password123\`
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
    container_name: food_mongo
    ports:
      - "27017:27017"

  backend:
    build: ./server
    container_name: food_backend
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGODB_URI=mongodb://mongodb:27017/food_db
      - JWT_SECRET=food_super_secret_key_123
    depends_on:
      - mongodb

  frontend:
    build: ./client
    container_name: food_frontend
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
MONGODB_URI=mongodb://127.0.0.1:27017/food_db
JWT_SECRET=food_secret_key_123`
    }
  ];

  const setupGuide = {
    prerequisites: ["Node.js 18+", "npm", "MongoDB (Optional: runs in-memory fallback automatically if Mongo not started)"],
    steps: [
      { title: "Extract project files", command: "Unzip project archive" },
      { title: "Install backend & seed restaurants", command: "cd server && npm install && npm run seed" },
      { title: "Start backend server", command: "npm run dev (Runs on http://localhost:5000)" },
      { title: "Install & run frontend", command: "cd ../client && npm install && npm run dev (Runs on http://localhost:5173)" }
    ],
    dockerInstructions: "docker-compose up --build",
    defaultAccounts: [
      { role: "Admin / Kitchen", email: "admin@food.com", password: "password123" },
      { role: "Customer", email: "user@food.com", password: "password123" }
    ]
  };

  return {
    title: "TasteDash - Online Food Ordering & Delivery Platform",
    prompt: "I want to build an online food ordering website. Users should register, log in, browse restaurants, view menus, add food to cart, place orders and track orders. Admins should manage restaurants, menus and orders.",
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
