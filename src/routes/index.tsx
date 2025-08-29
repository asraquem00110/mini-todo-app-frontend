import { TaskLists } from '@/components/task/task-list';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <TaskLists />
    </div>
  );
}
