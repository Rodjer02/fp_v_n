export const site = {
  name: 'Rodjer',
  handle: 'fp_v_n',
  location: 'Kazakhstan',
  timezone: 'UTC+5',
  email: 'azamatkoyanbaev02@gmail.com',
  cv: '/CV_2.pdf',
  links: {
    telegram: 'https://t.me/fp_v_n',
    github: 'https://github.com/Rodjer02',
    linkedin: 'https://www.linkedin.com/in/rodjer'
  }
};

export const marqueeTop = ['HTML5', 'CSS3', 'Sass', 'Tailwind', 'Figma', 'React', 'Next.js', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript'];

export const marqueeBottom = [
  'JAVA', 'SPRING BOOT', 'POSTGRESQL', 'DOCKER', 'SWAGGER', 'POSTMAN', 'GIT', 'GITHUB', 'REDUX', 'RADIX UI',
  'GO', 'PYTHON', 'MSSQL', 'MYSQL', 'MONGODB', 'NEO4J', 'POWER BI', 'DAX', 'N8N', 'OPENROUTER'
];

export type Job = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  points: string[];
  stack: string[];
};

export const experience: Job[] = [
  {
    role: 'Software Engineer',
    company: 'KazDevLab',
    period: 'May 2025 — Present',
    current: true,
    points: [
      'Developing and scaling the AIBUY product.',
      'Contributing to architecture and product-level decisions.',
      'Implementing private and public integrations.',
      'Improved client bug-resolution speed by 60%.'
    ],
    stack: ['React', 'TypeScript', 'JavaScript', 'Radix UI', 'Java Spring Boot', 'PostgreSQL', 'AgentFlow']
  },
  {
    role: 'Frontend Developer',
    company: 'Prometeo Chain System',
    period: 'May 2024 — May 2025',
    points: [
      'Built frontend for a logistics product using React/Next.js.',
      'Implemented state management with Redux and API flows via Axios.',
      'Collaborated with backend and analytics in a product team.'
    ],
    stack: ['React', 'Next.js', 'Redux', 'Axios']
  },
  {
    role: 'Frontend Developer',
    company: 'ABC Design',
    period: 'Aug 2023 — May 2024',
    points: [
      'Built websites with HTML/CSS/SCSS/JavaScript.',
      'Migrated and adapted projects to CMS platforms (October, Joomla, OpenCart).'
    ],
    stack: ['HTML', 'CSS', 'SCSS', 'JavaScript', 'CMS']
  }
];

export type Project = {
  id: 'ding' | 'driver' | 'yarda' | 'events';
  title: string;
  status: string;
  tone: 'acc' | 'violet' | 'amber' | 'plain';
  description: string;
  stack: string[];
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    id: 'ding',
    title: 'ding',
    status: 'LIVE · SAAS',
    tone: 'acc',
    description:
      'QR ordering for cafes in Kazakhstan: a guest scans the table QR and orders, the waiter gets a real-time “ding”. Admin panel, superadmin with 2FA and billing.',
    stack: ['Go', 'PostgreSQL', 'SSE', 'React 19', 'Docker', 'Playwright'],
    link: { label: 'ding.kz', href: 'https://ding.kz' }
  },
  {
    id: 'driver',
    title: 'Driver Diary',
    status: 'FULL-STACK',
    tone: 'violet',
    description:
      'Shift diary for taxi drivers and couriers: trips, earnings, platform fee, cash vs card. Duplicate protection at the DB level, tested with concurrent requests.',
    stack: ['Go', 'PostgreSQL', 'Next.js', 'TypeScript', 'Docker'],
    link: { label: 'GitHub', href: 'https://github.com/Rodjer02/driver-diary' }
  },
  {
    id: 'yarda',
    title: 'YARD’A',
    status: 'CLIENT',
    tone: 'plain',
    description:
      'Online QR menu for the YARD’A food bar in Kokshetau: categories, dishes with variants and prices, contacts and map. Statically generated, menu edited via JSON.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
    link: { label: 'GitHub', href: 'https://github.com/Rodjer02/yarda' }
  },
  {
    id: 'events',
    title: 'Event Manager',
    status: 'PET / TAKE-HOME',
    tone: 'amber',
    description: 'CRUD app for managing events: filters, sorting, search, pagination, favorites.',
    stack: ['Next.js', 'Zustand', 'Zod'],
    link: { label: 'GitHub', href: 'https://github.com/Rodjer02/event_manager' }
  }
];
