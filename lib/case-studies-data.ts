export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  duration: string;
  year: string;
  heroImage: string;
  description: string;
  challenge: {
    title: string;
    content: string;
  };
  process: {
    title: string;
    content: string;
    steps?: string[];
  };
  solution: {
    title: string;
    content: string;
    highlights?: string[];
  };
  impact: {
    title: string;
    content: string;
    metrics?: { label: string; value: string }[];
  };
  gallery: string[];
  backgroundColor: string;
  accentColor: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'card-1',
    slug: 'ova',
    title: 'Ova',
    subtitle: 'Period Tracking App',
    role: 'Product Design',
    duration: '3 months',
    year: '2023',
    heroImage: 'https://res.cloudinary.com/dky01erho/image/upload/v1760524296/6_3x_shots_so_y310gt.png',
    description: 'A privacy-first period tracking app designed to make wellness education feel less intimidating through friendly character design and conversational UI.',
    challenge: {
      title: 'The Challenge',
      content: 'Period tracking apps often feel clinical, invasive, or overly pink. Users wanted something that felt safe, private, and educational without being preachy or condescending. The challenge was creating an app that could discuss sensitive health topics in an approachable way while maintaining user trust around data privacy.'
    },
    process: {
      title: 'The Process',
      content: 'I started by researching existing period tracking apps and their pain points. User interviews revealed that many felt uncomfortable with overly feminine designs or clinical interfaces. The breakthrough came when I developed "ova" - an egg-shaped, gender-neutral character.',
      steps: [
        'Conducted user research and competitive analysis',
        'Developed the "ova" character concept through iterations',
        'Created a soft, approachable color palette',
        'Designed conversational UI patterns for health education',
        'Built a comprehensive design system around the character'
      ]
    },
    solution: {
      title: 'The Solution',
      content: 'Ova became more than a mascot - it became the voice of the app. Through ova, complex health information is delivered in digestible, friendly snippets. The character explains cycles, symptoms, and health tips from a caring but non-judgmental perspective.',
      highlights: [
        'Gender-neutral character design that appeals to all users',
        'Conversational UI that makes health education approachable',
        'Privacy-first approach with local data storage options',
        'Soft color palette that avoids stereotypical pink/feminine coding'
      ]
    },
    impact: {
      title: 'The Impact',
      content: 'The privacy-first approach and friendly character helped users feel comfortable tracking sensitive health data. The design reduced anxiety around period tracking and made the app feel like a supportive companion rather than a clinical tool.'
    },
    gallery: [
      'https://res.cloudinary.com/dky01erho/image/upload/v1760524296/6_3x_shots_so_y310gt.png'
    ],
    backgroundColor: '#FFF5F5',
    accentColor: '#E57373'
  },
  {
    id: 'card-2',
    slug: 'greex',
    title: 'Greex',
    subtitle: 'DeFi Trading Platform',
    role: 'Product Design',
    duration: '4 months',
    year: '2023',
    heroImage: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525138/172_2x_shots_so_plr79y.png',
    description: 'A DeFi trading platform focused on strategy-based options and futures trading, designed to simplify complex financial data while maintaining the depth professional traders need.',
    challenge: {
      title: 'The Challenge',
      content: 'Crypto trading interfaces are notoriously complex and intimidating. The challenge was simplifying financial data visualization while maintaining the depth that experienced traders require. We needed to serve both beginners learning DeFi and power users executing complex strategies.'
    },
    process: {
      title: 'The Process',
      content: 'I spent time with actual traders to understand their mental models and workflows. The key insight was that information hierarchy matters more than reducing information - traders need everything, just organized properly.',
      steps: [
        'Shadowed professional traders to understand workflows',
        'Mapped information hierarchy based on trading priority',
        'Designed progressive disclosure patterns',
        'Created dark mode interface optimized for long sessions',
        'Implemented keyboard shortcuts for power users'
      ]
    },
    solution: {
      title: 'The Solution',
      content: 'A clean, dark-mode interface with clear data visualization that prioritizes what traders need to see first. Strategy templates help beginners get started while power users get keyboard shortcuts and customizable views.',
      highlights: [
        'Dark mode interface optimized for extended trading sessions',
        'Strategy templates for beginners to learn complex trades',
        'Keyboard shortcuts for every common action',
        'Customizable dashboard layouts for different trading styles'
      ]
    },
    impact: {
      title: 'The Impact',
      content: 'The redesign simplified the learning curve for new traders while keeping advanced features accessible. The clean UI helped differentiate Greex in a crowded market of cluttered trading platforms.'
    },
    gallery: [
      'https://res.cloudinary.com/dky01erho/image/upload/v1760525138/172_2x_shots_so_plr79y.png'
    ],
    backgroundColor: '#0D1117',
    accentColor: '#00D395'
  },
  {
    id: 'card-3',
    slug: 'ioc',
    title: 'IOC',
    subtitle: 'Vendor Management Platform',
    role: 'Product Design, Team Lead',
    duration: '6 months',
    year: '2024',
    heroImage: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525270/190_2x_shots_so_gytftu.png',
    description: 'A complete redesign of a legacy enterprise vendor management system, transforming a 29-page complex workflow into an intuitive, role-based experience.',
    challenge: {
      title: 'The Challenge',
      content: 'The existing system was a 29-page legacy application serving 4 different user types: officers, engineers, vendors, and contractors. Each had different needs and permissions, but the old system treated everyone the same, leading to confusion, errors, and frustrated users.'
    },
    process: {
      title: 'The Process',
      content: 'I led a team to systematically map every user journey, identify pain points, and redesign flows. The key was simplifying without removing necessary complexity - every feature existed for a reason, we just needed to make it discoverable.',
      steps: [
        'Conducted stakeholder interviews with all 4 user types',
        'Mapped existing 29-page workflow and identified redundancies',
        'Created role-based personas and journey maps',
        'Designed modular components for different permission levels',
        'Established design system for enterprise scalability'
      ]
    },
    solution: {
      title: 'The Solution',
      content: 'Role-based dashboards that show each user type exactly what they need. Streamlined workflows reduced the 29-page process to intuitive steps. A modern UI with clear visual hierarchy made complex vendor management feel manageable.',
      highlights: [
        'Role-based dashboards tailored to 4 distinct user types',
        'Streamlined approval workflows with clear status tracking',
        'Modern design system built for enterprise scale',
        'Reduced training time through intuitive navigation'
      ]
    },
    impact: {
      title: 'The Impact',
      content: 'The redesign significantly reduced training time for new users and decreased support tickets. Users reported feeling more confident navigating the system, and the organization saw improved compliance with vendor management procedures.'
    },
    gallery: [
      'https://res.cloudinary.com/dky01erho/image/upload/v1760525270/190_2x_shots_so_gytftu.png'
    ],
    backgroundColor: '#F3E8FF',
    accentColor: '#8B5CF6'
  },
  {
    id: 'card-4',
    slug: 'dealdoc',
    title: 'Dealdoc',
    subtitle: 'Deal Management Platform',
    role: 'Product Design',
    duration: '3 months',
    year: '2024',
    heroImage: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525328/19_2x_shots_so_lio1is.png',
    description: 'Deal management platform enhancement featuring an AI command center and keyboard-first interface designed for sales power users.',
    challenge: {
      title: 'The Challenge',
      content: 'Sales teams were spending too much time clicking through menus instead of closing deals. Power users wanted keyboard-first interaction, but the existing interface was designed around mouse navigation. The challenge was creating a fast, efficient interface that predicted user needs.'
    },
    process: {
      title: 'The Process',
      content: 'I studied how power users actually work - they hate reaching for the mouse. Every click is friction. I designed around the principle that the best interface is one that anticipates what you need before you ask for it.',
      steps: [
        'Observed power users to identify friction points',
        'Mapped common action sequences and patterns',
        'Designed AI suggestion system based on context',
        'Created keyboard shortcut system for all actions',
        'Built minimal UI that stays out of the way'
      ]
    },
    solution: {
      title: 'The Solution',
      content: 'An AI command center with suggestion pills that predict common actions based on context. Developer-first UI with minimal design that emphasizes content over chrome. Everything is accessible via keyboard shortcuts.',
      highlights: [
        'AI-powered suggestion pills for common actions',
        'Complete keyboard shortcut coverage',
        'Minimal, developer-inspired UI aesthetic',
        'Context-aware command palette'
      ]
    },
    impact: {
      title: 'The Impact',
      content: 'Power users reported significant time savings in their daily workflows. The AI suggestions reduced decision fatigue during deal management, and the keyboard-first approach let users stay in flow without reaching for their mouse.'
    },
    gallery: [
      'https://res.cloudinary.com/dky01erho/image/upload/v1760525328/19_2x_shots_so_lio1is.png'
    ],
    backgroundColor: '#EFF6FF',
    accentColor: '#3B82F6'
  },
  {
    id: 'card-5',
    slug: 'ena',
    title: 'ENA',
    subtitle: 'Nurse Practitioner Platform',
    role: 'Product Design',
    duration: '4 months',
    year: '2024',
    heroImage: 'https://res.cloudinary.com/dky01erho/image/upload/v1760525270/190_2x_shots_so_gytftu.png',
    description: 'Course management platform for nurse practitioner certification, designed with precision and clarity for high-stakes healthcare education.',
    challenge: {
      title: 'The Challenge',
      content: 'Healthcare certification is high-stakes - students are preparing for careers where mistakes can cost lives. They needed a platform that felt professional and trustworthy while being easy to navigate. Any confusion in the interface could add unnecessary stress to an already demanding program.'
    },
    process: {
      title: 'The Process',
      content: 'Precision-focused design approach where every element needed to be clear and unambiguous. I worked closely with educators to understand the certification journey and identify where students typically felt lost or overwhelmed.',
      steps: [
        'Interviewed nursing students and instructors',
        'Mapped the certification journey and stress points',
        'Designed clear progress tracking systems',
        'Created calm, professional visual language',
        'Built accessibility-first component library'
      ]
    },
    solution: {
      title: 'The Solution',
      content: 'A clean, professional interface with crystal-clear progress tracking and organized course materials. The calm color palette reduces study anxiety while maintaining a sense of professionalism appropriate for healthcare.',
      highlights: [
        'Clear progress tracking across certification milestones',
        'Organized course materials with intuitive navigation',
        'Calm, professional color palette',
        'Accessibility-first design for diverse learners'
      ]
    },
    impact: {
      title: 'The Impact',
      content: 'Students reported feeling more confident in their learning journey. The clear structure helped them focus on content rather than navigation, and the professional aesthetic reinforced the seriousness of their certification path.'
    },
    gallery: [
      'https://res.cloudinary.com/dky01erho/image/upload/v1760525270/190_2x_shots_so_gytftu.png'
    ],
    backgroundColor: '#ECFDF5',
    accentColor: '#10B981'
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find(cs => cs.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return CASE_STUDIES.map(cs => cs.slug);
}

export function getAdjacentCaseStudies(currentSlug: string): { prev: CaseStudy | null; next: CaseStudy | null } {
  const currentIndex = CASE_STUDIES.findIndex(cs => cs.slug === currentSlug);

  return {
    prev: currentIndex > 0 ? (CASE_STUDIES[currentIndex - 1] ?? null) : null,
    next: currentIndex < CASE_STUDIES.length - 1 ? (CASE_STUDIES[currentIndex + 1] ?? null) : null
  };
}
