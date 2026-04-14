import { Component, computed } from '@angular/core';

type ProjectPhase = 'design' | 'build' | 'testing';

type PortfolioContent = {
  meta: {
    name: string;
    role: string;
    location: string;
    availability: string;
    heroLabel: string;
    github: string;
  };
  sections: {
    home: string;
    about: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
  };
  hero: {
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    photoHint: string;
  };
  about: {
    title: string;
    body: string;
    highlights: string[];
  };
  experience: {
    title: string;
    items: Array<{
      company: string;
      role: string;
      period: string;
      points: string[];
      stack: string;
    }>;
  };
  projects: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      tags: string[];
      phase: ProjectPhase;
      phaseLabel: string;
      progress: number;
      eta: string;
    }>;
  };
  skills: {
    title: string;
    groups: Array<{ group: string; items: string[] }>;
  };
  contact: {
    title: string;
    text: string;
    email: string;
    cvLabel: string;
  };
};

const PORTFOLIO_CONTENT: Record<'ru' | 'en', PortfolioContent> = {
  ru: {
    meta: {
      name: 'Rodjer',
      role: 'Middle Software Engineer / Frontend Developer',
      location: 'Kazakhstan',
      availability: 'Доступен: remote / hybrid / office',
      heroLabel: 'Portfolio 2026',
      github: 'https://github.com/Rodjer02'
    },
    sections: {
      home: 'Главная',
      about: 'Обо мне',
      experience: 'Опыт',
      projects: 'Проекты',
      skills: 'Скиллы',
      contact: 'Контакты'
    },
    hero: {
      lead:
        'Software Engineer с коммерческим опытом в React/Angular и backend-задачах на Java/Spring Boot.',
      ctaPrimary: 'Смотреть проекты',
      ctaSecondary: 'Связаться',
      photoHint: 'Здесь будет твоя фотография'
    },
    about: {
      title: 'Обо мне',
      body:
        'Работаю в продуктовых командах, участвую в архитектурных решениях, интеграциях и улучшении клиентского опыта.',
      highlights: [
        'Ускорил скорость решения клиентских багов на 60% на текущем проекте.',
        'Коммерческий опыт с React, Angular, Next.js, TypeScript.',
        'Уверенно работаю на стыке frontend и backend (Java/Spring Boot).'
      ]
    },
    experience: {
      title: 'Опыт',
      items: [
        {
          company: 'KazDevLab',
          role: 'Software Engineer',
          period: 'Май 2025 - настоящее время',
          points: [
            'Разработка и развитие продукта AIBUY.',
            'Участие в архитектурных и продуктовых решениях.',
            'Внедрение приватных и публичных интеграций.',
            'Улучшение скорости решения клиентских багов на 60%.'
          ],
          stack: 'React, TypeScript, JavaScript, Radix UI, Java Spring Boot, PostgreSQL, AgentFlow'
        },
        {
          company: 'Prometeo Chain System',
          role: 'Frontend Developer',
          period: 'Май 2024 - Май 2025',
          points: [
            'Разработка frontend-части логистического проекта на React/Next.js.',
            'Реализация управления состоянием (Redux), reducers и API-запросов (Axios).',
            'Взаимодействие с backend и аналитикой в рамках командной разработки.'
          ],
          stack: 'React, Next.js, Redux, Axios'
        },
        {
          company: 'ABC Design',
          role: 'Frontend Developer',
          period: 'Август 2023 - Май 2024',
          points: [
            'Разработка сайтов на HTML/CSS/SCSS/JavaScript.',
            'Перенос и адаптация проектов на CMS (October, Joomla, OpenCart).'
          ],
          stack: 'HTML, CSS, SCSS, JavaScript, CMS'
        }
      ]
    },
    projects: {
      title: 'Проекты в разработке',
      subtitle: 'Roadmap активных продуктов',
      items: [
        {
          title: 'Agent Chat Platform v2',
          description: 'Новый интерфейс чатов с AI-агентами, памятью диалогов и ускоренной навигацией по сессиям.',
          tags: ['Angular', 'TypeScript', 'WebSocket'],
          phase: 'build',
          phaseLabel: 'Разработка',
          progress: 62,
          eta: 'ETA: июнь 2026'
        },
        {
          title: 'Sales Bot Copilot',
          description: 'AI-помощник для операторов с подсказками по ответам и приоритетной маршрутизацией лидов.',
          tags: ['NLP', 'Prompting', 'CRM'],
          phase: 'testing',
          phaseLabel: 'Тестирование',
          progress: 84,
          eta: 'ETA: май 2026'
        },
        {
          title: 'Logistics Vision Board',
          description: 'Мониторинг логистики в реальном времени с единой панелью событий и картой ключевых зон риска.',
          tags: ['Dashboard', 'Analytics', 'API'],
          phase: 'design',
          phaseLabel: 'Дизайн',
          progress: 31,
          eta: 'ETA: Q3 2026'
        }
      ]
    },
    skills: {
      title: 'Технический стек',
      groups: [
        {
          group: 'Frontend',
          items: ['React', 'Angular', 'Next.js', 'TypeScript', 'JavaScript', 'SCSS', 'Tailwind CSS', 'Figma', 'RxJS', 'Redux', 'Zustand']
        },
        {
          group: 'Backend',
          items: ['Java', 'Spring Boot (17-21)', 'REST API', 'PostgreSQL', 'Docker', 'Swagger', 'Postman']
        },
        {
          group: 'Core',
          items: ['HTML', 'CSS', 'SCSS', 'Cross-browser layout']
        }
      ]
    },
    contact: {
      title: 'Контакты',
      text: 'Открыт к новым продуктовым задачам и сильным командам.',
      email: 'youremail@example.com',
      cvLabel: 'Скачать CV (PDF)'
    }
  },
  en: {
    meta: {
      name: 'Rodjer',
      role: 'Middle Software Engineer / Frontend Developer',
      location: 'Kazakhstan',
      availability: 'Available: remote / hybrid / office',
      heroLabel: 'Portfolio 2026',
      github: 'https://github.com/Rodjer02'
    },
    sections: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact'
    },
    hero: {
      lead:
        'Software Engineer with commercial experience in React/Angular and backend tasks with Java/Spring Boot.',
      ctaPrimary: 'View Projects',
      ctaSecondary: 'Contact Me',
      photoHint: 'Your portrait goes here'
    },
    about: {
      title: 'About',
      body:
        'I work in product teams, contribute to architecture decisions, integrations, and customer experience quality.',
      highlights: [
        'Improved client bug-resolution speed by 60% on the current product.',
        'Commercial experience with React, Angular, Next.js, and TypeScript.',
        'Strong frontend + backend collaboration with Java/Spring Boot.'
      ]
    },
    experience: {
      title: 'Experience',
      items: [
        {
          company: 'KazDevLab',
          role: 'Software Engineer',
          period: 'May 2025 - Present',
          points: [
            'Developing and scaling the AIBUY product.',
            'Contributing to architecture and product-level decisions.',
            'Implementing private and public integrations.',
            'Improved client bug-resolution speed by 60%.'
          ],
          stack: 'React, TypeScript, JavaScript, Radix UI, Java Spring Boot, PostgreSQL, AgentFlow'
        },
        {
          company: 'Prometeo Chain System',
          role: 'Frontend Developer',
          period: 'May 2024 - May 2025',
          points: [
            'Built frontend for a logistics product using React/Next.js.',
            'Implemented state management with Redux and API flows via Axios.',
            'Collaborated with backend and analytics in a product team.'
          ],
          stack: 'React, Next.js, Redux, Axios'
        },
        {
          company: 'ABC Design',
          role: 'Frontend Developer',
          period: 'August 2023 - May 2024',
          points: [
            'Built websites with HTML/CSS/SCSS/JavaScript.',
            'Migrated and adapted projects to CMS platforms (October, Joomla, OpenCart).'
          ],
          stack: 'HTML, CSS, SCSS, JavaScript, CMS'
        }
      ]
    },
    projects: {
      title: 'Projects In Progress',
      subtitle: 'Current product roadmap',
      items: [
        {
          title: 'Agent Chat Platform v2',
          description: 'A new chat workspace for AI agents with conversation memory and faster session navigation.',
          tags: ['Angular', 'TypeScript', 'WebSocket'],
          phase: 'build',
          phaseLabel: 'Build',
          progress: 62,
          eta: 'ETA: June 2026'
        },
        {
          title: 'Sales Bot Copilot',
          description: 'An AI assistant for operators with smart reply hints and priority lead routing.',
          tags: ['NLP', 'Prompting', 'CRM'],
          phase: 'testing',
          phaseLabel: 'Testing',
          progress: 84,
          eta: 'ETA: May 2026'
        },
        {
          title: 'Logistics Vision Board',
          description: 'A real-time logistics monitor with a unified event board and risk-zone map.',
          tags: ['Dashboard', 'Analytics', 'API'],
          phase: 'design',
          phaseLabel: 'Design',
          progress: 31,
          eta: 'ETA: Q3 2026'
        }
      ]
    },
    skills: {
      title: 'Tech Stack',
      groups: [
        {
          group: 'Frontend',
          items: ['React', 'Angular', 'Next.js', 'TypeScript', 'JavaScript', 'SCSS', 'Tailwind CSS', 'Figma', 'RxJS', 'Redux', 'Zustand']
        },
        {
          group: 'Backend',
          items: ['Java', 'Spring Boot (17-21)', 'REST API', 'PostgreSQL', 'Docker', 'Swagger', 'Postman']
        },
        {
          group: 'Core',
          items: ['HTML', 'CSS', 'SCSS', 'Cross-browser layout']
        }
      ]
    },
    contact: {
      title: 'Contact',
      text: 'Open to product-focused opportunities and strong engineering teams.',
      email: 'azamatkoyanbaev02@gmail.com',
      cvLabel: 'Download CV (PDF)'
    }
  }
};

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly data = computed(() => PORTFOLIO_CONTENT.en);
  protected readonly sections = computed(() => this.data().sections);
  protected readonly year = new Date().getFullYear();
}





