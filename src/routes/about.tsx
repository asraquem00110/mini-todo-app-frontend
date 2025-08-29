import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="test-custom-css">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p>Test</p>
      <h3 className="text-custom-blue">Text</h3>
    </div>
  );
}
