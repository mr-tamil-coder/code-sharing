// components/SnippetList.tsx
import React from 'react';

interface Snippet {
  id: string;
  number: string;
  title: string;
  language: string;
  description: string;
  createdAt: string;
  author?: string;
}

interface SnippetListProps {
  snippets: Snippet[];
  onSnippetClick: (number: string) => void;
}

const SnippetList: React.FC<SnippetListProps> = ({ snippets, onSnippetClick }) => {
  if (!snippets || snippets.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No snippets</h3>
        <p className="mt-1 text-sm text-gray-500">
          No code snippets have been uploaded yet.
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {snippets.map((snippet) => (
          <li
            key={snippet.id}
            className="px-4 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onSnippetClick(snippet.number)}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {snippet.title}
                  </h3>
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    #{snippet.number}
                  </span>
                </div>
                <div className="mt-1">
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {snippet.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {snippet.language}
                </span>
                <div className="mt-1 text-xs text-gray-500">
                  {formatDate(snippet.createdAt)}
                </div>
                <div className="text-xs text-gray-500">
                  by {snippet.author || 'Anonymous'}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnippetList;