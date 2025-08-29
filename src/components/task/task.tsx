import type { Task } from '@/types/Task';
import type React from 'react';
import { Trash } from 'lucide-react';
import { useThrottle } from '@/hooks/use-throttle';
import { useDeleteTask } from '@/hooks/mutation/delete-task-mutation';
import { usePrompt } from '@/contexts/prompt';
import { useNavigate } from '@tanstack/react-router';
import { LoadingOverlay } from '../ui/loading-overlay';

interface Props {
  task: Task;
  key: string;
}

export const TaskComponent: React.FC<Props> = ({ task, key }) => {
  const prompt = usePrompt();
  const navigate = useNavigate();
  const { mutate: deleteTaskMutate, isPending } = useDeleteTask({
    onSuccess: () => {
      prompt({
        label: 'Ok',
        message: `Task has been deleted!`,
        title: 'Success',
      });
      navigate({ to: '/' });
    },
    onError: error => {
      prompt({
        title: 'Error deleting task',
        message: error.message,
        label: 'Ok',
        type: 'error',
      });
    },
  });

  const deleteTask = () => {
    const isConfirmed = confirm('Are you sure you want to delete this task?');
    if (isConfirmed) {
      deleteTaskMutate({ task_id: task.id });
    }
  };

  const throttledPress = useThrottle(deleteTask, 2000);
  return (
    <>
      <LoadingOverlay visible={isPending} />
      <div
        key={key}
        className="relative rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg"
      >
        <button onClick={throttledPress} className="absolute top-4 right-4 cursor-pointer">
          <Trash size={24} color="red" />
        </button>
        <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
        <p className="mt-2 text-gray-700">{task.description}</p>
      </div>
    </>
  );
};
