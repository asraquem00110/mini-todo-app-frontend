import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { LayoutsProvider } from '@/contexts/layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { PromptProvider } from '@/contexts/prompt';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <PromptProvider>
          <LayoutsProvider>
            <RouterProvider router={router} />
          </LayoutsProvider>
        </PromptProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
