import { AddTaskForm } from '@/components/task/add-task-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/add-task')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <AddTaskForm />
    </div>
  );
}
