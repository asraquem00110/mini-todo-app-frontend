import { API_BASE_URL } from '@/constants/env';

export type AddTaskArgs = {
  title: string;
  description: string;
};

export async function addTask(task: AddTaskArgs) {
  const response = await fetch(API_BASE_URL + '/tasks/add-task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Failed to add task');
  }

  return data;
}
