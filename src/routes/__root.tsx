import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { NotFound } from '@/components/not-found';

export const Route = createRootRoute({
  component: RootPageComponent,
  notFoundComponent: NotFound,
});

function RootPageComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
