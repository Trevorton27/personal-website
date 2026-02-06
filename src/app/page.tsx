"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setIsDark(saved === "dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-black text-slate-50" : "bg-white text-slate-900"}`}>
      {/* Navigation - Simplified */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300 ${
        isDark ? "bg-black/80" : "bg-white/80"
      }`}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3 font-medium">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
            <span>Trevor Mearns</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            {["About", "Work", "Writing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-colors duration-200 ${
                  isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item}
              </a>
            ))}
            <a href="/resume" className={`transition-colors duration-200 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>
              Resume
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDark ? "hover:bg-white/10 text-slate-400" : "hover:bg-slate-100 text-slate-600"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <a
              href="#contact"
              className="inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover shadow-accent hover:shadow-accent-lg"
            >
              Get in touch
            </a>
          </div>
        </div>
      </header>

      {/* Hero - Cleaner, more editorial */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-3xl">
          {/* Status badge - subtle */}
          <div className={`mb-8 inline-flex items-center gap-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Open to Cloud Support & Solutions roles
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Bilingual technical problem-solver bridging{" "}
            <span className="text-accent">cloud, code, and customers</span>.
          </h1>

          <p className={`mt-8 text-lg md:text-xl leading-relaxed max-w-2xl ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            I help teams ship reliable software by debugging complex systems, improving integrations,
            and turning fuzzy requirements into working solutions—across English and Japanese.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover shadow-accent hover:shadow-accent-lg"
            >
              View my work
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/resume"
              className={`inline-flex items-center rounded-lg px-5 py-3 text-sm font-medium transition-colors duration-200 ${
                isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Download resume →
            </a>
          </div>
        </div>

        {/* Minimal identity block - right aligned on desktop */}
        <div className={`mt-16 md:mt-20 flex flex-wrap gap-x-12 gap-y-4 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          <div>
            <span className={`block mb-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}>Location</span>
            <span className={isDark ? "text-slate-200" : "text-slate-800"}>Japan (UTC+9)</span>
          </div>
          <div>
            <span className={`block mb-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}>Languages</span>
            <span className={isDark ? "text-slate-200" : "text-slate-800"}>English, Japanese</span>
          </div>
          <div>
            <span className={`block mb-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}>Focus</span>
            <span className={isDark ? "text-slate-200" : "text-slate-800"}>Cloud Support, Full-Stack</span>
          </div>
          <div className="flex gap-4 items-end">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-slate-900"}`}>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/trevor-mearns/" target="_blank" rel="noreferrer" className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-slate-900"}`}>
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className={`mx-auto max-w-5xl px-6`}>
        <div className={`h-px ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
      </div>

      {/* About - Typographic, no cards */}
      <section id="about" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className={`text-sm font-medium tracking-wide uppercase mb-8 ${isDark ? "text-slate-500" : "text-slate-500"}`}>About</h2>
            <p className={`text-xl md:text-2xl leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              I&apos;m a bilingual technical professional with a hybrid background in software development,
              cloud technologies, and customer-facing technical support.
            </p>
            <p className={`mt-6 text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              I enjoy the messy middle: translating business needs into technical reality, debugging complex systems,
              and helping customers succeed. I&apos;m especially strong at clear communication, structured troubleshooting,
              and building practical tools that reduce friction.
            </p>
          </div>
          <div className="md:col-span-5">
            <h3 className={`text-sm font-medium tracking-wide uppercase mb-6 ${isDark ? "text-slate-500" : "text-slate-500"}`}>Current priorities</h3>
            <ul className={`space-y-4 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              <li className="flex gap-3">
                <span className="text-accent">→</span>
                Cloud support / solutions engineering roles
              </li>
              <li className="flex gap-3">
                <span className="text-secondary-light">→</span>
                Building portfolio projects (Next.js + Postgres)
              </li>
              <li className="flex gap-3">
                <span className="text-accent">→</span>
                AWS certifications (SAA-C03, DOP-C02)
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills - Typographic layout with dividers, no heavy cards */}
      <section className={`${isDark ? "bg-slate-900/50" : "bg-slate-50/50"}`}>
        <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <h2 className={`text-sm font-medium tracking-wide uppercase mb-12 ${isDark ? "text-slate-500" : "text-slate-500"}`}>Skills</h2>

          <div className="grid gap-12 md:grid-cols-2">
            {[
              {
                title: "Cloud & DevOps",
                items: ["AWS", "Azure", "Docker", "CI/CD", "GitHub Actions", "API integrations", "Networking"]
              },
              {
                title: "Development",
                items: ["Next.js", "React", "TypeScript", "Node.js", ".NET/C#", "REST APIs", "Testing"]
              },
              {
                title: "Data",
                items: ["PostgreSQL", "Prisma", "Entity Framework", "MongoDB", "Query optimization"]
              },
              {
                title: "Customer Engineering",
                items: ["Incident triage", "Repro steps", "Log analysis", "Escalations", "Documentation", "EN/JP"]
              },
            ].map((group, i) => (
              <div key={i} className={`pb-8 ${i < 2 ? `border-b ${isDark ? "border-slate-800" : "border-slate-200"}` : ""} md:border-b-0`}>
                <h3 className={`font-semibold mb-4 ${isDark ? "text-slate-200" : "text-slate-800"}`}>{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, j) => (
                    <span
                      key={j}
                      className={`text-sm px-3 py-1 rounded-full ${
                        isDark ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience - Lighter, more whitespace */}
      <section id="work" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="flex items-end justify-between mb-12">
          <h2 className={`text-sm font-medium tracking-wide uppercase ${isDark ? "text-slate-500" : "text-slate-500"}`}>Experience</h2>
          <a href="/resume" className="text-sm text-accent hover:underline">Full resume →</a>
        </div>

        <div className="space-y-12">
          {[
            {
              title: "International Technical Support Associate",
              company: "Alarm.com",
              period: "Aug 2023 – Present",
              points: [
                "Troubleshoot customer issues across web/mobile, networking, and device ecosystems",
                "Create clear repro steps and work with engineering teams to drive resolution",
                "Improve internal documentation to reduce time-to-resolution and repeat cases",
              ],
            },
            {
              title: "Technical Specialist",
              company: "Bitrise",
              period: "Previous",
              points: [
                "Supported CI/CD pipelines and mobile build workflows in a fast-paced SaaS environment",
                "Helped customers integrate tools and debug build, auth, and API-related issues",
              ],
            },
          ].map((job, i) => (
            <article key={i} className={`pb-12 ${i < 1 ? `border-b ${isDark ? "border-slate-800" : "border-slate-200"}` : ""}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                <h3 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{job.title}</h3>
                <span className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>{job.company} · {job.period}</span>
              </div>
              <ul className={`space-y-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {job.points.map((point, j) => (
                  <li key={j} className="flex gap-3">
                    <span className={isDark ? "text-slate-600" : "text-slate-400"}>·</span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Portfolio - Softer cards */}
      <section className={`${isDark ? "bg-slate-900/50" : "bg-slate-50/50"}`}>
        <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <div className="flex items-end justify-between mb-12">
            <h2 className={`text-sm font-medium tracking-wide uppercase ${isDark ? "text-slate-500" : "text-slate-500"}`}>Projects</h2>
            <a href="/portfolio" className="text-sm text-accent hover:underline">All projects →</a>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "API Key Manager",
                tech: "Next.js · TypeScript · Prisma · Postgres",
                desc: "Secure SaaS-style app for storing and rotating API keys with role-based access and audit-friendly UX.",
                featured: true,
              },
              {
                title: "AI Tutor LMS",
                tech: "Next.js · Postgres · RAG · Role-based access",
                desc: "Learning platform with admin/instructor/student roles, course content, and AI-driven tutoring.",
                featured: false,
              },
            ].map((project, i) => (
              <article
                key={i}
                className={`group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? "bg-slate-800/50 hover:bg-slate-800"
                    : "bg-white shadow-soft hover:shadow-soft-lg"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className={`font-semibold text-lg group-hover:text-accent transition-colors ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="text-xs font-medium px-2 py-1 rounded bg-accent/10 text-accent">
                      Featured
                    </span>
                  )}
                </div>
                <p className={`text-sm mb-3 ${isDark ? "text-slate-500" : "text-slate-500"}`}>{project.tech}</p>
                <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>{project.desc}</p>
                <div className="mt-6 flex gap-4">
                  <a href="https://github.com/" target="_blank" rel="noreferrer" className={`text-sm font-medium transition-colors ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>
                    Code →
                  </a>
                  {project.featured && (
                    <a href="#" className="text-sm font-medium text-accent hover:underline">
                      Live demo →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog - Editorial list style */}
      <section id="writing" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="flex items-end justify-between mb-12">
          <h2 className={`text-sm font-medium tracking-wide uppercase ${isDark ? "text-slate-500" : "text-slate-500"}`}>Writing</h2>
          <a href="/blog" className="text-sm text-accent hover:underline">All posts →</a>
        </div>

        <div className="space-y-8">
          {[
            {
              date: "Feb 2026",
              read: "6 min",
              title: "A Troubleshooting Playbook for Cloud Support Engineers",
              desc: "A repeatable approach to incident triage: scoping, reproducing, isolating layers, and writing crisp escalations.",
              slug: "troubleshooting-playbook",
            },
            {
              date: "Jan 2026",
              read: "4 min",
              title: "Debugging API Issues Like a Scientist",
              desc: "Hypotheses, controlled tests, logs, and the art of not gaslighting yourself with assumptions.",
              slug: "api-debugging",
            },
            {
              date: "Dec 2025",
              read: "5 min",
              title: "Vercel + Postgres: What I Wish I Knew Earlier",
              desc: "Practical gotchas around env vars, migrations, connection pooling, and predictable deploys.",
              slug: "vercel-postgres",
            },
          ].map((post, i) => (
            <article
              key={i}
              className={`group pb-8 ${i < 2 ? `border-b ${isDark ? "border-slate-800" : "border-slate-200"}` : ""}`}
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                <span className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>{post.date}</span>
                <span className={`text-sm ${isDark ? "text-slate-600" : "text-slate-400"}`}>·</span>
                <span className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>{post.read} read</span>
              </div>
              <h3 className={`text-lg font-semibold mb-2 group-hover:text-accent transition-colors ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </h3>
              <p className={`leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>{post.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Contact - Calmer, focused */}
      <section id="contact" className={`${isDark ? "bg-slate-900/50" : "bg-slate-50/50"}`}>
        <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Let&apos;s work together</h2>
            <p className={`text-lg leading-relaxed mb-8 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              The best way to reach me is email. If you include a job description or role goals,
              I&apos;ll reply with how I&apos;d approach the first 30–60–90 days.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover shadow-accent hover:shadow-accent-lg"
              >
                Send me a message
              </a>
              <a
                href="https://www.linkedin.com/in/trevor-mearns/"
                target="_blank"
                rel="noreferrer"
                className={`text-sm font-medium transition-colors ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
              >
                LinkedIn →
              </a>
            </div>
            <p className={`mt-6 text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
              Based in Japan (UTC+9) · English / 日本語
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className={`border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}>
        <div className={`mx-auto max-w-5xl px-6 py-8 text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Trevor Mearns</p>
            <div className="flex flex-wrap gap-6">
              <a href="/blog" className={`transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}>Blog</a>
              <a href="/portfolio" className={`transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}>Projects</a>
              <a href="/privacy" className={`transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}>Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
