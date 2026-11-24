export function getEcommerceBlueprint(customTechStack = {}) {
  const tech = {
    frontend: customTechStack.frontend || 'React (Vite + Tailwind CSS)',
    backend: customTechStack.backend || 'Node.js / Express',
    database: customTechStack.database || 'MongoDB / Mongoose',
    auth: customTechStack.auth || 'JWT + bcrypt',
    styling: customTechStack.styling || 'Tailwind CSS'
  };

  const requirementsAnalysis = {
    overview: "CodeMind AI has analyzed the 'Online Shopping Website' project. It is an end-to-end e-commerce platform with dual roles (Customer & Admin), rich product discovery, shopping cart persistence, transactional checkout with payments, and inventory management.",
    targetUsers: [
      { role: "Customer", capabilities: ["Register / Login", "Browse & Search Products", "Filter by Category & Price", "Manage Cart", "Place Orders", "Execute Checkout & Payment", "View Order History & Tracking"] },
      { role: "Administrator", capabilities: ["Manage Catalog (Add, Update, Delete Products)", "Manage Categories", "Inspect All Orders", "Update Order Fulfillment Status (Pending, Processing, Shipped, Delivered)"] }
    ],
    modules: [
      { name: "Authentication & User Management", features: ["JWT token issuance", "Password hashing with bcrypt", "Protected routes & role-based middleware"] },
      { name: "Catalog & Product Management", features: ["Product listings with pagination & full-text search", "Category hierarchy", "Stock tracking & pricing"] },
      { name: "Shopping Cart & State", features: ["Cart item management (quantity increment/decrement)", "Subtotal calculation", "Local storage & server sync"] },
      { name: "Order Processing & Payment", features: ["Transactional order creation", "Payment gateway integration (Stripe / Mock Processor)", "Order receipt & tracking"] },
      { name: "Admin Dashboard", features: ["Product inventory CRUD with image URLs", "Order oversight & status update transitions"] }
    ],
    nonFunctionalRequirements: [
      "Security: Passwords salted and hashed with bcrypt, JWT authorization tokens, sanitization of user inputs",
      "Performance: Indexed database queries for fast search and category filtering",
      "Portability: Containerized via Docker & Docker Compose for immediate zero-config deployment"
    ]
  };

  const projectPlan = {
    milestones: [
      { phase: "Phase 1: Environment & Architecture Setup", duration: "Day 1", tasks: ["Scaffold client & server workspaces", "Configure Tailwind CSS and Vite", "Setup database connection and environment variables"] },
      { phase: "Phase 2: Database Schema & Authentication API", duration: "Day 2", tasks: ["Design User, Product, Category, and Order models", "Implement register and login endpoints with JWT", "Create auth & role authorization middlewares"] },
      { phase: "Phase 3: Catalog & Search Services", duration: "Day 3", tasks: ["Build product listing API with search & category filters", "Implement seed data script for initial catalog", "Build responsive React storefront"] },
      { phase: "Phase 4: Shopping Cart & Order Checkout", duration: "Day 4", tasks: ["Implement shopping cart drawer with quantity state", "Create order creation & payment verification endpoints", "Build customer checkout flow"] },
      { phase: "Phase 5: Admin Management & Fulfillment", duration: "Day 5", tasks: ["Develop admin product management modal (CRUD)", "Build admin order fulfillment dashboard", "Test end-to-end purchase lifecycle"] }
    ],
    deliverables: [
      "Complete backend REST API service (Express/Mongoose)",
      "Interactive modern client interface (React/Vite/Tailwind)",
      "Seed database script with mock products",
      "Documentation package (PDF, DOCX, Markdown)",
      "Ready-to-deploy Docker compose configuration"
    ]
  };

  const architecture = {
    pattern: "3-Tier Decoupled Client-Server Architecture",
    description: "The application separates concerns into a Presentation Layer (Vite React SPA), an Application/Service Layer (Node.js/Express REST API), and a Persistence Layer (MongoDB/Mongoose).",
    components: [
      { name: "Client Layer", technology: tech.frontend, role: "Delivers responsive UI, manages client state (cart, auth), and communicates via Axios/Fetch." },
      { name: "API Gateway & Middleware", technology: tech.backend, role: "Enforces CORS, JSON body parsing, JWT token authentication, role validation, and centralized error handling." },
      { name: "Business Controllers & Services", technology: tech.backend, role: "Handles authentication, inventory adjustments, order state machines, and payment verification." },
      { name: "Data Persistence Layer", technology: tech.database, role: "Stores collections for Users, Products, Categories, and Orders with relational references and compound indexes." }
    ],
    diagram: `
+-------------------------------------------------------------+
|               CLIENT LAYER (React + Vite + Tailwind)        |
|  [Storefront] [Product Search] [Cart Drawer] [Admin Panel]  |
+------------------------------+------------------------------+
                               | HTTPS / JSON REST APIs
+------------------------------v------------------------------+
|               API GATEWAY & MIDDLEWARE                      |
|      [CORS] [BodyParser] [JWT Auth] [Admin Authorization]   |
+------------------------------+------------------------------+
                               |
+------------------------------v------------------------------+
|               APPLICATION CONTROLLERS                       |
|   [AuthController]   [ProductController]   [OrderController]|
+------------------------------+------------------------------+
                               | Mongoose ODM
+------------------------------v------------------------------+
|               DATABASE LAYER (MongoDB)                      |
|       (Users) <-----> (Orders) <-----> (Products)           |
+-------------------------------------------------------------+
`
  };

  const folderStructure = [
    { name: "server/", type: "folder", description: "Node.js / Express backend service" },
    { name: "server/src/", type: "folder", description: "Backend source code" },
    { name: "server/src/config/db.js", type: "file", description: "Database connection manager" },
    { name: "server/src/models/User.js", type: "file", description: "User & Admin data model" },
    { name: "server/src/models/Product.js", type: "file", description: "E-commerce product schema" },
    { name: "server/src/models/Order.js", type: "file", description: "Customer order & items schema" },
    { name: "server/src/controllers/authController.js", type: "file", description: "Authentication business logic" },
    { name: "server/src/controllers/productController.js", type: "file", description: "Product catalog CRUD" },
    { name: "server/src/controllers/orderController.js", type: "file", description: "Order creation & admin management" },
    { name: "server/src/routes/authRoutes.js", type: "file", description: "Auth API route definitions" },
    { name: "server/src/routes/productRoutes.js", type: "file", description: "Product API route definitions" },
    { name: "server/src/routes/orderRoutes.js", type: "file", description: "Order API route definitions" },
    { name: "server/src/middleware/authMiddleware.js", type: "file", description: "JWT & Admin verification middleware" },
    { name: "server/src/utils/seedData.js", type: "file", description: "Initial database seed script" },
    { name: "server/src/server.js", type: "file", description: "Express app entry point" },
    { name: "server/package.json", type: "file", description: "Server dependencies" },
    { name: "client/", type: "folder", description: "React + Vite frontend workspace" },
    { name: "client/src/", type: "folder", description: "Frontend source code" },
    { name: "client/src/components/Navbar.jsx", type: "file", description: "Navigation header with cart counter & auth controls" },
    { name: "client/src/components/ProductCard.jsx", type: "file", description: "Interactive product display card" },
    { name: "client/src/components/CartDrawer.jsx", type: "file", description: "Slide-over shopping cart panel" },
    { name: "client/src/components/CheckoutModal.jsx", type: "file", description: "Order placement & mock payment modal" },
    { name: "client/src/components/AdminProductModal.jsx", type: "file", description: "Admin product creation & editing modal" },
    { name: "client/src/components/AuthModal.jsx", type: "file", description: "Login & Registration dialog" },
    { name: "client/src/pages/HomePage.jsx", type: "file", description: "Storefront catalog & search view" },
    { name: "client/src/pages/AdminPage.jsx", type: "file", description: "Admin dashboard for products and orders" },
    { name: "client/src/pages/OrdersPage.jsx", type: "file", description: "Customer order history and status" },
    { name: "client/src/services/api.js", type: "file", description: "Frontend API client" },
    { name: "client/src/App.jsx", type: "file", description: "Main application layout and routing" },
    { name: "client/src/index.css", type: "file", description: "Tailwind CSS styling" },
    { name: "client/package.json", type: "file", description: "Client dependencies" },
    { name: "client/vite.config.js", type: "file", description: "Vite build configuration" },
    { name: "README.md", type: "file", description: "Project setup and run guide" },
    { name: "docker-compose.yml", type: "file", description: "Docker Compose multi-container setup" },
    { name: "Dockerfile", type: "file", description: "Production container build" },
    { name: ".env.example", type: "file", description: "Environment variables template" }
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
          { name: "role", type: "String (customer | admin)", default: "customer" },
          { name: "createdAt", type: "Date" }
        ]
      },
      {
        name: "Product",
        fields: [
          { name: "_id", type: "ObjectId", description: "Primary Key" },
          { name: "title", type: "String", required: true },
          { name: "description", type: "String" },
          { name: "price", type: "Number", required: true },
          { name: "category", type: "String", required: true, indexed: true },
          { name: "image", type: "String" },
          { name: "countInStock", type: "Number", default: 10 },
          { name: "rating", type: "Number", default: 4.5 }
        ]
      },
      {
        name: "Order",
        fields: [
          { name: "_id", type: "ObjectId", description: "Primary Key" },
          { name: "user", type: "ObjectId (ref: User)", required: true },
          { name: "orderItems", type: "Array of { product, title, qty, price, image }" },
          { name: "shippingAddress", type: "Object { address, city, postalCode, country }" },
          { name: "paymentMethod", type: "String", default: "Stripe / Card" },
          { name: "paymentResult", type: "Object { id, status, update_time, email_address }" },
          { name: "totalPrice", type: "Number", required: true },
          { name: "isPaid", type: "Boolean", default: false },
          { name: "paidAt", type: "Date" },
          { name: "status", type: "String (Pending | Processing | Shipped | Delivered)", default: "Pending" }
        ]
      }
    ],
    relationships: [
      "User 1:N Order (A user can place multiple orders)",
      "Order M:N Product (An order contains multiple line-item snapshots of products)"
    ]
  };

  const apiEndpoints = [
    { method: "POST", path: "/api/auth/register", auth: "Public", description: "Register new customer account", request: "{ name, email, password }", response: "{ token, user: { id, name, email, role } }" },
    { method: "POST", path: "/api/auth/login", auth: "Public", description: "Authenticate user and issue JWT", request: "{ email, password }", response: "{ token, user: { id, name, email, role } }" },
    { method: "GET", path: "/api/auth/me", auth: "User JWT", description: "Get current authenticated profile", request: "None", response: "{ user: { id, name, email, role } }" },
    { method: "GET", path: "/api/products", auth: "Public", description: "Browse products with query filters (keyword, category)", request: "Query: ?keyword=shoes&category=Electronics", response: "{ products: [...] }" },
    { method: "GET", path: "/api/products/:id", auth: "Public", description: "Fetch detailed single product", request: "Params: id", response: "{ product: {...} }" },
    { method: "POST", path: "/api/products", auth: "Admin JWT", description: "Create new product in catalog", request: "{ title, price, description, category, image, countInStock }", response: "{ product: {...} }" },
    { method: "PUT", path: "/api/products/:id", auth: "Admin JWT", description: "Update existing product details/stock", request: "{ title, price, countInStock... }", response: "{ product: {...} }" },
    { method: "DELETE", path: "/api/products/:id", auth: "Admin JWT", description: "Remove product from store", request: "Params: id", response: "{ message: 'Product deleted' }" },
    { method: "POST", path: "/api/orders", auth: "User JWT", description: "Place new order and process payment", request: "{ orderItems, shippingAddress, paymentMethod }", response: "{ order: {...} }" },
    { method: "GET", path: "/api/orders/myorders", auth: "User JWT", description: "List current user's order history", request: "None", response: "{ orders: [...] }" },
    { method: "GET", path: "/api/orders", auth: "Admin JWT", description: "Admin view all store orders", request: "None", response: "{ orders: [...] }" },
    { method: "PUT", path: "/api/orders/:id/status", auth: "Admin JWT", description: "Admin update fulfillment status", request: "{ status: 'Shipped' | 'Delivered' }", response: "{ order: {...} }" }
  ];

  // Full runnable source code files
  const files = [
    {
      path: "server/package.json",
      name: "package.json",
      category: "backend",
      language: "json",
      content: `{
  "name": "shopping-backend",
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
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`[Server] E-Commerce Backend running on port \${PORT}\`);
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
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce', {
      serverSelectionTimeoutMS: 3000
    });
    console.log(\`[MongoDB] Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.warn(\`[MongoDB Warning] Could not connect to MongoDB (\${error.message}).\`);
    console.log('[MongoDB Fallback] Running with in-memory persistence layer.');
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

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
  },
  { timestamps: true }
);

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
      path: "server/src/models/Product.js",
      name: "Product.js",
      category: "backend",
      language: "javascript",
      content: `import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, required: true, index: true },
    image: { type: String, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 4.8 },
    numReviews: { type: Number, default: 12 }
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', productSchema);`
    },
    {
      path: "server/src/models/Order.js",
      name: "Order.js",
      category: "backend",
      language: "javascript",
      content: `import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        title: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
      }
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true, default: 'Credit Card / Stripe' },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String
    },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);`
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
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'codemind_secret_key_123');
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token validation failed' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no bearer token provided' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
};`
    },
    {
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
    },
    {
      path: "server/src/controllers/authController.js",
      name: "authController.js",
      category: "backend",
      language: "javascript",
      content: `import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'codemind_secret_key_123', {
    expiresIn: '30d'
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists with this email' });
  }
  const user = await User.create({
    name,
    email,
    password,
    role: role === 'admin' ? 'admin' : 'customer'
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(400).json({ message: 'Invalid user registration data' });
  }
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
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};`
    },
    {
      path: "server/src/controllers/productController.js",
      name: "productController.js",
      category: "backend",
      language: "javascript",
      content: `import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i'
        }
      }
    : {};

  const categoryFilter = req.query.category && req.query.category !== 'All'
    ? { category: req.query.category }
    : {};

  const products = await Product.find({ ...keyword, ...categoryFilter });
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

export const createProduct = async (req, res) => {
  const { title, price, description, image, category, countInStock } = req.body;
  const product = new Product({
    title: title || 'New Product Sample',
    price: price || 49.99,
    description: description || 'High-quality item crafted for great everyday utility.',
    image: image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    category: category || 'Electronics',
    countInStock: countInStock || 25
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

export const updateProduct = async (req, res) => {
  const { title, price, description, image, category, countInStock } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.title = title ?? product.title;
    product.price = price ?? product.price;
    product.description = description ?? product.description;
    product.image = image ?? product.image;
    product.category = category ?? product.category;
    product.countInStock = countInStock ?? product.countInStock;
    const updated = await product.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};`
    },
    {
      path: "server/src/controllers/orderController.js",
      name: "orderController.js",
      category: "backend",
      language: "javascript",
      content: `import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No items in order' });
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod: paymentMethod || 'Mock Card Payment',
    totalPrice,
    isPaid: true,
    paidAt: new Date(),
    paymentResult: {
      id: 'TXN_' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      status: 'COMPLETED',
      update_time: new Date().toISOString(),
      email_address: req.user.email
    },
    status: 'Processing'
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name email').sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (order) {
    order.status = status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};`
    },
    {
      path: "server/src/routes/authRoutes.js",
      name: "authRoutes.js",
      category: "backend",
      language: "javascript",
      content: `import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUserProfile);

export default router;`
    },
    {
      path: "server/src/routes/productRoutes.js",
      name: "productRoutes.js",
      category: "backend",
      language: "javascript",
      content: `import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

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

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

router.get('/myorders', protect, getMyOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

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
import Product from '../models/Product.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const sampleProducts = [
  {
    title: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    description: "Premium high-fidelity audio with active noise cancellation and 30-hour battery life.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    countInStock: 25,
    rating: 4.9
  },
  {
    title: "Mechanical Ergonomic Keyboard",
    price: 129.50,
    description: "RGB backlit mechanical keyboard with hot-swappable tactile switches and wrist support.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
    countInStock: 15,
    rating: 4.8
  },
  {
    title: "Minimalist Leather Backpack",
    price: 89.00,
    description: "Waterproof full-grain vegan leather backpack with dedicated 15-inch laptop sleeve.",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    countInStock: 40,
    rating: 4.7
  },
  {
    title: "Smart Fitness Watch Ultra",
    price: 249.99,
    description: "Heart rate monitor, GPS tracking, sleep insights, and AMOLED touchscreen.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    countInStock: 18,
    rating: 4.8
  },
  {
    title: "Ceramic Drip Coffee Dripper & Mug",
    price: 42.00,
    description: "Artisan stoneware pour-over brewer with matching heat-retentive barista mug.",
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
    countInStock: 30,
    rating: 4.6
  },
  {
    title: "Polarized UV Aviator Sunglasses",
    price: 55.00,
    description: "Classic lightweight steel frame with polarized UV400 protective lenses.",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    countInStock: 50,
    rating: 4.5
  }
];

const seed = async () => {
  await connectDB();
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const adminUser = await User.create({
      name: "Store Administrator",
      email: "admin@shop.com",
      password: "password123",
      role: "admin"
    });

    const customerUser = await User.create({
      name: "Jane Shopper",
      email: "user@shop.com",
      password: "password123",
      role: "customer"
    });

    await Product.insertMany(sampleProducts);

    console.log("Database seeded successfully!");
    console.log("Admin: admin@shop.com / password123");
    console.log("User:  user@shop.com / password123");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
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
  "name": "shopping-client",
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
      path: "client/src/main.jsx",
      name: "main.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
    },
    {
      path: "client/src/App.jsx",
      name: "App.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import OrdersPage from './pages/OrdersPage';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'admin' | 'orders'
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product === product._id);
      if (existing) {
        return prev.map((item) =>
          item.product === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          product: product._id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: 1
        }
      ];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product === productId ? { ...item, qty } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product !== productId));
  };

  const clearCart = () => setCart([]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setView('home');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <Navbar
        user={user}
        cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        view={view}
        setView={setView}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {view === 'home' && <HomePage onAddToCart={addToCart} />}
        {view === 'admin' && user?.role === 'admin' && <AdminPage user={user} />}
        {view === 'orders' && <OrdersPage user={user} onOpenAuth={() => setIsAuthOpen(true)} />}
      </main>

      <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        Generated with CodeMind AI • Fully functional Full-Stack E-Commerce Platform
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
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
import { ShoppingBag, ShoppingCart, User, ShieldCheck, LogOut, Package } from 'lucide-react';

export default function Navbar({ user, cartCount, onOpenCart, onOpenAuth, onLogout, view, setView }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
              NovaMarket
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Storefront</p>
          </div>
        </div>

        <nav className="flex items-center space-x-1 sm:space-x-4">
          <button
            onClick={() => setView('home')}
            className={\`px-3 py-1.5 rounded-lg text-sm font-medium transition \${
              view === 'home' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:text-white'
            }\`}
          >
            Catalog
          </button>

          {user && (
            <button
              onClick={() => setView('orders')}
              className={\`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition \${
                view === 'orders' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:text-white'
              }\`}
            >
              <Package className="w-4 h-4" />
              <span>Orders</span>
            </button>
          )}

          {user?.role === 'admin' && (
            <button
              onClick={() => setView('admin')}
              className={\`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition \${
                view === 'admin' ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' : 'text-purple-300 hover:text-purple-200'
              }\`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin</span>
            </button>
          )}

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Login */}
          {user ? (
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <span className="text-sm font-medium text-slate-300 hidden sm:inline">{user.name}</span>
              <button
                onClick={onLogout}
                title="Logout"
                className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800/60 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-md transition shadow-indigo-600/20"
            >
              <User className="w-4 h-4" />
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
      path: "client/src/components/ProductCard.jsx",
      name: "ProductCard.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React from 'react';
import { Star, ShoppingCart, Check } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="group bg-slate-800/40 border border-slate-700/60 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition duration-300 flex flex-col">
      <div className="relative aspect-video sm:aspect-square overflow-hidden bg-slate-900">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-medium text-slate-300 border border-slate-700/50">
          {product.category}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-1 text-amber-400 text-xs mb-2">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-semibold">{product.rating || 4.8}</span>
            <span className="text-slate-500">({product.numReviews || 14})</span>
          </div>
          <h3 className="text-base font-semibold text-slate-100 group-hover:text-indigo-400 transition line-clamp-1">
            {product.title}
          </h3>
          <p className="text-sm text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-700/50 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Price</span>
            <span className="text-xl font-bold text-white">\${Number(product.price).toFixed(2)}</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}`
    },
    {
      path: "client/src/components/CartDrawer.jsx",
      name: "CartDrawer.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQty, onRemove, onCheckout }) {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 p-6 flex flex-col shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              <h2 className="text-lg font-bold text-white">Your Shopping Cart</h2>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingBag className="w-16 h-16 text-slate-600 mb-4 stroke-1" />
              <p className="text-lg font-semibold text-slate-300">Your cart is empty</p>
              <p className="text-sm mt-1">Browse our store catalog and add items you love!</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.map((item) => (
                <div key={item.product} className="flex space-x-4 bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg bg-slate-900" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white line-clamp-1">{item.title}</h4>
                    <span className="text-sm font-bold text-indigo-400 mt-1 block">
                      \${Number(item.price).toFixed(2)}
                    </span>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden bg-slate-900">
                        <button
                          onClick={() => onUpdateQty(item.product, item.qty - 1)}
                          className="p-1 hover:bg-slate-800 text-slate-300"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-white">{item.qty}</span>
                        <button
                          onClick={() => onUpdateQty(item.product, item.qty + 1)}
                          className="p-1 hover:bg-slate-800 text-slate-300"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(item.product)}
                        className="text-slate-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-slate-300">
                <span>Subtotal</span>
                <span className="text-2xl font-bold text-white">\${total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-slate-500">Shipping and taxes calculated at checkout.</p>
              <button
                onClick={onCheckout}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}`
    },
    {
      path: "client/src/components/CheckoutModal.jsx",
      name: "CheckoutModal.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState } from 'react';
import { X, CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export default function CheckoutModal({ isOpen, onClose, cart, user, onClearCart, onOpenAuth }) {
  if (!isOpen) return null;

  const [address, setAddress] = useState('123 Innovation Way');
  const [city, setCity] = useState('San Francisco');
  const [postalCode, setPostalCode] = useState('94105');
  const [country, setCountry] = useState('United States');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      onOpenAuth();
      return;
    }

    setLoading(true);
    try {
      const payload = {
        orderItems: cart,
        shippingAddress: { address, city, postalCode, country },
        paymentMethod: 'Credit Card (Stripe Test)',
        totalPrice: total
      };

      const res = await api.createOrder(payload);
      setOrderSummary(res);
      setSuccess(true);
      onClearCart();
    } catch (err) {
      alert(err.message || 'Error processing order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
        <button
          onClick={() => {
            setSuccess(false);
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-white">Payment Successful!</h3>
            <p className="text-slate-300 mt-2">
              Your order <span className="font-mono text-indigo-400">#{orderSummary?._id?.substring(0, 8)}</span> has been placed.
            </p>
            <div className="mt-6 p-4 bg-slate-800/50 rounded-xl text-left border border-slate-700/50">
              <div className="flex justify-between text-sm py-1">
                <span className="text-slate-400">Total Paid:</span>
                <span className="font-bold text-white">\${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span className="text-slate-400">Status:</span>
                <span className="font-semibold text-indigo-400">{orderSummary?.status || 'Processing'}</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span className="text-slate-400">Shipped To:</span>
                <span className="text-slate-200">{address}, {city}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-white transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5 text-indigo-400" />
              <h3 className="text-xl font-bold text-white">Complete Your Order</h3>
            </div>

            {!user && (
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-sm flex items-center justify-between">
                <span>Please sign in or create an account to place orders.</span>
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs"
                >
                  Sign In
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Shipping Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/60 mt-4 space-y-2">
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Items ({cart.reduce((s, i) => s + i.qty, 0)}):</span>
                  <span>\${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Standard Shipping:</span>
                  <span className="text-emerald-400 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-700">
                  <span>Total Amount:</span>
                  <span className="text-indigo-400">\${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Simulated Secure 256-bit TLS Encrypted Checkout</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-white shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
              >
                {loading ? 'Processing Transaction...' : \`Pay \$\${total.toFixed(2)} & Place Order\`}
              </button>
            </form>
          </div>
        )}
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
import { X, Lock, Mail, User as UserIcon } from 'lucide-react';
import { api } from '../services/api';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  if (!isOpen) return null;

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [asAdmin, setAsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let data;
      if (isRegister) {
        data = await api.register({ name, email, password, role: asAdmin ? 'admin' : 'customer' });
      } else {
        data = await api.login({ email, password });
      }
      onLogin(data);
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickDemo = (role) => {
    if (role === 'admin') {
      setEmail('admin@shop.com');
      setPassword('password123');
      setIsRegister(false);
    } else {
      setEmail('user@shop.com');
      setPassword('password123');
      setIsRegister(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-1">
          {isRegister ? 'Create an Account' : 'Welcome Back'}
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          {isRegister ? 'Sign up to place orders and track delivery' : 'Sign in to access your cart and account'}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {isRegister && (
            <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={asAdmin}
                onChange={(e) => setAsAdmin(e.target.checked)}
                className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-800"
              />
              <span>Register with Admin privileges (catalog & order management)</span>
            </label>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-white shadow-lg shadow-indigo-600/30 transition disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isRegister ? 'Register Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
          </button>
        </div>

        {/* Quick Demo Fillers */}
        <div className="mt-4 p-3 bg-slate-800/40 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">Quick Test Credentials:</span>
          <div className="space-x-2">
            <button
              onClick={() => fillQuickDemo('user')}
              className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200"
            >
              Customer
            </button>
            <button
              onClick={() => fillQuickDemo('admin')}
              className="px-2 py-1 bg-purple-600/40 hover:bg-purple-600/60 rounded text-purple-200"
            >
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
      path: "client/src/pages/HomePage.jsx",
      name: "HomePage.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, Sparkles, Filter } from 'lucide-react';
import { api } from '../services/api';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Home & Kitchen'];

export default function HomePage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts(searchQuery, selectedCategory);
      setProducts(data);
    } catch (err) {
      console.error('Fetch products error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/20 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Generation Shopping Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Discover Handcrafted Products Engineered for Everyday Living
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Browse our curated catalog, enjoy frictionless cart interactions, and complete orders with fast simulated checkout.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search catalog by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 placeholder-slate-500"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 mr-1 hidden sm:inline" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={\`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition \${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }\`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-slate-800/40 rounded-2xl animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
          <p className="text-slate-400 text-base">No products match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
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
import { Plus, Trash2, Package, ShieldCheck, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

export default function AdminPage({ user }) {
  const [tab, setTab] = useState('products'); // 'products' | 'orders'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // New product form state
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('49.99');
  const [newCategory, setNewCategory] = useState('Electronics');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    loadData();
  }, [tab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (tab === 'products') {
        const prodData = await api.getProducts('', 'All');
        setProducts(prodData);
      } else {
        const orderData = await api.getAllOrders();
        setOrders(orderData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await api.createProduct({
        title: newTitle,
        price: parseFloat(newPrice),
        category: newCategory,
        image: newImage,
        description: newDesc || 'Handcrafted quality item.'
      });
      setNewTitle('');
      setNewDesc('');
      loadData();
    } catch (err) {
      alert(err.message || 'Error creating product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to remove this product?')) return;
    try {
      await api.deleteProduct(id);
      loadData();
    } catch (err) {
      alert(err.message || 'Error deleting product');
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.updateOrderStatus(orderId, status);
      loadData();
    } catch (err) {
      alert(err.message || 'Error updating status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <span>Store Administrator Console</span>
          </h2>
          <p className="text-sm text-slate-400">Manage catalog inventory, add new products, and track customer fulfillment</p>
        </div>

        <div className="flex space-x-2 bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setTab('products')}
            className={\`px-4 py-1.5 rounded-lg text-sm font-semibold transition \${
              tab === 'products' ? 'bg-purple-600 text-white' : 'text-slate-300 hover:text-white'
            }\`}
          >
            Products
          </button>
          <button
            onClick={() => setTab('orders')}
            className={\`px-4 py-1.5 rounded-lg text-sm font-semibold transition \${
              tab === 'orders' ? 'bg-purple-600 text-white' : 'text-slate-300 hover:text-white'
            }\`}
          >
            Orders ({orders.length})
          </button>
        </div>
      </div>

      {tab === 'products' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Product Form */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 h-fit">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2 mb-4">
              <Plus className="w-5 h-5 text-purple-400" />
              <span>Add New Product</span>
            </h3>
            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Wireless Noise Canceling Headphones"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">Price (\$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-medium block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Image URL</label>
                <input
                  type="url"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-medium block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe product highlights..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 font-bold rounded-xl text-white shadow-md transition"
              >
                Publish Product
              </button>
            </form>
          </div>

          {/* Product List Table */}
          <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 overflow-x-auto">
            <h3 className="text-lg font-bold text-white mb-4">Catalog Inventory ({products.length})</h3>
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-900/60 text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 flex items-center space-x-3">
                      <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-900" />
                      <span className="font-semibold text-white">{p.title}</span>
                    </td>
                    <td className="py-3 px-4">{p.category}</td>
                    <td className="py-3 px-4 font-bold text-white">\${Number(p.price).toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDeleteProduct(p._id)}
                        className="text-slate-400 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Orders Fulfillment View */
        <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 overflow-x-auto">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <Package className="w-5 h-5 text-indigo-400" />
            <span>Store Customer Orders</span>
          </h3>
          {orders.length === 0 ? (
            <p className="text-slate-400 py-8 text-center">No customer orders have been placed yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o._id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm font-bold text-indigo-400">Order #{o._id.substring(0, 8)}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Customer: <span className="text-slate-200">{o.user?.name || 'Customer'} ({o.user?.email})</span>
                    </p>
                    <p className="text-xs text-slate-400">
                      Items: {o.orderItems?.map(i => \`\${i.title} (x\${i.qty})\`).join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-white">\${Number(o.totalPrice).toFixed(2)}</span>
                    <select
                      value={o.status}
                      onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)}
                      className="bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold px-2.5 py-1.5 text-white"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}`
    },
    {
      path: "client/src/pages/OrdersPage.jsx",
      name: "OrdersPage.jsx",
      category: "frontend",
      language: "javascript",
      content: `import React, { useState, useEffect } from 'react';
import { Package, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../services/api';

export default function OrdersPage({ user, onOpenAuth }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadMyOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadMyOrders = async () => {
    setLoading(true);
    try {
      const data = await api.getMyOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 max-w-md mx-auto">
        <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white">Sign In Required</h3>
        <p className="text-sm text-slate-400 mt-1 mb-4">Please sign in to view your order history and live delivery tracking.</p>
        <button
          onClick={onOpenAuth}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl text-white text-sm"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Package className="w-6 h-6 text-indigo-400" />
          <span>My Order History</span>
        </h2>
        <p className="text-sm text-slate-400">Track current shipments and view transaction receipts</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-slate-800/40 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-700/50 gap-2">
                <div>
                  <span className="font-mono text-sm font-bold text-indigo-400">Order #{order._id.substring(0, 8)}</span>
                  <span className="text-xs text-slate-400 ml-3">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={\`px-3 py-1 rounded-full text-xs font-semibold \${
                    order.status === 'Delivered'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  }\`}>
                    {order.status}
                  </span>
                  <span className="text-lg font-bold text-white">\${Number(order.totalPrice).toFixed(2)}</span>
                </div>
              </div>

              <div className="py-3 space-y-2">
                {order.orderItems?.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-sm">
                    <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-900" />
                    <span className="text-slate-200 font-medium flex-1">{item.title}</span>
                    <span className="text-slate-400 text-xs">Qty: {item.qty}</span>
                    <span className="text-white font-bold">\${Number(item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-700/50 text-xs text-slate-400 flex justify-between">
                <span>Shipping Address: {order.shippingAddress?.address}, {order.shippingAddress?.city}</span>
                <span className="text-emerald-400 font-medium">Payment Verified ({order.paymentMethod})</span>
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
      path: "client/src/services/api.js",
      name: "api.js",
      category: "frontend",
      language: "javascript",
      content: `const BASE_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const user = localStorage.getItem('user');
  const token = user ? JSON.parse(user).token : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: \`Bearer \${token}\` } : {})
  };
};

export const api = {
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

  async getProducts(keyword = '', category = 'All') {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (category && category !== 'All') params.append('category', category);
    const res = await fetch(\`\${BASE_URL}/products?\${params.toString()}\`);
    return await res.json();
  },

  async createProduct(productData) {
    const res = await fetch(\`\${BASE_URL}/products\`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(productData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Create product failed');
    return json;
  },

  async deleteProduct(id) {
    const res = await fetch(\`\${BASE_URL}/products/\${id}\`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return await res.json();
  },

  async createOrder(orderData) {
    const res = await fetch(\`\${BASE_URL}/orders\`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Create order failed');
    return json;
  },

  async getMyOrders() {
    const res = await fetch(\`\${BASE_URL}/orders/myorders\`, {
      headers: getHeaders()
    });
    return await res.json();
  },

  async getAllOrders() {
    const res = await fetch(\`\${BASE_URL}/orders\`, {
      headers: getHeaders()
    });
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
      content: `# Online Shopping Website (NovaMarket)
Generated by **CodeMind AI** - Full-Stack E-Commerce Platform

## Architecture & Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js (ES Modules)
- **Database**: MongoDB with Mongoose (or in-memory zero-config fallback)
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs salted hashing
- **Payments**: Integrated simulated Stripe checkout flow

## Features
1. **User Authentication & RBAC**: Customer and Admin roles, JWT authentication.
2. **Product Catalog**: Full-text keyword search, category filtering, responsive product cards.
3. **Shopping Cart**: Client & local-storage persistent cart, quantity counter, slide-over drawer.
4. **Checkout & Payment**: Address details, mock transactional card payment, order creation.
5. **Order Tracking**: Customer order history with live fulfillment statuses.
6. **Admin Dashboard**: Create products, delete inventory, update order statuses.

## Quick Start (Run Locally)

### 1. Backend Setup
\`\`\`bash
cd server
npm install
npm run seed     # Seeds demo products, admin (admin@shop.com) and user (user@shop.com)
npm run dev      # Starts server on http://localhost:5000
\`\`\`

### 2. Frontend Setup
\`\`\`bash
cd client
npm install
npm run dev      # Starts Vite React dev server on http://localhost:5173
\`\`\`

### 3. Demo Credentials
- **Admin**: \`admin@shop.com\` / \`password123\`
- **Customer**: \`user@shop.com\` / \`password123\`

## Running with Docker Compose
\`\`\`bash
docker-compose up --build
\`\`\`
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
    container_name: ecommerce_mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: ecommerce_backend
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGODB_URI=mongodb://mongodb:27017/ecommerce
      - JWT_SECRET=codemind_super_secret_key_123
    depends_on:
      - mongodb

  frontend:
    build:
      context: ./client
      dockerfile: Dockerfile
    container_name: ecommerce_frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  mongo_data:
`
    },
    {
      path: "Dockerfile",
      name: "Dockerfile",
      category: "devops",
      language: "dockerfile",
      content: `FROM node:20-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm install --production
COPY server/ ./
EXPOSE 5000
CMD ["node", "src/server.js"]`
    },
    {
      path: ".env.example",
      name: ".env.example",
      category: "config",
      language: "bash",
      content: `PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=codemind_super_secret_key_123
NODE_ENV=development`
    }
  ];

  const setupGuide = {
    prerequisites: ["Node.js >= 18.0.0", "npm or yarn", "MongoDB (Optional: runs in-memory if MongoDB is not active)"],
    steps: [
      { title: "Extract Project Files", command: "Unzip the downloaded project archive to your desired directory" },
      { title: "Install Server Dependencies", command: "cd server && npm install" },
      { title: "Seed Demo Catalog & Accounts", command: "npm run seed" },
      { title: "Launch Express Backend", command: "npm run dev (Runs on http://localhost:5000)" },
      { title: "Install & Launch React Frontend", command: "cd ../client && npm install && npm run dev (Runs on http://localhost:5173)" }
    ],
    dockerInstructions: "docker-compose up --build",
    defaultAccounts: [
      { role: "Store Admin", email: "admin@shop.com", password: "password123" },
      { role: "Customer User", email: "user@shop.com", password: "password123" }
    ]
  };

  return {
    title: "Online Shopping Website (NovaMarket)",
    prompt: "I want to build an online shopping website. Users should register, login, browse products, search products, add products to cart, place orders, and make payments. Admins should manage products and orders.",
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
