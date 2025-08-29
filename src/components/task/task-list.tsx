import { useGetTasks } from '@/hooks/query/use-get-tasks-query';
import type { Task } from '@/types/Task';
import { Link } from '@tanstack/react-router';
import { LoadingOverlay } from '../ui/loading-overlay';
import { TaskComponent } from './task';
import { ErrorComponent } from '../error';

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
      <div className="flex h-screen w-screen items-center justify-center">
        <ErrorComponent onClick={() => window.location.reload()} message={error.message} />
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
          <TaskComponent task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};
