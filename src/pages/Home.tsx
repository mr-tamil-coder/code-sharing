// pages/index.tsx
import React, { useState, useEffect } from 'react';
import SearchBox from '../components/SearchBox';
import CodeViewer from '../components/CodeViewer';
import SnippetList from '../components/SnippetList';
import UploadSnippet from '../components/UploadSnippet';
import { getSnippetByNumber, getRecentSnippets } from '../api/snippets';
import toast from 'react-hot-toast';
import { TabGuard } from '../components/TabGuard';

export default function Home() {
  const [snippet, setSnippet] = useState<any>(null);
  const [recentSnippets, setRecentSnippets] = useState<any[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  // Fetch recent snippets on load
  useEffect(() => {
    const fetchRecentSnippets = async () => {
      try {
        const data = await getRecentSnippets();
        setRecentSnippets(data);
      } catch (error) {
        console.error('Error fetching recent snippets:', error);
      }
    };
    
    fetchRecentSnippets();
  }, []);

  const handleSearch = async (query: string) => {
    try {
      const data = await getSnippetByNumber(query);
      setSnippet(data);
    } catch (error) {
      toast.error('No code snippet found with that number');
      console.error('Error:', error);
    }
  };

  return (
    // TabGuard component will handle the tab switching detection
    <TabGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-indigo-600 shadow-md">
          <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <h1 className="ml-2 text-xl font-bold text-white">CodeShare</h1>
            </div>
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-indigo-50 transition-colors"
            >
              Upload Code
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Code Snippet</h2>
            <div className="flex">
              <SearchBox onSearch={handleSearch} />
            </div>
            <p className="mt-2 text-sm text-gray-500">Enter a snippet number (e.g., "CS101-1") to view the code</p>
          </div>
          
          {snippet ? (
            <CodeViewer
              code={snippet.code}
              title={snippet.title}
              description={snippet.description}
              language={snippet.language}
              number={snippet.number}
              createdAt={snippet.createdAt}
              author={snippet.author}
            />
          ) : (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Uploads</h2>
              <SnippetList snippets={recentSnippets} onSnippetClick={(id) => handleSearch(id)} />
            </div>
          )}
        </div>
        
        {isUploadModalOpen && (
          <UploadSnippet 
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
            onSuccess={() => {
              setIsUploadModalOpen(false);
              // Refresh the recent snippets list
              getRecentSnippets().then(data => setRecentSnippets(data));
            }}
          />
        )}
      </div>
    </TabGuard>
  );
}