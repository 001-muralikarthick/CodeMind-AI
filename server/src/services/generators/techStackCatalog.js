export const TECH_STACK_PRESETS = [
  {
    id: 'mern',
    name: 'MERN Stack',
    badge: 'Popular for Web Apps',
    description: 'MongoDB, Express.js, React (Vite), Node.js with Tailwind CSS',
    frontend: 'React (Vite + Tailwind CSS)',
    backend: 'Node.js / Express',
    database: 'MongoDB / Mongoose',
    auth: 'JWT + bcrypt',
    styling: 'Tailwind CSS',
    tooling: 'ESM + npm'
  },
  {
    id: 'pern',
    name: 'PERN Stack',
    badge: 'Relational & Scalable',
    description: 'PostgreSQL, Express.js, React (Vite), Node.js with Prisma ORM',
    frontend: 'React (Vite + Tailwind CSS)',
    backend: 'Node.js / Express',
    database: 'PostgreSQL / Prisma ORM',
    auth: 'JWT + bcrypt',
    styling: 'Tailwind CSS',
    tooling: 'TypeScript + Prisma'
  },
  {
    id: 'nextjs-fullstack',
    name: 'Next.js 14 App Router',
    badge: 'Modern Full-Stack',
    description: 'Next.js 14 Server Actions, React, Prisma ORM, Tailwind CSS',
    frontend: 'Next.js 14 (App Router)',
    backend: 'Next.js Route Handlers / Server Actions',
    database: 'PostgreSQL / Prisma or SQLite',
    auth: 'NextAuth / Auth.js',
    styling: 'Tailwind CSS + shadcn/ui',
    tooling: 'TypeScript'
  },
  {
    id: 'fastapi-react',
    name: 'FastAPI + React',
    badge: 'High Performance & AI-Ready',
    description: 'Python FastAPI async backend with Pydantic & SQLAlchemy, React Vite frontend',
    frontend: 'React (Vite + Tailwind CSS)',
    backend: 'Python / FastAPI',
    database: 'PostgreSQL / SQLAlchemy',
    auth: 'OAuth2 / JWT with PyJWT',
    styling: 'Tailwind CSS',
    tooling: 'Uvicorn + Poetry'
  },
  {
    id: 'django-react',
    name: 'Django + React',
    badge: 'Batteries Included',
    description: 'Django REST Framework with built-in Admin panel & ORM, React frontend',
    frontend: 'React (Vite + Tailwind CSS)',
    backend: 'Python / Django REST Framework',
    database: 'PostgreSQL / Django ORM',
    auth: 'Django Session / Token Auth',
    styling: 'Tailwind CSS',
    tooling: 'Pipenv / Pip'
  }
];

export const TECH_STACK_CATEGORIES = {
  frontend: [
    { label: 'React (Vite + Tailwind CSS)', value: 'React (Vite + Tailwind CSS)', recommended: true },
    { label: 'Next.js 14 (App Router & SSR)', value: 'Next.js 14 (App Router)' },
    { label: 'Vue 3 (Vite + Pinia)', value: 'Vue 3 (Vite + Pinia)' },
    { label: 'SvelteKit', value: 'SvelteKit' }
  ],
  backend: [
    { label: 'Node.js / Express (ESM)', value: 'Node.js / Express', recommended: true },
    { label: 'Node.js / NestJS (Enterprise TypeScript)', value: 'NestJS' },
    { label: 'Python / FastAPI', value: 'Python / FastAPI' },
    { label: 'Python / Django REST Framework', value: 'Python / Django REST Framework' },
    { label: 'Go (Gin / Fiber)', value: 'Go (Gin)' }
  ],
  database: [
    { label: 'MongoDB / Mongoose (Document DB)', value: 'MongoDB / Mongoose', recommended: true },
    { label: 'PostgreSQL (Prisma ORM)', value: 'PostgreSQL / Prisma' },
    { label: 'MySQL (Prisma ORM)', value: 'MySQL / Prisma' },
    { label: 'SQLite (Zero-config local file)', value: 'SQLite / Prisma' }
  ],
  auth: [
    { label: 'JWT (JSON Web Tokens) + bcrypt', value: 'JWT + bcrypt', recommended: true },
    { label: 'Session Cookies + Redis', value: 'Session Cookies + Redis' },
    { label: 'Firebase Authentication / Supabase Auth', value: 'Supabase Auth' },
    { label: 'OAuth 2.0 (Google & GitHub)', value: 'OAuth 2.0 (Google/GitHub)' }
  ],
  styling: [
    { label: 'Tailwind CSS (Utility-First)', value: 'Tailwind CSS', recommended: true },
    { label: 'shadcn/ui + Radix UI', value: 'shadcn/ui' },
    { label: 'Chakra UI', value: 'Chakra UI' },
    { label: 'Material UI (MUI)', value: 'Material UI' }
  ]
};

export function suggestTechStack(prompt) {
  const lower = (prompt || '').toLowerCase();
  if (lower.includes('django') || lower.includes('python') && lower.includes('data')) {
    return TECH_STACK_PRESETS[4];
  }
  if (lower.includes('fastapi') || lower.includes('machine learning') || lower.includes('ai model')) {
    return TECH_STACK_PRESETS[3];
  }
  if (lower.includes('next') || lower.includes('ssr') || lower.includes('seo')) {
    return TECH_STACK_PRESETS[2];
  }
  if (lower.includes('postgres') || lower.includes('sql') || lower.includes('relational')) {
    return TECH_STACK_PRESETS[1];
  }
  return TECH_STACK_PRESETS[0]; // MERN default
}
