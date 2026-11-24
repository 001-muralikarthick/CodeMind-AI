export const TECH_PROS_CONS = {
  // Frontend
  "React": {
    category: "Frontend",
    advantages: [
      "Vast ecosystem, largest community support, and extensive npm library packages",
      "Component-based virtual DOM ensures excellent rendering performance",
      "Huge talent pool and seamless integration with state managers like Redux or Zustand"
    ],
    disadvantages: [
      "Requires picking external routing and state libraries (unopinionated)",
      "JSX syntax and frequent ecosystem changes have a slight learning curve"
    ],
    bestFor: "Dynamic web apps, SaaS dashboards, and consumer-facing applications"
  },
  "Angular": {
    category: "Frontend",
    advantages: [
      "Full-featured batteries-included enterprise framework by Google",
      "Built-in TypeScript, Dependency Injection, routing, forms, and HTTP client",
      "Enforces strict architectural consistency across large engineering teams"
    ],
    disadvantages: [
      "Steeper learning curve with RxJS observables and complex decorators",
      "Heavier bundle size compared to lightweight alternatives"
    ],
    bestFor: "Large-scale enterprise internal portals and financial institutions"
  },
  "Vue": {
    category: "Frontend",
    advantages: [
      "Gentle learning curve with clean single-file component (.vue) architecture",
      "Exceptional official documentation and built-in reactive state system",
      "Fast rendering speed and smaller bundle size than Angular"
    ],
    disadvantages: [
      "Smaller third-party plugin ecosystem compared to React",
      "Less prevalent in large legacy enterprise codebases"
    ],
    bestFor: "Rapid prototyping, medium-sized web applications, and interactive portals"
  },
  "HTML, CSS, JavaScript": {
    category: "Frontend",
    advantages: [
      "Zero build step, zero bundling dependencies, and instant browser execution",
      "Universal compatibility across all browsers and minimal resource consumption",
      "Ultimate control over raw DOM and CSS layouts"
    ],
    disadvantages: [
      "Manual DOM manipulation becomes messy and prone to spaghetti code on complex UIs",
      "No built-in state reactivity or component lifecycle management"
    ],
    bestFor: "Simple landing pages, static documentation, and lightweight widgets"
  },

  // Backend
  "Node.js + Express": {
    category: "Backend",
    advantages: [
      "Unified JavaScript/TypeScript across frontend and backend",
      "Asynchronous non-blocking I/O ideal for real-time events, chat, and high I/O throughput",
      "Access to npm, the world's largest open-source package registry"
    ],
    disadvantages: [
      "Single-threaded event loop can bottleneck on CPU-intensive heavy computation",
      "Callback/promise chaining requires disciplined error handling"
    ],
    bestFor: "Real-time apps, microservices, REST APIs, and e-commerce platforms"
  },
  "Python + FastAPI": {
    category: "Backend",
    advantages: [
      "Blazing fast async performance comparable to NodeJS and Go (built on Starlette & Pydantic)",
      "Automatic interactive OpenAPI / Swagger documentation generation",
      "First-class data validation with Python type hints and easy AI/ML integration"
    ],
    disadvantages: [
      "Smaller ecosystem of ORMs and legacy plugins compared to Django",
      "Requires familiarity with Python modern async/await syntax"
    ],
    bestFor: "High-performance APIs, AI/LLM microservices, and data-driven systems"
  },
  "Java + Spring Boot": {
    category: "Backend",
    advantages: [
      "Enterprise gold standard with battle-tested security, caching, and database transactions",
      "Robust multithreading and mature JVM garbage collection performance",
      "Extensive enterprise tooling, Spring Security, and distributed microservices support"
    ],
    disadvantages: [
      "Higher memory footprint (RAM) and slower cold startup times",
      "Verbose boilerplate configuration compared to lightweight script engines"
    ],
    bestFor: "Mission-critical banking, enterprise ERP, and massive distributed architectures"
  },
  "Django": {
    category: "Backend",
    advantages: [
      "Batteries-included framework: built-in admin panel, ORM, auth, and security protections",
      "Rapid development speed — scaffold full CRUD applications in hours",
      "Built-in protection against CSRF, SQL injection, and clickjacking"
    ],
    disadvantages: [
      "Monolithic architecture can feel heavy for simple lightweight microservices",
      "Traditional sync request-response model is less optimal for high-concurrency WebSockets"
    ],
    bestFor: "Content management systems, data portals, and fast MVP development"
  },

  // Database
  "MongoDB": {
    category: "Database",
    advantages: [
      "Flexible schema-less JSON document model matches JavaScript objects naturally",
      "Effortless horizontal scaling with built-in sharding and replica sets",
      "Fast read and write throughput for hierarchical and unstructured data"
    ],
    disadvantages: [
      "Less suitable for highly normalized financial ledgers requiring rigid multi-table joins",
      "Data duplication may occur to optimize query performance"
    ],
    bestFor: "Catalogs, social feeds, real-time analytics, and rapid agile development"
  },
  "PostgreSQL": {
    category: "Database",
    advantages: [
      "The most advanced open-source relational database with strict ACID compliance",
      "Rich support for JSONB, spatial data (PostGIS), full-text search, and complex joins",
      "Extremely reliable, highly extensible, and loved by modern developers"
    ],
    disadvantages: [
      "Strict schema migrations required when altering relational table structures",
      "Vertical scaling requires more manual infrastructure tuning"
    ],
    bestFor: "Complex relational business domains, SaaS platforms, and transactional ledgers"
  },
  "MySQL": {
    category: "Database",
    advantages: [
      "Proven reliability powering massive global internet services (WordPress, Facebook)",
      "Widespread hosting availability and familiar SQL syntax",
      "Excellent read performance with optimized indexing engines (InnoDB)"
    ],
    disadvantages: [
      "Less feature-rich JSON querying capabilities compared to PostgreSQL",
      "More rigid dialect and limited custom data types"
    ],
    bestFor: "Standard web portals, CMS platforms, and traditional relational databases"
  },
  "SQLite": {
    category: "Database",
    advantages: [
      "Zero-configuration, serverless single-file database that runs directly in application process",
      "Fastest local reads with zero network overhead and zero cloud hosting costs",
      "Extremely portable and ideal for desktop apps, testing, and embedded devices"
    ],
    disadvantages: [
      "File-level write lock limits high concurrent write throughput",
      "Not designed for multi-server distributed production clusters"
    ],
    bestFor: "Local development, desktop applications, testing, and low-write services"
  }
};

export function getTechnologyAdvice(techName) {
  return TECH_PROS_CONS[techName] || {
    category: "General",
    advantages: ["Popular open-source technology with broad community support"],
    disadvantages: ["Requires standard configuration and monitoring in production"],
    bestFor: "General-purpose web applications"
  };
}
