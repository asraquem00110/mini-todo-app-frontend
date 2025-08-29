import { API_BASE_URL } from '@/constants/env';

export async function getTasks() {
  const response = await fetch(API_BASE_URL + '/tasks/get-tasks', {
    method: 'GET',
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Failed to get tasks');
  }

  return data;
}
