// components/TabGuard.tsx
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface TabGuardProps {
  children: React.ReactNode;
  timeout?: number; // Time in ms before closing the tab after switching
}

export const TabGuard: React.FC<TabGuardProps> = ({ 
  children, 
  timeout = 3000 // Default timeout of 3 seconds
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const [warningShown, setWarningShown] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Handler for visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsHidden(true);
        
        if (!warningShown) {
          // Show warning toast only once
          toast.error("Warning: Tab switching detected! Tab will close soon.", {
            duration: timeout,
            icon: '⚠️',
          });
          setWarningShown(true);
        }
        
        // Set timeout to close the tab
        const timeoutId = setTimeout(() => {
          // Use window.close() to attempt to close the tab
          window.close();
          
          // As a fallback (since browsers may block window.close)
          // Redirect to a blank page
          window.location.href = "about:blank";
          
          // Another fallback - clear the page content
          document.body.innerHTML = `
            <div style="text-align: center; padding: 50px; font-family: sans-serif;">
              <h1>Session Terminated</h1>
              <p>This page was closed due to tab switching detection.</p>
              <button onclick="window.location.reload()">Reload Page</button>
            </div>
          `;
        }, timeout);
        
        setCloseTimeout(timeoutId);
      } else {
        setIsHidden(false);
        if (closeTimeout) {
          // Clear the timeout if user comes back in time
          clearTimeout(closeTimeout);
          setCloseTimeout(null);
          
          if (warningShown) {
            toast.success("Tab closing canceled. Welcome back!", {
              duration: 3000,
            });
          }
        }
      }
    };

    // Handler for window blur (switching to another application)
    const handleWindowBlur = () => {
      handleVisibilityChange(); // Reuse the same logic
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    // Clean up
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [timeout, warningShown, closeTimeout]);

  return <>{children}</>;
};