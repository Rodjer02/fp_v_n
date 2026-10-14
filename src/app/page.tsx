import type { CSSProperties, ReactNode } from 'react';
import Effects from '@/components/Effects';
import { experience, marqueeBottom, marqueeTop, projects, site, type Project } from '@/content/site';

const vars = (v: Record<string, string | number>) => v as CSSProperties;

const ArrowUpRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const Star = () => (
  <svg className="star" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
  </svg>
);

const aiCards: Array<{ title: string; text: string; icon: ReactNode }> = [
  {
    title: 'Multi-agent systems',
    text: 'Designing systems where several AI agents split a task, pass context to each other and assemble one result.',
    icon: (
      <>
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="5" cy="18" r="2.5" />
        <circle cx="19" cy="18" r="2.5" />
        <path d="M10.8 7.2L6.2 15.8M13.2 7.2l4.6 8.6M7.5 18h9" />
      </>
    )
  },
  {
    title: 'OpenRouter',
    text: 'One integration for many model providers — choosing the right model for each task and switching between them.',
    icon: (
      <>
        <circle cx="5" cy="12" r="2.5" />
        <path d="M7.5 12H12M12 12l7-6M12 12h7M12 12l7 6" />
        <circle cx="20" cy="6" r="1.5" />
        <circle cx="20" cy="12" r="1.5" />
        <circle cx="20" cy="18" r="1.5" />
      </>
    )
  },
  {
    title: 'Local models',
    text: 'Running self-hosted LLMs and wiring them into products alongside cloud models.',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="7" rx="2" />
        <rect x="3" y="13" width="18" height="7" rx="2" />
        <path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6" />
      </>
    )
  },
  {
    title: 'n8n automation',
    text: 'Building workflows that connect AI agents, APIs and services into automated pipelines.',
    icon: (
      <>
        <rect x="2" y="9" width="6" height="6" rx="1.5" />
        <rect x="16" y="3" width="6" height="6" rx="1.5" />
        <rect x="16" y="15" width="6" height="6" rx="1.5" />
        <path d="M8 12h3c1.5 0 2-1 2.5-3S15 6 16 6M11 12c1.5 0 2 1 2.5 3s1.5 3 2.5 3" />
      </>
    )
  }
];

function Cover({ id }: { id: Project['id'] }) {
  switch (id) {
    case 'ding':
      return (
        <>
          <div className="cover-glow" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(109,92,255,.35), transparent 55%)' }} />
          <div className="bubble dark l" style={{ top: 34 }}>Table 3 · Beshbarmak ×2, Plov ×1</div>
          <div className="bubble hl r" style={{ top: 92 }}>ding! New order · Table 3 · 11 800 ₸</div>
          <div className="bubble dark l" style={{ top: 160 }}>Waiter call · Table 7</div>
          <div className="bubble dark r typing" style={{ top: 214 }}>
            <span />
            <span />
            <span />
          </div>
        </>
      );
    case 'driver':
      return (
        <>
          <div className="cover-glow" style={{ background: 'radial-gradient(circle at 80% 30%, rgba(198,244,50,.18), transparent 55%)' }} />
          <div className="bars">
            <div style={{ height: '38%' }} />
            <div style={{ height: '55%' }} />
            <div style={{ height: '47%' }} />
            <div className="hi" style={{ height: '72%' }} />
            <div className="hi" style={{ height: '64%' }} />
            <div className="top" style={{ height: '100%' }} />
          </div>
          <div className="mono cover-note">
            <span>
              <span className="dot" />
              Today · 14 trips · 28 400 ₸
            </span>
            <span className="sub">take-home 23 860 ₸ · cash 40%</span>
          </div>
        </>
      );
    case 'yarda':
      return (
        <>
          <div className="cover-glow" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(245,185,113,.2), transparent 60%)' }} />
          <div className="cover-center">
            <div className="disp cover-word">YARD’A</div>
            <div className="mono cover-chips">
              <span>Breakfast</span>
              <span>Grill</span>
              <span className="on">Bar</span>
              <span>Desserts</span>
            </div>
            <div className="swatches">
              <span style={{ background: '#ECEAE3' }} />
              <span style={{ background: '#F5B971' }} />
              <span style={{ background: 'var(--acc)' }} />
            </div>
          </div>
        </>
      );
    case 'events': {
      const cells: Array<'' | 'on' | 'half'> = [
        '', '', 'on', '', '', '', '',
        '', '', '', '', 'half', '', '',
        '', 'half', '', '', '', '', 'on',
        '', '', '', '', '', '', ''
      ];
      return (
        <>
          <div className="cover-glow" style={{ background: 'radial-gradient(circle at 30% 80%, rgba(245,185,113,.18), transparent 55%)' }} />
          <div className="cover-top">
            <div className="search">
              <div>Search events…</div>
              <div />
            </div>
            <div className="cal">
              {cells.map((c, i) => (
                <span key={i} className={c || undefined} />
              ))}
            </div>
          </div>
        </>
      );
    }
  }
}

export default function Home() {
  const name = site.name;

  return (
    <div id="pf-root" className="pf anim-on">
      <div className="grain" />
      <div className="spot" />
      <div className="progress" />
      <Effects />

      <header className="topbar">
        <nav className="wrap topnav" aria-label="Main navigation">
          <a href="#home" className="mono logo">
            {site.handle}
            <span className="cursor" />
          </a>
          <div className="navlinks">
            <a className="nav-link" href="#home">Home</a>
            <a className="nav-link" href="#experience">Experience</a>
            <a className="nav-link" href="#projects">Projects</a>
            <a className="nav-link" href="#contact">Contact</a>
            <a className="btn btn-acc" href={site.cv} target="_blank" rel="noopener noreferrer">
              Open CV
              <ArrowUpRight />
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section id="home">
          <div className="gridbg" />
          <div className="orb a" />
          <div className="orb b" />
          <canvas id="gl-hero" className="gl" aria-hidden="true" />
          <div className="wrap hero-inner">
            <div className="hero-text">
              <div className="mono rise hero-eyebrow">
                <span className="acc">{'// PORTFOLIO 2026'}</span>
                <span>KAZAKHSTAN</span>
              </div>
              <h1 className="disp hero-title" aria-label={name}>
                {[...name].map((c, i) => (
                  <span key={i} className="ch" style={vars({ '--i': i })} aria-hidden="true">
                    {c}
                  </span>
                ))}
                <span className="ch acc" style={vars({ '--i': name.length })} aria-hidden="true">
                  .
                </span>
              </h1>
              <div className="disp rise d2 hero-role">
                <span>Software Engineer</span>
                <br />
                <span className="outline">/ Frontend Developer</span>
              </div>
              <p className="rise d3 hero-lead">
                Software Engineer with commercial experience in React/Angular and backend tasks with Java/Spring Boot. I also build
                multi-agent AI systems — via OpenRouter, local models and n8n workflows.
              </p>
              <div className="rise d4 hero-cta">
                <a className="btn btn-acc" href="#projects">See projects</a>
                <a className="btn btn-ghost" href="#contact">Get in touch</a>
                <div className="avail">
                  <span className="dot" />
                  <span>Available: remote / hybrid / office</span>
                </div>
              </div>
            </div>

            <div className="hero-media">
              <div className="par portrait">
                <svg className="ring" viewBox="0 0 300 300" aria-hidden="true">
                  <defs>
                    <path id="circ" d="M150,150 m-132,0 a132,132 0 1,1 264,0 a132,132 0 1,1 -264,0" />
                  </defs>
                  <text fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="4.6" fill="#A3A6AF">
                    <textPath href="#circ">REACT ✦ ANGULAR ✦ TYPESCRIPT ✦ JAVA / SPRING BOOT ✦ POSTGRESQL ✦ </textPath>
                  </text>
                </svg>
                <div className="blob blob-frame">
                  <div className="blob blob-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/rodjer.png" alt="Rodjer sitting on a chair, smiling" />
                  </div>
                </div>
                <div className="chip-float f1" style={{ top: '6%', left: '-14%' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" style={{ color: '#61DAFB' }}>
                    <ellipse cx="12" cy="12" rx="10" ry="4" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
                  </svg>
                  <span>React / Next.js</span>
                </div>
                <div className="chip-float f2" style={{ bottom: '16%', left: '-18%' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" style={{ color: '#FF5A6B' }}>
                    <path d="M12 2l9 3.5-1.4 12L12 22l-7.6-4.5L3 5.5z" />
                    <path d="M12 6l-4.5 10M12 6l4.5 10M9 13h6" />
                  </svg>
                  <span>Angular</span>
                </div>
                <div className="chip-float f3" style={{ top: '42%', right: '-16%' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" style={{ color: '#7CDB5A' }}>
                    <path d="M20 4c-9 0-15 4-15 11 0 2 1 4 2 5 1-5 4-8 9-10-4 3-6 6-7 10 8 1 12-6 11-16z" />
                  </svg>
                  <span>Spring Boot</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Tech stack" className="marquee">
          <div className="band band-acc">
            <div className="marq l disp">
              {[0, 1].map((k) => (
                <div key={k} className="marq-item" aria-hidden={k === 1 || undefined}>
                  {marqueeTop.map((t) => (
                    <span key={t} style={{ display: 'contents' }}>
                      <span>{t}</span>
                      <Star />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="band band-dark">
            <div className="marq r mono">
              {[0, 1].map((k) => (
                <div key={k} className="marq-item" aria-hidden={k === 1 || undefined}>
                  {marqueeBottom.map((t) => (
                    <span key={t} style={{ display: 'contents' }}>
                      <span>{t}</span>
                      <span className="sep">/</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap stats">
          <div className="stats-grid">
            <div className="stat reveal">
              <div className="disp stat-num">
                <span className="count" style={vars({ '--to': 3 })} />
                <span className="acc">+</span>
              </div>
              <div className="stat-label">years of commercial development</div>
            </div>
            <div className="stat reveal">
              <div className="disp stat-num">
                <span className="count" style={vars({ '--to': 60 })} />
                <span className="acc">%</span>
              </div>
              <div className="stat-label">faster client bug resolution at KazDevLab</div>
            </div>
            <div className="stat reveal">
              <div className="disp stat-flow">
                UI <span className="acc">→</span> API <span className="acc">→</span> DB
              </div>
              <div className="stat-label">from React screens to Spring Boot and PostgreSQL</div>
            </div>
          </div>
        </section>

        <section id="ai" className="wrap sec">
          <canvas id="gl-ai" className="gl" aria-hidden="true" />
          <div className="sec-head">
            <div className="sec-head-l">
              <span className="mono kicker">AI ENGINEERING</span>
              <h2 className="disp sec-title">
                Agents that
                <br />
                <span className="outline">work together</span>
              </h2>
            </div>
            <div className="mono flow" aria-hidden="true">
              <div className="node orch">orchestrator</div>
              <div className="wire" />
              <div className="flow-agents">
                <div className="node">agent · research</div>
                <div className="node">agent · code</div>
                <div className="node">agent · review</div>
              </div>
              <div className="wire" />
              <div className="node result">result</div>
            </div>
          </div>
          <div className="ai-grid">
            {aiCards.map((c) => (
              <article key={c.title} className="ai-card reveal">
                <div className="ai-ico">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {c.icon}
                  </svg>
                </div>
                <h3 className="disp card-h">{c.title}</h3>
                <p className="card-p">{c.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="wrap sec">
          <div className="sec-head">
            <div className="sec-head-l">
              <span className="mono kicker">01 — EXPERIENCE</span>
              <h2 className="disp sec-title">
                Where I’ve
                <br />
                <span className="outline">shipped code</span>
              </h2>
            </div>
            <div className="mono pill">
              <span className="dot" />
              <span>3+ years</span>
            </div>
          </div>

          {experience.map((job, i) => (
            <article key={job.company} className="exp reveal">
              <div className="exp-num disp">{String(i + 1).padStart(2, '0')}</div>
              <div className="exp-body">
                <div className="exp-head">
                  <h3 className="disp exp-role">{job.role}</h3>
                  <div className="exp-company">{job.company}</div>
                </div>
                <ul className="exp-list">
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="tags">
                  {job.stack.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>
              <div className="mono exp-when">
                <span>{job.period}</span>
                {job.current && (
                  <span className="exp-current">
                    <span className="dot" />
                    Current
                  </span>
                )}
              </div>
            </article>
          ))}
        </section>

        <section id="projects" className="wrap sec">
          <div className="sec-head">
            <div className="sec-head-l">
              <span className="mono kicker">02 — PROJECTS</span>
              <h2 className="disp sec-title">
                Things I’m
                <br />
                <span className="outline">building</span>
              </h2>
            </div>
            <p className="sec-note">Product work, client sites and pet projects.</p>
          </div>

          <div className="proj-grid">
            {projects.map((p) => (
              <article key={p.id} className="card reveal">
                <div className="cover" aria-hidden="true">
                  <Cover id={p.id} />
                </div>
                <div className="card-body">
                  <div className="card-meta">
                    <span className={`mono tag ${p.tone === 'plain' ? '' : p.tone}`}>{p.status}</span>
                    {p.link && (
                      <a className="mono" href={p.link.href} target="_blank" rel="noopener noreferrer">
                        {p.link.label} ↗
                      </a>
                    )}
                  </div>
                  <h3 className="disp card-title">{p.title}</h3>
                  <p className="card-p">{p.description}</p>
                  <div className="tags">
                    {p.stack.map((s) => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact">
          <div className="orb a" />
          <canvas id="gl-contact" className="gl" aria-hidden="true" />
          <div className="wrap contact-inner">
            <div className="contact-l">
              <span className="mono kicker">03 — CONTACT</span>
              <h2 className="disp contact-title">
                Let’s build
                <br />
                <span className="acc">something.</span>
              </h2>
              <a className="disp big-link contact-email" href={`mailto:${site.email}`}>
                {site.email} ↗
              </a>
            </div>
            <div className="contact-r">
              <a className="soc" href={site.links.telegram} target="_blank" rel="noopener noreferrer">
                <span>Telegram</span>
                <span className="arr" aria-hidden="true">↗</span>
              </a>
              <a className="soc" href={site.links.github} target="_blank" rel="noopener noreferrer">
                <span>GitHub</span>
                <span className="arr" aria-hidden="true">↗</span>
              </a>
              <a className="soc" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
                <span>LinkedIn</span>
                <span className="arr" aria-hidden="true">↗</span>
              </a>
              <a className="soc last" href={site.cv} download>
                <span>Download CV</span>
                <span className="arr" aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <footer className="mono wrap foot">
            <span>
              © {new Date().getFullYear()} {name} · {site.handle}
            </span>
            <span>
              {site.location} · {site.timezone}
            </span>
          </footer>
        </section>
      </main>
    </div>
  );
}
