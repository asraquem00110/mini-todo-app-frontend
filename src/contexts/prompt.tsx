import type React from 'react';
import { useState, createContext, type ReactNode, useContext } from 'react';
import { PromptModal } from '@/components/ui/prompt-modal';

export interface PromptArgs {
  visible?: boolean;
  title: string;
  label?: string;
  message: string;
  setVisible?: (arg: boolean) => void;
  onPress?: (arg?: unknown) => void;
  type?: 'info' | 'error' | 'warning' | 'success';
}

type ContextInterface = (arg: PromptArgs) => void;

const initialState: PromptArgs = {
  title: '',
  message: '',
  label: '',
  visible: false,
  setVisible: () => null,
  onPress: () => {},
  type: 'info',
};

export const PromptProviderContext = createContext<ContextInterface | null>(null);
const { Provider } = PromptProviderContext;

interface Props {
  children: ReactNode;
}

export const PromptProvider: React.FC<Props> = ({ children }) => {
  const [promptState, setPromptstate] = useState<PromptArgs>(initialState);

  const prompt = ({
    title,
    message,
    label,
    onPress = () => {},
    visible = true,
    type = 'info',
  }: PromptArgs): void => {
    setPromptstate({
      title,
      message,
      label,
      visible,
      type,
      setVisible: () => setPromptstate(initialState),
      onPress: () => {
        setPromptstate(initialState);
        onPress();
      },
    });
  };

  return (
    <Provider value={prompt}>
      <PromptModal {...promptState} />
      {children}
    </Provider>
  );
};

export const usePrompt = () => {
  const ctx = useContext(PromptProviderContext);
  if (!ctx) {
    throw new Error('usePrompt must be used within a PromptProvider');
  }

  return ctx;
};
