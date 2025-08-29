import { getTasks } from '@/data/tasks/get-tasks';
import { useQuery } from '@tanstack/react-query';

export function useGetTasks() {
  return useQuery({
    queryKey: ['/tasks'],
    queryFn: getTasks,
  });
}
