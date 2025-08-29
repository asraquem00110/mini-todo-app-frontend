import { deleteTask, type DeleteTaskArgs } from '@/data/tasks/delete-task';
import { useMutation, useQueryClient, type MutationOptions } from '@tanstack/react-query';

export type UseDeleteTaskMutationArgs = MutationOptions<
  Awaited<ReturnType<typeof deleteTask>>,
  Error,
  DeleteTaskArgs
>;

export function useDeleteTask(args?: UseDeleteTaskMutationArgs) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (data, params, context) => {
      queryClient.invalidateQueries({ queryKey: ['/tasks'] });
      if (args?.onSuccess) return args.onSuccess(data, params, context);
    },
    onError: (error, variables, context) => {
      if (args?.onError) return args.onError(error, variables, context);
    },
  });
}
