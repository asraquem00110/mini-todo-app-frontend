import { useGetTasks } from '@/hooks/query/use-get-tasks-query';
import type { Task } from '@/types/Task';
import { Link } from '@tanstack/react-router';
import { LoadingOverlay } from '../ui/loading-overlay';
import { TaskComponent } from './task';
import { ErrorComponent } from '../error';

export const TaskLists = () => {
  const { data, isLoading, error, refetch } = useGetTasks();

  if (isLoading)
    return (
      <div className="text-muted-foreground flex items-center justify-center py-10">
        <LoadingOverlay visible={true} label="Loading..." />
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ErrorComponent onClick={() => refetch()} message={error.message} />
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
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-10">
            <span className="text-lg font-medium text-gray-500">No tasks yet</span>
            <span className="mt-1 text-sm text-gray-400">Start by adding a new task!</span>
          </div>
        )}
        {data.tasks.map((task: Task) => (
          <TaskComponent task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};
