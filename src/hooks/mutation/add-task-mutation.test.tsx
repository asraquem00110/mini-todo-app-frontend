import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAddTask, type UseAddTaskMutationArgs } from './add-task-mutation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mocks = vi.hoisted(() => {
  return {
    addTask: vi.fn(),
  };
});

vi.mock('@/data/tasks/add-task', () => ({
  addTask: mocks.addTask,
}));

function renderTestHook(args: UseAddTaskMutationArgs = {}) {
  return renderHook(() => useAddTask(args), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
    ),
  });
}
describe('useAddTask()', () => {
  it('should create new task', async () => {
    const { result } = renderTestHook();
    const mockId = crypto.randomUUID();

    const mockTask = {
      title: 'New Task',
      description: 'Task Description',
    };

    mocks.addTask.mockResolvedValueOnce({
      id: mockId,
      title: mockTask.title,
      description: mockTask.description,
    });

    result.current.mutate(mockTask);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mocks.addTask).toHaveBeenCalledWith(mockTask);
    expect(mocks.addTask).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual({
      id: mockId,
      title: mockTask.title,
      description: mockTask.description,
    });
  });

  it('should handle error when creating new task fails', async () => {
    const error = new Error('Failed to create task');
    const { result } = renderTestHook();

    mocks.addTask.mockRejectedValueOnce(error);

    result.current.mutate({
      title: 'New Task',
      description: 'Task Description',
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
