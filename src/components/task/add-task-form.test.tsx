import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddTaskForm } from './add-task-form';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mocks = vi.hoisted(() => {
  return {
    prompt: vi.fn(),
    navigate: vi.fn(),
    addTask: vi.fn(),
  };
});
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mocks.navigate,
}));
vi.mock('@/contexts/prompt', () => ({
  usePrompt: () => mocks.prompt,
}));
vi.mock('@/data/tasks/add-task', () => ({
  addTask: mocks.addTask,
}));

const renderComponentUnderTest = () => {
  const view = render(<AddTaskForm />, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
    ),
  });

  const elements = {
    titleInput: () => screen.getByPlaceholderText('title'),
    descriptionInput: () => screen.getByPlaceholderText('description'),
    submitButton: () => screen.getByRole('button', { name: /add task/i }),
    backButton: () => screen.getByRole('button', { name: /back/i }),
  };

  return {
    elements,
    ...view,
  };
};

describe('AddTaskForm', () => {
  it('renders the form properly', () => {
    const { elements } = renderComponentUnderTest();

    expect(elements.titleInput()).toBeInTheDocument();
    expect(elements.descriptionInput()).toBeInTheDocument();
    expect(elements.submitButton()).toBeInTheDocument();
    expect(elements.backButton()).toBeInTheDocument();
  });

  it("should navigate back when 'Back' button is clicked", () => {
    const { elements } = renderComponentUnderTest();

    fireEvent.click(elements.backButton());
    expect(mocks.navigate).toHaveBeenCalledWith({ to: '/' });
  });

  it('should fill out the form with valid data and submit', async () => {
    const { elements } = renderComponentUnderTest();

    const mockFormData = {
      title: 'Test Title',
      description: 'Test Description',
    };

    fireEvent.change(elements.titleInput(), {
      target: { value: mockFormData.title },
    });
    fireEvent.change(elements.descriptionInput(), {
      target: { value: mockFormData.description },
    });

    expect(elements.titleInput()).toHaveValue(mockFormData.title);
    expect(elements.descriptionInput()).toHaveValue(mockFormData.description);

    await userEvent.click(elements.submitButton());

    expect(mocks.addTask).toHaveBeenCalledWith({
      title: mockFormData.title,
      description: mockFormData.description,
    });
  });

  it('should show validation errors when submitting empty form', async () => {
    const { elements } = renderComponentUnderTest();

    const mockFormData = {
      title: '',
      description: '',
    };

    fireEvent.change(elements.titleInput(), {
      target: { value: mockFormData.title },
    });
    fireEvent.change(elements.descriptionInput(), {
      target: { value: mockFormData.description },
    });

    expect(elements.titleInput()).toHaveValue(mockFormData.title);
    expect(elements.descriptionInput()).toHaveValue(mockFormData.description);

    await userEvent.click(elements.submitButton());

    expect(mocks.addTask).not.toHaveBeenCalled();
  });
});
