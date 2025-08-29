import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddTask } from '@/hooks/mutation/add-task-mutation';
import { useNavigate } from '@tanstack/react-router';

export const AddTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

export type AddTask = z.infer<typeof AddTaskSchema>;

export const AddTaskForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<AddTask>({
    resolver: zodResolver(AddTaskSchema),
  });

  const { mutate: addTaskMutate, isPending } = useAddTask({
    onSuccess: () => {
      alert('Task added successfully!');
      if (formState.isSubmitSuccessful) {
        (document.activeElement as HTMLElement)?.blur();
      }
      navigate({ to: '/' });
      return;
    },
    onError: error => {
      alert(`Error adding task: ${error.message}`);
      return;
    },
  });

  const onSubmit = async (data: AddTask) => {
    addTaskMutate(data);
  };

  return (
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

      <button
        type="submit"
        className="w-full cursor-pointer rounded bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
      >
        {isPending ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
};
