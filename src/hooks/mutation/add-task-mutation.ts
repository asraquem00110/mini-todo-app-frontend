import { addTask, type AddTaskArgs } from '@/data/tasks/add-task';
import { useMutation, useQueryClient, type MutationOptions } from '@tanstack/react-query';

export type UseAddTaskMutationArgs = MutationOptions<
  Awaited<ReturnType<typeof addTask>>,
  Error,
  AddTaskArgs
>;

export function useAddTask(args?: UseAddTaskMutationArgs) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTask,
    onSuccess: (data, params, context) => {
      queryClient.invalidateQueries({ queryKey: ['/tasks'] });
      if (args?.onSuccess) return args.onSuccess(data, params, context);
    },
    onError: (error, variables, context) => {
      if (args?.onError) return args.onError(error, variables, context);
    },
  });
}
