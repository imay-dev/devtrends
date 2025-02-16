// components/DeveloperFooter.tsx
'use client';

import { GitHubIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-100 py-6 text-center">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4">
          <span className="text-gray-600">Built with ❤️ by Maysam Serni</span>
          <a
            href="https://github.com/imay-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black transition-colors"
          >
            <GitHubIcon className="w-5 h-5 text-gray-800" />
          </a>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Open source project licensed under MIT
        </p>
      </div>
    </footer>
  );
}
