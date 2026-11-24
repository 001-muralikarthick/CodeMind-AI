import { getFoodOrderingBlueprint } from './generators/foodOrderingGenerator.js';
import { getCricketBlueprint } from './generators/cricketGenerator.js';
import { getEcommerceBlueprint } from './generators/ecommerceGenerator.js';
import { generateProjectBlueprint } from './generators/genericGenerator.js';
import { enrichWithFullScaffold } from './scaffoldService.js';

export const TECH_OPTIONS = {
  frontend: [
    { label: 'React', value: 'React' },
    { label: 'Angular', value: 'Angular' },
    { label: 'Vue', value: 'Vue' },
    { label: 'HTML, CSS, JavaScript', value: 'HTML, CSS, JavaScript' }
  ],
  backend: [
    { label: 'Node.js + Express', value: 'Node.js + Express' },
    { label: 'Python + FastAPI', value: 'Python + FastAPI' },
    { label: 'Java + Spring Boot', value: 'Java + Spring Boot' },
    { label: 'Django', value: 'Django' }
  ],
  database: [
    { label: 'MongoDB', value: 'MongoDB' },
    { label: 'MySQL', value: 'MySQL' },
    { label: 'PostgreSQL', value: 'PostgreSQL' },
    { label: 'SQLite', value: 'SQLite' }
  ],
  aiModel: [
    { label: 'Gemini (Connected & Active)', value: 'Gemini' },
    { label: 'OpenAI (GPT-4o)', value: 'OpenAI' },
    { label: 'Other supported model (Built-in Engine)', value: 'Built-in Engine' }
  ],
  scope: [
    { label: 'Full-stack application', value: 'Full-stack application' },
    { label: 'Frontend only', value: 'Frontend only' },
    { label: 'Backend only', value: 'Backend only' }
  ]
};

export class AIService {
  /**
   * Step 1 -> Step 2: Understand requirements and prepare selectable technology choices
   */
  static analyzePromptRequirements(prompt) {
    const cleanPrompt = (prompt || '').trim();
    const p = cleanPrompt.toLowerCase();

    // Domain detection
    const isFood = p.includes('food') || p.includes('restaurant') || p.includes('menu') || p.includes('order food') || p.includes('dish');
    const isCricket = p.includes('cricket') || p.includes('player') || p.includes('match') || p.includes('wicket');
    const isGym = p.includes('gym') || p.includes('fitness') || p.includes('workout') || p.includes('trainer') || p.includes('membership');
    const isHospital = p.includes('hospital') || p.includes('doctor') || p.includes('patient') || p.includes('clinic') || p.includes('medical');
    const isCarRental = p.includes('car rental') || p.includes('vehicle') || (p.includes('car') && (p.includes('rent') || p.includes('hire')));
    const isHotel = p.includes('hotel') || p.includes('room') || p.includes('resort') || (p.includes('reservation') && !p.includes('food'));
    const isRealEstate = p.includes('real estate') || p.includes('property') || p.includes('realtor');
    const isSchool = p.includes('school') || p.includes('student') || p.includes('college') || p.includes('course');
    const isLibrary = p.includes('library') || p.includes('librarian') || p.includes('borrow book') || p.includes('books') || (p.includes('book') && !p.includes('slot') && !p.includes('room') && !p.includes('trainer') && !p.includes('gym') && !p.includes('hotel'));
    const isEcommerce = (p.includes('shopping') || p.includes('e-commerce') || p.includes('ecommerce') || p.includes('cart') && p.includes('product')) && !isFood && !isCricket && !isGym;

    const detectedFeatures = [];
    const clarificationQuestions = [];

    if (isFood) {
      detectedFeatures.push({ name: 'User Authentication', description: 'Customer registration, secure login, and session tokens' });
      detectedFeatures.push({ name: 'Restaurant Discovery', description: 'Browse local eateries, filter by cuisine (Italian, Asian, Burgers), ratings' });
      detectedFeatures.push({ name: 'Interactive Digital Menus', description: 'Detailed dishes, photos, descriptions, dietary flags & prices' });
      detectedFeatures.push({ name: 'Cart & Food Ordering', description: 'Persistent cart drawer, meal notes, address checkout' });
      detectedFeatures.push({ name: 'Live Order Tracking', description: '4-stage tracking: Placed -> Confirmed -> Preparing -> Out for Delivery -> Delivered' });
      detectedFeatures.push({ name: 'Admin Kitchen Controls', description: 'Manage restaurants, dishes, menu prices, and update kitchen order status' });

      clarificationQuestions.push({
        id: 'delivery_radius',
        question: 'Should restaurants define custom delivery zones and distance-based fees?',
        suggestion: 'Included basic address delivery; multi-zone geo-fencing can be enabled.'
      });
      clarificationQuestions.push({
        id: 'coupon_discounts',
        question: 'Do you need promo codes and coupon discounts during checkout?',
        suggestion: 'Supported in cart state; promo code engine can be toggled on.'
      });
      clarificationQuestions.push({
        id: 'live_tracking_mode',
        question: 'How should live order updates stream to customer screens?',
        suggestion: 'Configured with reactive 4-stage tracking state machine.'
      });
    } else if (isCricket) {
      detectedFeatures.push({ name: 'User Authentication', description: 'Team captain and tournament director roles' });
      detectedFeatures.push({ name: 'Team & Squad Management', description: 'Club registration, team codes, captain assignment' });
      detectedFeatures.push({ name: 'Player Profiles & Cricket Roles', description: 'Batsman, Bowler, All-Rounder, Wicketkeeper with career stats' });
      detectedFeatures.push({ name: 'Manual Match Fixtures', description: 'Schedule matches with custom overs, venue, and toss' });
      detectedFeatures.push({ name: 'Pitch-Side Scorekeeper & Records', description: 'Live ball-by-ball scorekeeper keypad and match archive' });
      detectedFeatures.push({ name: 'Admin Team & Player Oversight', description: 'Tournament director management panel' });

      clarificationQuestions.push({
        id: 'extras_tracking',
        question: 'Should pitch-side scoring include detailed extras (wides, no-balls, leg byes) and wagon wheels?',
        suggestion: 'Enabled in CricPulse digital scorekeeper controller.'
      });
      clarificationQuestions.push({
        id: 'public_match_view',
        question: 'Can guest fans view match leaderboards and live scores without signing in?',
        suggestion: 'Public read-only routes enabled for live match viewer.'
      });
      clarificationQuestions.push({
        id: 'tournament_format',
        question: 'Do you require round-robin league points tables or knockout brackets?',
        suggestion: 'Standard T20/ODI points table schema configured in match records.'
      });
    } else if (isGym) {
      detectedFeatures.push({ name: 'Member Registration & Subscriptions', description: 'Tiered plans (Monthly, Annual), QR passes, and renewals' });
      detectedFeatures.push({ name: 'Personal Trainer Slot Booking', description: 'Schedule 1-on-1 coaching sessions and trainer availability' });
      detectedFeatures.push({ name: 'Workout Routine Builder', description: 'Custom exercises, target muscle groups, sets, reps, and diet plans' });
      detectedFeatures.push({ name: 'Daily Attendance Tracker', description: 'Member check-in/check-out logs and gym visit streaks' });
      detectedFeatures.push({ name: 'Equipment & Facility Oversight', description: 'Gym equipment status, maintenance schedules, and locker assignments' });

      clarificationQuestions.push({
        id: 'qr_attendance',
        question: 'Should member check-in support instant QR code or barcode scanning?',
        suggestion: 'QR code pass generation included in member dashboard.'
      });
      clarificationQuestions.push({
        id: 'trainer_schedule',
        question: 'Can personal trainers block out personal leave or custom shift hours?',
        suggestion: 'Trainer calendar includes dynamic availability management.'
      });
    } else if (isHospital) {
      detectedFeatures.push({ name: 'Staff & Patient Authentication', description: 'Role-based access for Doctors, Nurses, and Admin' });
      detectedFeatures.push({ name: 'Patient Profile & EMR Registry', description: 'Demographics, medical history, allergies, and blood group' });
      detectedFeatures.push({ name: 'Doctor Scheduling & Shifts', description: 'Specialty departments, consultation fee, and available slots' });
      detectedFeatures.push({ name: 'Appointment Booking System', description: 'Scheduled, In-Progress, and Completed consultation workflow' });
      detectedFeatures.push({ name: 'Clinical Invoicing & Pharmacy', description: 'Bill generation and consultation fees tracking' });

      clarificationQuestions.push({
        id: 'telehealth',
        question: 'Do doctors need integrated virtual video consultation links?',
        suggestion: 'Schema prepared with meeting URL and slot tokens.'
      });
      clarificationQuestions.push({
        id: 'emr_confidentiality',
        question: 'Should patient medical notes have strict role-restricted access?',
        suggestion: 'Protected by doctor-only RBAC middleware.'
      });
    } else if (isLibrary) {
      detectedFeatures.push({ name: 'Member & Librarian Auth', description: 'Student, faculty, and head librarian roles' });
      detectedFeatures.push({ name: 'ISBN & Catalog Indexing', description: 'Real-time copy availability, shelf tags, and authors' });
      detectedFeatures.push({ name: 'Circulation Desk', description: 'Issue, return, and renewal tracking with due dates' });
      detectedFeatures.push({ name: 'Overdue Fines Engine', description: 'Automatic daily penalty calculation and receipt receipts' });

      clarificationQuestions.push({
        id: 'barcode_scanner',
        question: 'Should the circulation desk support barcode/RFID scanner inputs?',
        suggestion: 'Optimized search input with automatic ISBN auto-focus.'
      });
    } else if (isSchool) {
      detectedFeatures.push({ name: 'Academic Portal & Auth', description: 'Student, Teacher, and Administrator roles' });
      detectedFeatures.push({ name: 'Course & Curriculum Catalog', description: 'Syllabus, department credits, and instructor assignment' });
      detectedFeatures.push({ name: 'Daily Attendance Tracker', description: 'Class rosters with present/absent/late percentages' });
      detectedFeatures.push({ name: 'Gradebook & GPA Reports', description: 'Exam scores, weighted GPA calculation, and transcripts' });

      clarificationQuestions.push({
        id: 'parent_notifications',
        question: 'Should attendance anomalies notify parents automatically?',
        suggestion: 'Parent email notification triggers included.'
      });
    } else if (isEcommerce) {
      detectedFeatures.push({ name: 'User Authentication & RBAC', description: 'Customer & Admin roles with JWT' });
      detectedFeatures.push({ name: 'Product Catalog & Search', description: 'Category filters, stock tracking, full-text search' });
      detectedFeatures.push({ name: 'Shopping Cart', description: 'Client & local-storage persistent cart' });
      detectedFeatures.push({ name: 'Order Checkout & Payment', description: 'Address entry and simulated card transaction' });
      detectedFeatures.push({ name: 'Admin Dashboard', description: 'Manage products and update customer orders' });

      clarificationQuestions.push({
        id: 'product_variants',
        question: 'Do your products require multi-attribute variants (e.g. size, color, SKU)?',
        suggestion: 'Schema supports nested product attributes.'
      });
      clarificationQuestions.push({
        id: 'customer_reviews',
        question: 'Should verified customers be able to submit star ratings and text reviews?',
        suggestion: 'Review controller and rating models pre-configured.'
      });
      clarificationQuestions.push({
        id: 'invoice_downloads',
        question: 'Would you like automated PDF invoice receipts generated upon checkout?',
        suggestion: 'Integrated with server docService PDF engine.'
      });
    } else {
      detectedFeatures.push({ name: 'User Authentication', description: 'Secure registration and role-based login' });
      detectedFeatures.push({ name: 'Core Domain Management', description: 'CRUD operations, search, and responsive dashboards' });
      detectedFeatures.push({ name: 'Status & Transaction Tracking', description: 'State machine for domain lifecycle' });
      detectedFeatures.push({ name: 'Administrative Console', description: 'System governance, records audit, and configurations' });

      clarificationQuestions.push({
        id: 'rbac_levels',
        question: 'Should the system support tiered role permissions (Admin, Editor, Viewer)?',
        suggestion: 'JWT auth middleware includes role verification.'
      });
      clarificationQuestions.push({
        id: 'export_reports',
        question: 'Do you need CSV or Excel export for administrative records?',
        suggestion: 'Configured in backend export controller.'
      });
    }

    const domainName = isFood
      ? 'Online Food Ordering & Delivery'
      : isCricket
      ? 'Cricket League & Match Management'
      : isHospital
      ? 'Hospital & Healthcare Clinic Management'
      : isLibrary
      ? 'Library & Book Circulation Management'
      : isSchool
      ? 'School & Student Academic Portal'
      : isHotel
      ? 'Hotel & Hospitality Booking System'
      : isGym
      ? 'Gym Membership & Fitness Tracker'
      : isRealEstate
      ? 'Real Estate & Property Management'
      : isEcommerce
      ? 'E-Commerce Storefront'
      : 'Custom Full-Stack Solution';

    return {
      prompt: cleanPrompt,
      detectedDomain: domainName,
      detectedFeatures,
      clarificationQuestions,
      techOptions: TECH_OPTIONS,
      defaultSelection: {
        frontend: 'React',
        backend: 'Node.js + Express',
        database: 'MongoDB',
        aiModel: process.env.GEMINI_API_KEY ? 'Gemini' : 'Built-in Engine',
        scope: 'Full-stack application',
        withAuth: true,
        withPayment: true
      }
    };
  }

  /**
   * Step 3: Generate detailed project plan for user review & approval before generating code
   */
  static async generateProjectPlan(prompt, techSelection = {}) {
    const blueprint = await this.generateCompleteProject(prompt, techSelection);

    return {
      title: blueprint.title,
      prompt: blueprint.prompt,
      selectedTechnologies: {
        frontend: techSelection.frontend || blueprint.techStack?.frontend || 'React',
        backend: techSelection.backend || blueprint.techStack?.backend || 'Node.js + Express',
        database: techSelection.database || blueprint.techStack?.database || 'MongoDB',
        aiModel: techSelection.aiModel || 'Gemini',
        scope: techSelection.scope || 'Full-stack application',
        withAuth: techSelection.withAuth !== false,
        withPayment: techSelection.withPayment !== false
      },
      overview: blueprint.requirementsAnalysis?.overview || '',
      targetUsers: blueprint.requirementsAnalysis?.targetUsers || [],
      featuresAndModules: blueprint.requirementsAnalysis?.modules || [],
      folderStructure: blueprint.folderStructure || [],
      databaseDesign: blueprint.schemaDesign || {},
      apiDesign: blueprint.apiEndpoints || [],
      implementationSteps: blueprint.projectPlan?.milestones || [],
      deliverables: blueprint.projectPlan?.deliverables || []
    };
  }

  /**
   * Step 4: Builds full codebase based on approved plan
   */
  static async generateCompleteProject(prompt, techOptions = {}) {
    const p = (prompt || '').toLowerCase();
    let blueprint;

    // 1. Food Ordering
    if (p.includes('food') || p.includes('restaurant') || p.includes('menu') || (p.includes('order') && p.includes('cart') && !p.includes('shopping'))) {
      blueprint = getFoodOrderingBlueprint(techOptions);
    }
    // 2. Cricket / Sports Management
    else if (p.includes('cricket') || (p.includes('team') && p.includes('player') && (p.includes('match') || p.includes('score')))) {
      blueprint = getCricketBlueprint(techOptions);
    }
    // 3. E-Commerce / Online Shopping
    else if (p.includes('shopping') || p.includes('e-commerce') || p.includes('ecommerce') || p.includes('buy product')) {
      blueprint = getEcommerceBlueprint(techOptions);
    }
    // 4. Custom domain (Gemini AI + Universal Domain Engine)
    else {
      blueprint = await generateProjectBlueprint(prompt, techOptions);
    }

    // Guarantees all essential root package.json, client/index.html, Vite, Tailwind & DB fallback files are present
    return enrichWithFullScaffold(blueprint);
  }
}
