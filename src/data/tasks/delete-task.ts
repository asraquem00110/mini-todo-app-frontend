import { API_BASE_URL } from '@/constants/env';

export interface DeleteTaskArgs {
  task_id: string;
}

export const deleteTask = async (args: DeleteTaskArgs) => {
  const response = await fetch(API_BASE_URL + `/tasks/delete-task/${args.task_id}`, {
    method: 'DELETE',
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Failed to delete task');
  }

  return data;
};
