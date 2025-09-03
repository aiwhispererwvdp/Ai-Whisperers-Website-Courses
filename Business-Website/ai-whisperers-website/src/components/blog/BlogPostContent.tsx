'use client';

import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="p-8 lg:p-12">
        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-xl"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              h1: ({ children }) => (
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-12 mb-6 leading-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-10 mb-4 leading-tight">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg lg:text-xl font-bold text-gray-900 mt-8 mb-3 leading-tight">
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 leading-relaxed mb-6">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 mb-6">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-2 mb-6 list-decimal list-inside">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-700 leading-relaxed flex items-start">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>{children}</span>
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary-500 bg-primary-50 pl-6 py-4 my-6 italic">
                  {children}
                </blockquote>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-8">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-300 rounded-lg">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-50">
                  {children}
                </thead>
              ),
              tbody: ({ children }) => (
                <tbody className="bg-white divide-y divide-gray-200">
                  {children}
                </tbody>
              ),
              tr: ({ children }) => (
                <tr className="hover:bg-gray-50">
                  {children}
                </tr>
              ),
              th: ({ children }) => (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {children}
                </td>
              ),
              a: ({ children, href }) => (
                <a 
                  href={href} 
                  className="text-primary-600 hover:text-primary-700 font-medium underline underline-offset-2"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Resource Downloads */}
        {post.resources?.downloads && post.resources.downloads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-12 p-6 bg-primary-50 border border-primary-200 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              📥 Download Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {post.resources.downloads.map((download, index) => (
                <a
                  key={index}
                  href={download}
                  className="flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300"
                  download
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    📄
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {download.split('/').pop()?.replace(/\.[^/.]+$/, "").replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                    <div className="text-sm text-gray-500">
                      {download.split('.').pop()?.toUpperCase()} File
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Code Repository */}
        {post.resources?.codeRepository && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              💻 Code Repository
            </h3>
            <a
              href={post.resources.codeRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
          </motion.div>
        )}

        {/* External Links */}
        {post.resources?.externalLinks && post.resources.externalLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 p-6 bg-accent-50 border border-accent-200 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              🔗 Additional Resources
            </h3>
            <div className="space-y-3">
              {post.resources.externalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <div className="font-medium text-gray-900 mb-1">{link.title}</div>
                  <div className="text-sm text-gray-600">{link.description}</div>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}