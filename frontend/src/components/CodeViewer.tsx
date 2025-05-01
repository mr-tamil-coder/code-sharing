// components/CodeViewer.tsx
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import toast from 'react-hot-toast';

interface CodeViewerProps {
  code: string;
  title: string;
  description: string;
  language?: string;
  number: string;
  createdAt: string;
  author?: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  title,
  description,
  language = 'javascript',
  number,
  createdAt,
  author = 'Anonymous'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code).then(
      () => {
        setCopied(true);
        toast.success('Code copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        toast.error('Failed to copy code');
      }
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <div className="flex items-center mt-1 space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                #{number}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(createdAt)}
              </span>
              <span className="text-xs text-gray-500">
                by {author}
              </span>
            </div>
          </div>
          <button
            onClick={handleCopyClick}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              copied
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            } transition-colors`}
          >
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>
        {description && (
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        )}
      </div>

      <div className="relative">
        <div className="absolute top-0 right-0 p-2 bg-gray-800 text-xs text-gray-400 rounded-bl-md">
          {language}
        </div>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          showLineNumbers
          className="rounded-b-lg"
          customStyle={{ margin: 0, maxHeight: '500px' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeViewer;