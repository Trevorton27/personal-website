import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-storm-900 border-t border-gray-200 dark:border-storm-700 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Trevor</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Artist, developer, and creative technologist exploring the
              intersection of art and code.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 dark:text-gray-400 hover:text-lightning-glow transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-gray-600 dark:text-gray-400 hover:text-lightning-glow transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-lightning-glow transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/rss.xml"
                  className="text-gray-600 dark:text-gray-400 hover:text-lightning-glow transition-colors"
                >
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/trevor"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-storm-800 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/trevor"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-storm-800 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/trevor"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-storm-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@trevor.dev"
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-storm-800 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-storm-700 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {currentYear} Trevor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
