import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { ResumeViewer } from '@/components/public/ResumeViewer';

export const metadata = {
  title: 'Resume',
  description: 'Trevor Mearns - Resume',
};

export default function ResumePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Resume</h1>
          <a
            href="/resume.pdf"
            download="Trevor Mearns Resume.pdf"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Download PDF
          </a>
        </div>
        <ResumeViewer />
      </main>
      <Footer />
    </>
  );
}
