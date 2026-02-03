'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-large font-extralight tracking-[0.2em] uppercase text-swiss-black dark:text-white"
          >
            Drop City
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            <Link 
              href="/about" 
              className="label text-gray-600 dark:text-gray-400 hover:text-swiss-black dark:hover:text-white transition-colors"
            >
              About
            </Link>
            <a 
              href="#features" 
              className="label text-gray-600 dark:text-gray-400 hover:text-swiss-black dark:hover:text-white transition-colors"
            >
              Features
            </a>
            <a 
              href="#"
              className="btn-primary text-tiny"
            >
              Coming Soon
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-px bg-swiss-black dark:bg-white mb-1.5" />
            <div className="w-6 h-px bg-swiss-black dark:bg-white mb-1.5" />
            <div className="w-6 h-px bg-swiss-black dark:bg-white" />
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pt-8 pb-4 space-y-6">
            <Link 
              href="/about" 
              className="block label text-gray-600 dark:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <a 
              href="#features" 
              className="block label text-gray-600 dark:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a 
              href="#"
              className="inline-block btn-primary text-tiny"
            >
              Coming Soon
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
