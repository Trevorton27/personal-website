"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved preference or system preference
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(saved === "dark" || (!saved && prefersDark));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* Top Nav */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? "border-white/10 bg-black/80"
          : "border-black/5 bg-white/80"
      }`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl font-bold text-white bg-gradient-to-br from-[#d48a27] to-[#a66a1d] shadow-lg shadow-[#d48a27]/25`}>
              TM
            </span>
            <span className="text-lg">Trevor Mearns</span>
          </a>

          <nav className={`hidden items-center gap-1 text-sm md:flex`}>
            {["About", "Skills", "Experience", "Portfolio", "Blog", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isDark
                    ? "hover:bg-white/10 hover:text-[#d48a27]"
                    : "hover:bg-black/5 hover:text-[#d48a27]"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-yellow-400"
                  : "bg-black/5 hover:bg-black/10 text-gray-600"
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
              href="/resume"
              className={`hidden rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 md:inline-flex ${
                isDark
                  ? "border border-white/20 hover:bg-white/10"
                  : "border border-black/10 hover:bg-black/5"
              }`}
            >
              Resume
            </a>
            <a
              href="#contact"
              className="inline-flex rounded-xl bg-gradient-to-r from-[#d48a27] to-[#b8751f] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#d48a27]/30 transition-all duration-200 hover:shadow-[#d48a27]/50 hover:scale-105"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isDark
            ? "bg-gradient-to-br from-[#d48a27]/10 via-transparent to-black"
            : "bg-gradient-to-br from-[#d48a27]/5 via-transparent to-white"
        }`} />

        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32">
          <div className="grid items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className={`mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium ${
                isDark
                  ? "bg-[#d48a27]/20 text-[#d48a27] border border-[#d48a27]/30"
                  : "bg-[#d48a27]/10 text-[#a66a1d] border border-[#d48a27]/20"
              }`}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d48a27] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d48a27]"></span>
                </span>
                Open to Cloud Support / Solutions / Full-Stack roles
              </div>

              <h1 className="text-4xl font-bold tracking-tight md:text-6xl md:leading-[1.1]">
                Bilingual technical{" "}
                <span className="bg-gradient-to-r from-[#d48a27] to-[#e9a84a] bg-clip-text text-transparent">
                  problem-solver
                </span>{" "}
                bridging cloud, code, and customers.
              </h1>

              <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                I help teams ship reliable software experiences by debugging complex systems, improving integrations,
                and turning fuzzy requirements into working solutions—across English and Japanese.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#portfolio"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#d48a27] to-[#b8751f] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#d48a27]/30 transition-all duration-200 hover:shadow-[#d48a27]/50 hover:scale-105"
                >
                  View portfolio
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="/resume"
                  className={`inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 ${
                    isDark
                      ? "bg-white/10 hover:bg-white/20 border border-white/10"
                      : "bg-black/5 hover:bg-black/10 border border-black/5"
                  }`}
                >
                  Download resume
                </a>
              </div>

              {/* Quick highlights */}
              <div className="mt-14 grid gap-4 sm:grid-cols-2">
                {[
                  { title: "Support + Engineering", desc: "SaaS support, escalation handling, debugging, stakeholder comms." },
                  { title: "Cloud & DevOps", desc: "AWS/Azure basics, Docker, CI/CD workflows, API integration." },
                  { title: "Full-Stack Development", desc: "Next.js/React, Node, .NET/C#, PostgreSQL, Prisma." },
                  { title: "Bilingual (EN/JP)", desc: "Communicate clearly with global teams and Japanese customers." },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`group rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] ${
                      isDark
                        ? "bg-white/5 border border-white/10 hover:border-[#d48a27]/50 hover:bg-[#d48a27]/10"
                        : "bg-black/[0.02] border border-black/5 hover:border-[#d48a27]/50 hover:bg-[#d48a27]/5"
                    }`}
                  >
                    <p className={`text-sm font-semibold transition-colors group-hover:text-[#d48a27]`}>{item.title}</p>
                    <p className={`mt-1.5 text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card */}
            <aside className="md:col-span-5">
              <div className={`rounded-3xl p-6 shadow-2xl transition-all duration-300 ${
                isDark
                  ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-[#d48a27]/10"
                  : "bg-white border border-black/5 shadow-black/5"
              }`}>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl bg-gradient-to-br from-[#d48a27] to-[#a66a1d] p-0.5">
                    <img
                      src="/profile.jpg"
                      alt="Profile photo"
                      className="h-full w-full rounded-[14px] object-cover"
                    />
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Trevor Mearns</p>
                    <p className="font-semibold">Technical Support • Full-Stack • Educator</p>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Japan (UTC+9)</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  {[
                    { label: "Primary focus", value: "Cloud Support" },
                    { label: "Stack", value: "Next.js • TS • Postgres" },
                    { label: "Languages", value: "EN • JP" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between rounded-xl p-4 ${
                        isDark ? "bg-white/5" : "bg-black/[0.02]"
                      }`}
                    >
                      <span className={isDark ? "text-gray-400" : "text-gray-500"}>{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href="https://github.com/"
                    className={`flex-1 rounded-xl px-4 py-3 text-center text-sm font-medium transition-all duration-200 ${
                      isDark
                        ? "bg-white/5 hover:bg-white/10 border border-white/10"
                        : "bg-black/[0.02] hover:bg-black/5 border border-black/5"
                    }`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/"
                    className={`flex-1 rounded-xl px-4 py-3 text-center text-sm font-medium transition-all duration-200 ${
                      isDark
                        ? "bg-white/5 hover:bg-white/10 border border-white/10"
                        : "bg-black/[0.02] hover:bg-black/5 border border-black/5"
                    }`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className={`border-t transition-colors duration-300 ${
        isDark ? "border-white/10 bg-white/[0.02]" : "border-black/5 bg-black/[0.01]"
      }`}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold tracking-tight">About</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className={`text-lg leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                I&apos;m a bilingual technical professional with a hybrid background in software development, cloud technologies,
                and customer-facing technical support. I enjoy the messy middle: translating business needs into technical
                reality, debugging complex systems, and helping customers succeed.
              </p>
              <p className={`mt-4 text-lg leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                I&apos;m especially strong at: clear communication, structured troubleshooting, and building practical tools
                that reduce friction for users and internal teams.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className={`rounded-2xl p-6 ${
                isDark
                  ? "bg-gradient-to-br from-[#d48a27]/20 to-transparent border border-[#d48a27]/20"
                  : "bg-gradient-to-br from-[#d48a27]/10 to-transparent border border-[#d48a27]/10"
              }`}>
                <p className="text-sm font-semibold text-[#d48a27]">Current priorities</p>
                <ul className={`mt-4 space-y-3 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  <li className="flex gap-2">
                    <span className="text-[#d48a27]">→</span>
                    Cloud support / solutions engineering roles
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#d48a27]">→</span>
                    Building portfolio projects (Next.js + Postgres)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#d48a27]">→</span>
                    AWS certifications (SAA-C03, DOP-C02)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight">Skills</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            { title: "Cloud & DevOps", skills: "AWS • Azure • Docker • CI/CD • GitHub • API integrations • Networking fundamentals" },
            { title: "Development", skills: "Next.js • React • TypeScript • Node.js • .NET/C# • REST APIs • Testing" },
            { title: "Data", skills: "PostgreSQL • Prisma • Entity Framework • MongoDB • Debugging queries & performance" },
            { title: "Customer-facing engineering", skills: "Incident triage • Repro steps • Log analysis • Escalations • Clear docs • EN/JP communication" },
          ].map((item, i) => (
            <div
              key={i}
              className={`group rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] ${
                isDark
                  ? "bg-white/5 border border-white/10 hover:border-[#d48a27]/50"
                  : "bg-black/[0.02] border border-black/5 hover:border-[#d48a27]/30"
              }`}
            >
              <h3 className="font-semibold text-lg group-hover:text-[#d48a27] transition-colors">{item.title}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {item.skills}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className={`border-t transition-colors duration-300 ${
        isDark ? "border-white/10 bg-white/[0.02]" : "border-black/5 bg-black/[0.01]"
      }`}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
              <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>A snapshot—full details live in the resume.</p>
            </div>
            <a href="/resume" className="text-sm font-semibold text-[#d48a27] hover:underline">View resume →</a>
          </div>

          <div className="mt-10 grid gap-6">
            {[
              {
                title: "International Technical Support Associate",
                company: "Alarm.com",
                period: "Aug 2023 – Present",
                points: [
                  "Troubleshoot customer issues across web/mobile, networking, and device ecosystems.",
                  "Create clear repro steps and work with engineering teams to drive resolution.",
                  "Improve internal documentation to reduce time-to-resolution and repeat cases.",
                ],
              },
              {
                title: "Technical Specialist",
                company: "Bitrise",
                period: "Previous",
                points: [
                  "Supported CI/CD pipelines and mobile build workflows in a fast-paced SaaS environment.",
                  "Helped customers integrate tools and debug build, auth, and API-related issues.",
                ],
              },
            ].map((job, i) => (
              <article
                key={i}
                className={`rounded-2xl p-6 transition-all duration-300 ${
                  isDark
                    ? "bg-white/5 border border-white/10"
                    : "bg-white border border-black/5 shadow-sm"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{job.company} • {job.period}</p>
                </div>
                <ul className={`mt-4 space-y-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {job.points.map((point, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-[#d48a27]">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Portfolio</h2>
            <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Selected projects showing how I build and ship.
            </p>
          </div>
          <a href="/projects" className="text-sm font-semibold text-[#d48a27] hover:underline">All projects →</a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              title: "API Key Manager",
              tech: "Next.js • TypeScript • Prisma • Postgres • Clerk",
              desc: "Secure SaaS-style app for storing and rotating API keys with role-based access, audit-friendly UX, and Docker local dev.",
              badge: "Featured",
              featured: true,
            },
            {
              title: "AI Tutor LMS",
              tech: "Next.js • Postgres • RAG • Role-based access",
              desc: "Learning platform with admin/instructor/student roles, course content, student progress tracking, and AI-driven tutoring features.",
              badge: "In progress",
              featured: false,
            },
          ].map((project, i) => (
            <article
              key={i}
              className={`group rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] ${
                isDark
                  ? "bg-white/5 border border-white/10 hover:border-[#d48a27]/50"
                  : "bg-white border border-black/5 hover:border-[#d48a27]/30 shadow-sm hover:shadow-lg"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-[#d48a27] transition-colors">{project.title}</h3>
                  <p className={`mt-1 text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>{project.tech}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                  project.featured
                    ? "bg-[#d48a27]/20 text-[#d48a27]"
                    : isDark ? "bg-white/10 text-gray-400" : "bg-black/5 text-gray-500"
                }`}>
                  {project.badge}
                </span>
              </div>
              <p className={`mt-4 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {project.desc}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isDark
                      ? "bg-white/5 hover:bg-white/10 border border-white/10"
                      : "bg-black/[0.02] hover:bg-black/5 border border-black/5"
                  }`}
                >
                  Code
                </a>
                {project.featured ? (
                  <a
                    href="#"
                    className="rounded-xl bg-gradient-to-r from-[#d48a27] to-[#b8751f] px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#d48a27]/25 transition-all duration-200 hover:shadow-[#d48a27]/40"
                  >
                    Live demo
                  </a>
                ) : (
                  <a
                    href="#"
                    className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isDark
                        ? "bg-white/5 hover:bg-white/10 border border-white/10"
                        : "bg-black/[0.02] hover:bg-black/5 border border-black/5"
                    }`}
                  >
                    Case study
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className={`border-t transition-colors duration-300 ${
        isDark ? "border-white/10 bg-white/[0.02]" : "border-black/5 bg-black/[0.01]"
      }`}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Blog</h2>
              <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Short, practical writeups on debugging, cloud support patterns, and building full-stack systems.
              </p>
            </div>
            <a href="/blog" className="text-sm font-semibold text-[#d48a27] hover:underline">All posts →</a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                date: "Feb 2026",
                read: "6 min read",
                title: "A Troubleshooting Playbook for Cloud Support Engineers",
                desc: "A repeatable approach to incident triage: scoping, reproducing, isolating layers, and writing crisp escalations.",
                slug: "troubleshooting-playbook",
              },
              {
                date: "Jan 2026",
                read: "4 min read",
                title: "Debugging API Issues Like a Scientist",
                desc: "Hypotheses, controlled tests, logs, and the art of not gaslighting yourself with assumptions.",
                slug: "api-debugging",
              },
              {
                date: "Dec 2025",
                read: "5 min read",
                title: "Vercel + Postgres: What I Wish I Knew Earlier",
                desc: "Practical gotchas around env vars, migrations, connection pooling, and predictable deploys.",
                slug: "vercel-postgres",
              },
            ].map((post, i) => (
              <article
                key={i}
                className={`group rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] ${
                  isDark
                    ? "bg-white/5 border border-white/10 hover:border-[#d48a27]/50"
                    : "bg-white border border-black/5 hover:border-[#d48a27]/30 shadow-sm"
                }`}
              >
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{post.date} • {post.read}</p>
                <h3 className="mt-3 font-semibold leading-snug group-hover:text-[#d48a27] transition-colors">
                  <a href={`/blog/${post.slug}`}>
                    {post.title}
                  </a>
                </h3>
                <p className={`mt-3 text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  {post.desc}
                </p>
                <a href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-[#d48a27] hover:underline">
                  Read more →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
        <div className={`rounded-3xl p-8 md:p-12 ${
          isDark
            ? "bg-gradient-to-br from-[#d48a27]/20 via-[#d48a27]/10 to-transparent border border-[#d48a27]/20"
            : "bg-gradient-to-br from-[#d48a27]/10 via-[#d48a27]/5 to-transparent border border-[#d48a27]/10"
        }`}>
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <h2 className="text-3xl font-bold tracking-tight">Let&apos;s work together</h2>
              <p className={`mt-4 text-lg leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Best way to reach me is email. If you include a job description or role goals, I&apos;ll reply with how I&apos;d
                approach the first 30–60–90 days.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:you@example.com"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#d48a27] to-[#b8751f] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#d48a27]/30 transition-all duration-200 hover:shadow-[#d48a27]/50 hover:scale-105"
                >
                  Email me
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center justify-center rounded-xl px-6 py-4 text-sm font-semibold transition-all duration-200 ${
                    isDark
                      ? "bg-white/10 hover:bg-white/20 border border-white/10"
                      : "bg-black/5 hover:bg-black/10 border border-black/5"
                  }`}
                >
                  LinkedIn
                </a>
              </div>
              <p className={`mt-4 text-center text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                Based in Japan (UTC+9) • English / 日本語
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t transition-colors duration-300 ${
        isDark ? "border-white/10" : "border-black/5"
      }`}>
        <div className={`mx-auto max-w-6xl px-6 py-10 text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Trevor Mearns</p>
            <div className="flex flex-wrap gap-6">
              <a href="/privacy" className="hover:text-[#d48a27] transition-colors">Privacy</a>
              <a href="/blog" className="hover:text-[#d48a27] transition-colors">Blog</a>
              <a href="/projects" className="hover:text-[#d48a27] transition-colors">Projects</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
