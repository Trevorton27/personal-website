const testimonials = [
  {
    name: 'Kevin Bisner',
    role: 'Full Stack Developer',
    linkedin: 'https://www.linkedin.com/in/kevinbisner/',
    quote: 'Working with Trevor was awesome. Being new in the field of software development I needed a knowledgeable and communicative mentor who could really help me improve my skills. Trevor was exactly that. His code reviews of my projects made in SDMM showed me how to write functional, effective, and efficient code. I\'m a much better developer because of him. He is one of the people who have really helped me succeed in this field.',
  },
  {
    name: 'Brandon Chuck',
    role: 'Software Engineer',
    linkedin: 'https://www.linkedin.com/in/brandonchuck/',
    quote: 'I first met Trevor in a software development mentorship program. I was met with kindness, patience, and a tailored approach to teaching the complex world of software development. Trevor has an undeniable grasp of the fundamentals and is passionate about transferring his knowledge to his students. He always put an emphasis on gaining a deeper understanding of fundamentals like debugging, functional organization, and readability, ultimately helping us construct a developer mindset. Looking back at the program now big picture concepts were also something Trevor sought to help us understand which has always stuck with me. With his guidance and teachings I felt confident and prepared to step into my first software developer role after completing the program.',
  },
  {
    name: 'Gregory Hilger',
    role: 'Full Stack Software Developer JS | React | C# | .Net',
    linkedin: 'https://www.linkedin.com/in/gregoryhilger/',
    quote: 'I had the pleasure of working with Trevor through the SDMM online program, and I cannot speak highly enough about his expertise and friendliness. His lessons were insightful and engaging, making complex coding concepts feel accessible to beginners like me. Throughout the program Trevor showed a dedication and passion for helping others grow their skills. He always provided clear and concise explanations and would review my coding projects, offering constructive feedback that helped me learn and succeed in the program. Trevor was always knowledgeable and yet so down-to-earth, making the experience very enjoyable. I am grateful for the opportunity to learn from Trevor and I wholeheartedly recommend him as a mentor in the world of programming.',
  },
];

export function Testimonials({ isDark }: { isDark: boolean }) {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-14 pb-24 md:pt-20 md:pb-32">
      <div className="mb-12">
        <h2 className={`text-sm font-medium tracking-wide uppercase ${isDark ? "text-slate-500" : "text-slate-500"}`}>
          What People Say
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 flex flex-col ${
              isDark
                ? "bg-slate-800/50 border border-slate-700/50"
                : "bg-white border border-slate-200 shadow-soft"
            }`}
          >
            <div className="flex text-yellow-400 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className={`text-sm leading-relaxed mb-4 italic flex-1 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="mt-auto">
              <p className={`font-semibold text-sm ${isDark ? "text-slate-100" : "text-slate-900"}`}>{t.name}</p>
              <p className={`text-xs mb-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}>{t.role}</p>
              <a
                href={t.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-[#0A66C2] hover:bg-[#004182] px-3 py-1.5 rounded-md transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                View on LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
