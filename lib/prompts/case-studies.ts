export interface CaseStudyContext {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  duration: string;
  year: string;
  description: string;
  challenge: string;
  process: string;
  solution: string;
  impact: string;
  keywords: string[];
  image: string;
}

export const CASE_STUDIES_CONTEXT: CaseStudyContext[] = [
  {
    id: 'card-1',
    slug: 'ova',
    title: 'Ova',
    subtitle: 'Period Tracking App',
    role: 'Product Design',
    duration: '3 months',
    year: '2023',
    description: 'A privacy-first period tracking app designed to make wellness education feel less intimidating.',
    challenge: 'Period tracking apps often feel clinical or invasive. Users wanted something that felt safe, private, and educational without being preachy.',
    process: 'I created "ova" - an egg-shaped, gender-neutral character that explains menstrual cycles gently. The approach was to make complex health info digestible through friendly illustrations and conversational UI.',
    solution: 'Built a complete design system around the ova character, with soft colors, rounded shapes, and a warm tone of voice. The app explains cycles, symptoms, and health tips through ova\'s perspective.',
    impact: 'The privacy-first approach and friendly character helped users feel comfortable tracking sensitive health data. The design reduced anxiety around period tracking.',
    keywords: ['ova', 'period', 'tracking', 'health', 'wellness', 'privacy', 'menstrual', 'cycle'],
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760524296/6_3x_shots_so_y310gt.png'
  },
  {
    id: 'card-2',
    slug: 'greex',
    title: 'Greex',
    subtitle: 'DeFi Trading Platform',
    role: 'Product Design',
    duration: '4 months',
    year: '2023',
    description: 'A DeFi trading platform focused on strategy-based options and futures trading.',
    challenge: 'Crypto trading interfaces are notoriously complex. The challenge was simplifying financial data visualization while maintaining the depth traders need.',
    process: 'I focused on information hierarchy - what do traders need to see first vs. what can be progressive disclosure. Worked closely with traders to understand their mental models.',
    solution: 'Created a clean, dark-mode interface with clear data visualization. Strategy templates help beginners while power users get keyboard shortcuts and advanced views.',
    impact: 'Simplified the learning curve for new traders while keeping advanced features accessible. The clean UI helped differentiate Greex in a crowded market.',
    keywords: ['greex', 'defi', 'trading', 'crypto', 'platform', 'options', 'futures', 'finance', 'blockchain'],
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525138/172_2x_shots_so_plr79y.png'
  },
  {
    id: 'card-3',
    slug: 'ioc',
    title: 'IOC',
    subtitle: 'Vendor Management Platform',
    role: 'Product Design, Team Lead',
    duration: '6 months',
    year: '2024',
    description: 'Enterprise vendor management system redesign for a major organization.',
    challenge: 'A legacy 29-page system serving 4 different user types (officers, engineers, vendors, contractors). The old system was confusing and inefficient.',
    process: 'Led a team to map all user journeys, identify pain points, and redesign flows. We simplified without removing necessary complexity - every feature had a reason to exist.',
    solution: 'Rebuilt the entire system with role-based dashboards, streamlined workflows, and a modern UI. Reduced cognitive load while maintaining all functionality.',
    impact: 'Significantly reduced training time for new users. The redesign made complex vendor management feel manageable.',
    keywords: ['ioc', 'vendor', 'management', 'enterprise', 'b2b', 'saas', 'platform', 'dashboard'],
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525270/190_2x_shots_so_gytftu.png'
  },
  {
    id: 'card-4',
    slug: 'dealdoc',
    title: 'Dealdoc',
    subtitle: 'Deal Management Platform',
    role: 'Product Design',
    duration: '3 months',
    year: '2024',
    description: 'Deal management platform enhancement with AI-powered features.',
    challenge: 'Sales teams needed a faster way to manage deals without clicking through endless menus. They wanted keyboard-first interaction.',
    process: 'Studied how power users work - they hate mice. Designed an AI command center with suggestion pills for common actions, keyboard shortcuts for everything.',
    solution: 'Built a developer-first UI with minimal design. The AI command center predicts what users need and offers quick actions. Everything is accessible via keyboard.',
    impact: 'Power users reported significant time savings. The AI suggestions reduced decision fatigue during deal management.',
    keywords: ['dealdoc', 'deal', 'management', 'sales', 'b2b', 'ai', 'saas', 'crm'],
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525328/19_2x_shots_so_lio1is.png'
  },
  {
    id: 'card-5',
    slug: 'ena',
    title: 'ENA',
    subtitle: 'Nurse Practitioner Platform',
    role: 'Product Design',
    duration: '4 months',
    year: '2024',
    description: 'Course management platform for nurse practitioner certification.',
    challenge: 'Healthcare certification is high-stakes. Students needed a platform that felt professional and trustworthy while being easy to navigate.',
    process: 'Precision-focused design approach. Every element needed to be clear and unambiguous - no room for confusion in healthcare education.',
    solution: 'Clean, professional interface with clear progress tracking, organized course materials, and a calm color palette that reduces study anxiety.',
    impact: 'Students reported feeling more confident in their learning journey. The clear structure helped them focus on content rather than navigation.',
    keywords: ['ena', 'nurse', 'healthcare', 'education', 'course', 'certification', 'medical', 'learning'],
    image: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525270/190_2x_shots_so_gytftu.png'
  }
];

export const CASE_STUDIES_PROMPT = `
## Your Projects (reference these when asked about your work)

### OVA - Period Tracking App
Privacy-first period tracking with "ova" character (egg-shaped, gender-neutral). Made wellness education feel less intimidating through friendly illustrations and conversational UI.

### GREEX - DeFi Trading Platform
Strategy-based options/futures trading. Simplified complex financial data visualization. Dark-mode interface with clear hierarchy, keyboard shortcuts for power users.

### IOC - Vendor Management Platform
Led team to redesign 29-page legacy system for 4 user types. Role-based dashboards, streamlined workflows. Enterprise B2B SaaS.

### DEALDOC - Deal Management Platform
AI command center with suggestion pills. Developer-first, keyboard-focused UI. Minimal design for power users.

### ENA - Nurse Practitioner Platform
Healthcare certification course management. Precision-focused, high-stakes design. Clear progress tracking, professional interface.

## Leadership Experience
At Doodleblue (late 2024): Led 12-person design team, managed IOC/ENA/INAM clients, established design center of excellence for junior designers.
`;
