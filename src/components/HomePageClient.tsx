"use client";

import Image from "next/image";
import headshot from "@/images/trevorMearnsHeadShot.png";
import { useState, useEffect } from "react";
import { Menu, X, Send } from "lucide-react";
import { WritingSection } from "@/components/WritingSection";
import type { PortfolioProject } from "@/lib/portfolio";

type HomePageClientProps = {
  projects: PortfolioProject[];
};

export function HomePageClient({ projects }: HomePageClientProps) {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
    } catch (error: unknown) {
      setFormStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

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
    <main
      className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-black text-slate-50" : "bg-white text-slate-900"}`}
    >
      {/* Navigation - Simplified */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300 ${
          isDark ? "bg-black/80" : "bg-white/80"
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3 font-medium">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-black"
            >
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
            <span>Trevor Mearns</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            {["About", "Work", "Portfolio", "Writing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-colors duration-200 ${
                  isDark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item}
              </a>
            ))}
            <a
              href="/resume"
              className={`transition-colors duration-200 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              Resume
            </a>
            <a
              href="https://github.com/Trevorton27"
              target="_blank"
              rel="noreferrer"
              className={`transition-colors duration-200 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/trevor-mearns/"
              target="_blank"
              rel="noreferrer"
              className={`transition-colors duration-200 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
            >
              LinkedIn
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDark
                  ? "hover:bg-white/10 text-slate-400"
                  : "hover:bg-slate-100 text-slate-600"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <a
              href="#contact"
              className="hidden sm:inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover shadow-accent hover:shadow-accent-lg"
            >
              Get in touch
            </a>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                isDark
                  ? "hover:bg-white/10 text-slate-400"
                  : "hover:bg-slate-100 text-slate-600"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden py-4 border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}
          >
            <div className="space-y-1 px-6">
              {["About", "Work", "Portfolio", "Writing"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block py-3 px-4 rounded-lg text-sm transition-colors duration-200 ${
                    isDark
                      ? "text-slate-400 hover:text-white hover:bg-white/5"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="/resume"
                className={`block py-3 px-4 rounded-lg text-sm transition-colors duration-200 ${
                  isDark
                    ? "text-slate-400 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume
              </a>
              <a
                href="https://github.com/trevmearns"
                target="_blank"
                rel="noreferrer"
                className={`block py-3 px-4 rounded-lg text-sm transition-colors duration-200 ${
                  isDark
                    ? "text-slate-400 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/trevor-mearns/"
                target="_blank"
                rel="noreferrer"
                className={`block py-3 px-4 rounded-lg text-sm transition-colors duration-200 ${
                  isDark
                    ? "text-slate-400 hover:text-white hover:bg-white/5"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                LinkedIn
              </a>
              <a
                href="#contact"
                className="block mt-3 rounded-lg bg-accent px-4 py-3 text-center text-sm font-medium text-white shadow-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in touch
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero - Cleaner, more editorial */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-3xl">
          {/* Status badge - subtle */}
          <div
            className={`mb-8 inline-flex items-center gap-2 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Open to Cloud/SAAS Support & Solutions roles
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Bilingual technical problem-solver bridging{" "}
            <span className="text-accent">cloud, code, and customers</span>.
          </h1>

          <p
            className={`mt-8 text-lg md:text-xl leading-relaxed max-w-2xl ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            I help teams ship reliable software and maintain platform integrity
            while making sure customers know they are heard and cared for.
          </p>
          <p
            className={`mt-8 text-lg md:text-xl leading-relaxed max-w-2xl ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            I also have a great sense of empathy and humor (if I do say so
            myself) and an openness to learning which I think makes me pretty
            fun to work with.
          </p>

          <p
            className={`mt-8 text-lg md:text-xl leading-relaxed max-w-2xl ${isDark ? "text-slate-400" : "text-slate-600"}`}
          >
            Check out mine works and philosphy below.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover shadow-accent hover:shadow-accent-lg"
            >
              View my work
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="/resume"
              className={`inline-flex items-center rounded-lg px-5 py-3 text-sm font-medium transition-colors duration-200 ${
                isDark
                  ? "text-slate-300 hover:text-white"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Download resume →
            </a>
          </div>
        </div>

        {/* Minimal identity block */}
        <div
          className={`mt-16 md:mt-20 flex flex-wrap gap-x-12 gap-y-4 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          <div>
            <span
              className={`block mb-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}
            >
              Location
            </span>
            <span className={isDark ? "text-slate-200" : "text-slate-800"}>
              Japan (UTC+9)
            </span>
          </div>
          <div>
            <span
              className={`block mb-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}
            >
              Languages
            </span>
            <span className={isDark ? "text-slate-200" : "text-slate-800"}>
              English, Japanese
            </span>
          </div>
          <div>
            <span
              className={`block mb-1 ${isDark ? "text-slate-500" : "text-slate-500"}`}
            >
              Focus
            </span>
            <span className={isDark ? "text-slate-200" : "text-slate-800"}>
              Cloud Support, Full-Stack
            </span>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className={`mx-auto max-w-5xl px-6`}>
        <div className={`h-px ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />
      </div>

      {/* About - Photo and bio */}
      <section id="about" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="grid gap-12 md:gap-16 md:grid-cols-12 items-center">
          {/* Photo - Left column */}
          <div className="md:col-span-5 md:mt-10">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src={headshot}
                alt="Trevor Mearns"
                className="w-full h-full object-cover"
                placeholder="blur"
                priority
              />
            </div>
          </div>

          {/* About content - Right column */}
          <div className="md:col-span-7">
            <h2
              className={`text-sm font-medium tracking-wide uppercase mb-8 ${isDark ? "text-slate-500" : "text-slate-500"}`}
            >
              About
            </h2>
            <p
              className={`text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              I was born in Seattle Washington in the United States and have
              lived in Japan since 2007. I started my journey abroad in
              education. After a few years working for someone else, I started
              my own business and managed it for 6.5 years.
            </p>
            <p
              className={`mt-6 text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              As all ex-pats know, time invested in one country does not always
              equal returns back home. So, I decided to sell my school and
              transition into software development and technical support. I find
              the intersection of the requisite hard, technical skills and soft
              people skills to be an excellent fit for my personality and
              background.
            </p>
            <p
              className={`mt-6 text-lg leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}
            >
              I&apos;ve always loved learning and helping people and this industry
              has no shortage of opportunities to do both. It also allows me to
              remain an ex-patriot of the United States, a country I still love
              dearly, while staying connected to my culture, my language and the
              wider world.
            </p>
          </div>
        </div>
      </section>

      {/* Experience - Lighter, more whitespace */}
      <section id="work" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="flex items-end justify-between mb-12">
          <h2
            className={`text-sm font-medium tracking-wide uppercase ${isDark ? "text-slate-500" : "text-slate-500"}`}
          >
            Experience
          </h2>
          <a href="/resume" className="text-sm text-accent hover:underline">
            Full resume →
          </a>
        </div>

        <div className="space-y-12">
          {[
            {
              title: "International Technical Support Associate",
              company: "Alarm.com",
              period: "Aug 2023 – Present",
              points: [
                "Lead technical meetings for Japanese stakeholders with real-time troubleshooting in English and Japanese",
                "Onboarded Japan's largest security company to the cloud platform, ensuring secure integrations and compliance",
                "Facilitate communication between C-level executives and partners on security objectives",
              ],
            },
            {
              title: "Technical Specialist",
              company: "Bitrise",
              period: "Jul 2022 – Jun 2023",
              points: [
                "Provided pre/post-sales support for enterprise clients on DevOps pipelines, API connectivity, and cloud integration",
                "Collaborated with global team to resolve technical issues, focusing on APAC/Japan region",
                "Developed comprehensive documentation to streamline support processes and promote secure practices",
              ],
            },
            {
              title: "Full Stack Engineer & Programming Instructor",
              company: "Software Development Mastermind",
              period: "Oct 2019 – Jun 2022",
              points: [
                "Created Q&A documentation to optimize issue resolution time and improve client satisfaction",
                "Conducted security-focused code reviews to enhance code quality and performance",
                "Mentored students on secure project development, leading weekly sessions on JavaScript, React, and C#",
              ],
            },
            {
              title: "Founder & Head Manager",
              company: "M City English 英語教室",
              period: "Sep 2014 – Oct 2019",
              points: [
                "Managed all aspects of operations including administration, customer service, and sales",
                "Led customer engagement through teaching, demonstrations, and responsive communication",
              ],
            },
          ].map((job, i) => (
            <article
              key={i}
              className={`pb-12 ${i < 3 ? `border-b ${isDark ? "border-slate-800" : "border-slate-200"}` : ""}`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                <h3
                  className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}
                >
                  {job.title}
                </h3>
                <span
                  className={`text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}
                >
                  {job.company} · {job.period}
                </span>
              </div>
              <ul
                className={`space-y-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}
              >
                {job.points.map((point, j) => (
                  <li key={j} className="flex gap-3">
                    <span
                      className={isDark ? "text-slate-600" : "text-slate-400"}
                    >
                      ·
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Portfolio - Grid with screenshots */}
      <section
        id="portfolio"
        className={`${isDark ? "bg-slate-900/50" : "bg-slate-50/50"}`}
      >
        <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <div className="mb-12">
            <h2
              className={`text-sm font-medium tracking-wide uppercase ${isDark ? "text-slate-500" : "text-slate-500"}`}
            >
              Portfolio
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, i) => (
              <article
                key={project.slug}
                className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? "bg-slate-800/50 hover:bg-slate-800"
                    : "bg-white shadow-soft hover:shadow-soft-lg"
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                  {project.featured && (
                    <span className="absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded bg-accent text-white">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <p
                      className={`text-xs uppercase tracking-wide ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {project.category}
                    </p>
                    <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                      Updated {new Date(project.lastUpdated).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <h3
                    className={`font-semibold text-lg mb-2 group-hover:text-accent transition-colors ${
                      isDark ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-4 ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`text-xs px-2 py-1 rounded-full ${
                          isDark
                            ? "bg-slate-900/60 text-slate-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className={`flex gap-4 pt-4 border-t ${isDark ? "border-slate-800" : "border-slate-100"}`}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`text-sm font-medium inline-flex items-center gap-2 transition-colors ${
                        isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-900"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.013c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.157-1.11-1.466-1.11-1.466-.908-.621.069-.609.069-.609 1.004.071 1.532 1.032 1.532 1.032.892 1.531 2.341 1.089 2.91.833.092-.647.35-1.089.636-1.34-2.22-.253-4.555-1.112-4.555-4.951 0-1.094.39-1.988 1.029-2.689-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.701 1.028 1.595 1.028 2.689 0 3.848-2.339 4.695-4.566 4.943.359.31.679.919.679 1.853 0 1.337-.012 2.419-.012 2.747 0 .265.18.576.688.478C19.138 20.19 22 16.437 22 12.013 22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Code
                    </a>

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium inline-flex items-center gap-2 text-accent hover:text-accent-hover"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6h8m0 0v8m0-8L8 16"
                          />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog - Editorial list style */}
      <WritingSection isDark={isDark} />

      {/* Contact - Form */}
      <section
        id="contact"
        className={`${isDark ? "bg-slate-900/50" : "bg-slate-50/50"}`}
      >
        <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Get in Touch
              </h2>
              <p
                className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}
              >
                Have a question or want to work together? Drop me a message!
              </p>
              <p
                className={`mt-2 text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}
              >
                Based in Japan (UTC+9) · English / 日本語
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`rounded-2xl p-6 md:p-8 ${
                isDark
                  ? "bg-slate-800/50 border border-slate-700"
                  : "bg-white border border-slate-200 shadow-soft"
              }`}
            >
              {/* Honeypot field */}
              <input
                type="text"
                name="website"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent ${
                      isDark
                        ? "bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500"
                        : "bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400"
                    }`}
                    disabled={formStatus === 'submitting'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent ${
                      isDark
                        ? "bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500"
                        : "bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400"
                    }`}
                    disabled={formStatus === 'submitting'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent ${
                      isDark
                        ? "bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500"
                        : "bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400"
                    }`}
                    disabled={formStatus === 'submitting'}
                  />
                </div>

                {formStatus === 'error' && (
                  <div className={`p-4 rounded-xl ${isDark ? "bg-red-500/10 border border-red-500/20 text-red-400" : "bg-red-50 border border-red-200 text-red-700"}`}>
                    {errorMessage}
                  </div>
                )}

                {formStatus === 'success' && (
                  <div className={`p-4 rounded-xl ${isDark ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-green-50 border border-green-200 text-green-700"}`}>
                    Thanks for your message! I&apos;ll get back to you soon.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-4 text-sm font-semibold text-white shadow-accent transition-all duration-200 hover:bg-accent-hover hover:shadow-accent-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {formStatus === 'submitting' ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <a
                href="https://www.linkedin.com/in/trevor-mearns/"
                target="_blank"
                rel="noreferrer"
                className={`text-sm font-medium transition-colors ${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}
              >
                Or connect on LinkedIn →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer
        className={`border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}
      >
        <div
          className={`mx-auto max-w-5xl px-6 py-8 text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Trevor Mearns</p>
            <div className="flex flex-wrap gap-6">
              <a
                href="#writing"
                className={`transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}
              >
                Blog
              </a>
              <a
                href="#portfolio"
                className={`transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}
              >
                Projects
              </a>
              <a
                href="/privacy"
                className={`transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
