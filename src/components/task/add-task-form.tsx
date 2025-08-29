import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddTask } from '@/hooks/mutation/add-task-mutation';
import { useNavigate } from '@tanstack/react-router';
import { usePrompt } from '@/contexts/prompt';
import { LoadingOverlay } from '../ui/loading-overlay';
import { BlueButton } from '../ui/blue-button';

export const AddTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

export type AddTask = z.infer<typeof AddTaskSchema>;

export const AddTaskForm = () => {
  const navigate = useNavigate();
  const prompt = usePrompt();
  const { register, handleSubmit, formState } = useForm<AddTask>({
    resolver: zodResolver(AddTaskSchema),
  });

  const { mutate: addTaskMutate, isPending } = useAddTask({
    onSuccess: data => {
      prompt({
        label: 'Ok',
        message: `Task ${data.task.title} added successfully!`,
        title: 'Success',
      });
      if (formState.isSubmitSuccessful) {
        (document.activeElement as HTMLElement)?.blur();
      }
      navigate({ to: '/' });
    },
    onError: error => {
      prompt({
        title: 'Error adding task',
        message: error.message,
        label: 'Ok',
        type: 'error',
      });
    },
  });

  const onSubmit = async (data: AddTask) => {
    addTaskMutate(data);
  };

  return (
    <>
      <LoadingOverlay visible={isPending} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded bg-white p-8 shadow-lg"
      >
        <h2 className="text-center text-2xl font-semibold text-gray-700">Add New Task</h2>

        <div>
          <input
            placeholder="title"
            type="text"
            className="placeholder:text-base-400 mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            {...register('title')}
          />
          {formState.errors.title?.message && (
            <p className="text-sm text-red-500">{formState.errors.title?.message}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="description"
            rows={3}
            className="placeholder:text-base-400 mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            {...register('description')}
          />
          {formState.errors.description?.message && (
            <p className="text-sm text-red-500">{formState.errors.description?.message}</p>
          )}
        </div>

        <BlueButton type="submit" label={isPending ? 'Adding...' : 'Add Task'} />
      </form>
    </>
  );
};
