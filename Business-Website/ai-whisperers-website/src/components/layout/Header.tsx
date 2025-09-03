'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HamburgerMenuIcon, Cross1Icon, ChevronDownIcon, PersonIcon, ExitIcon } from '@radix-ui/react-icons';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Courses',
    href: '/courses',
    children: [
      { name: 'All Courses', href: '/courses' },
      { name: 'AI Foundations', href: '/courses/ai-foundations' },
      { name: 'Applied AI', href: '/courses/applied-ai' },
      { name: 'Web Development AI', href: '/courses/web-development-ai' },
      { name: 'Enterprise AI Business', href: '/courses/enterprise-ai' },
      { name: 'Course Bundles', href: '/courses/bundles' },
    ],
  },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200" role="banner">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              AI-Whisperers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 font-medium transition-colors">
                      <span>{item.name}</span>
                      <ChevronDownIcon className="w-4 h-4" />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary-600 border-t-transparent"></div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    {session.user.image ? (
                      <img 
                        src={session.user.image} 
                        alt={session.user.name || ''} 
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <PersonIcon className="w-5 h-5 text-primary-600" />
                    )}
                  </div>
                  <span className="font-medium">{session.user.name?.split(' ')[0] || 'Student'}</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'user' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <div className="font-semibold text-gray-900">{session.user.name}</div>
                        <div className="text-sm text-gray-500">{session.user.email}</div>
                      </div>
                      
                      <Link
                        href="/dashboard"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/courses"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        My Courses
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Profile Settings
                      </Link>
                      
                      <div className="border-t border-gray-100">
                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors flex items-center"
                        >
                          <ExitIcon className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/consultation"
                  className="px-4 py-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
                >
                  Free Consultation
                </Link>
                <button
                  onClick={() => signIn(undefined, { callbackUrl: '/dashboard' })}
                  className="px-6 py-2 text-primary-600 font-semibold border-2 border-primary-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
                >
                  Sign In
                </button>
                <Link
                  href="/courses"
                  className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Start Learning
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? (
              <Cross1Icon className="w-6 h-6" aria-hidden="true" />
            ) : (
              <HamburgerMenuIcon className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 bg-white"
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <div className="py-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors min-h-[44px] flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                      role="menuitem"
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="pl-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors min-h-[40px] flex items-center"
                            onClick={() => setMobileMenuOpen(false)}
                            role="menuitem"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA */}
                <div className="px-4 pt-4 space-y-3">
                  <Link
                    href="/consultation"
                    className="block w-full px-4 py-3 text-center border border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Free Consultation
                  </Link>
                  <Link
                    href="/courses"
                    className="block w-full px-4 py-3 text-center bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}