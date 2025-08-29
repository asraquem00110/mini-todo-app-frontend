import { useGetTasks } from '@/hooks/query/use-get-tasks-query';
import type { Task } from '@/types/Task';
import { Link } from '@tanstack/react-router';
import { LoadingOverlay } from '../ui/loading-overlay';

export const TaskLists = () => {
  const { data, isLoading, error } = useGetTasks();

  if (isLoading)
    return (
      <div className="text-muted-foreground flex items-center justify-center py-10">
        <LoadingOverlay visible={true} label="Loading..." />
      </div>
    );

  if (error)
    return (
      <div className="bg-destructive/15 text-destructive rounded-md p-4">
        Error: {error.message}
      </div>
    );
  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Task List</h2>
      <Link to="/add-task">
        <div className="mb-[20px] flex justify-end">
          <button className="cursor-pointer">New Task</button>
        </div>
      </Link>
      <div className="space-y-4">
        {data.tasks.length === 0 && (
          <div className="text-muted-foreground flex items-center justify-center py-10">
            No tasks yet
          </div>
        )}
        {data.tasks.map((task: Task) => (
          <div
            key={task.id}
            className="rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
            <p className="mt-2 text-gray-700">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
