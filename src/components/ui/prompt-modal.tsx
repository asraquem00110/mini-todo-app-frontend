import type React from 'react';
import type { PromptArgs } from '@/contexts/prompt';
import { BlueButton } from './blue-button';
import { cn } from '@/lib/utils';
import { RedButton } from './red-button';

const typeColors = {
  info: 'text-blue-400',
  error: 'text-red-400',
  warning: 'text-yellow-400',
  success: 'text-green-400',
} as const;

export const PromptModal: React.FC<PromptArgs> = props => {
  const { visible, title, message, label = 'Ok', setVisible, onPress, type } = props;

  const closeModal = () => {
    if (setVisible) setVisible(false);
    if (onPress) onPress();
  };

  return (
    <>
      {visible && (
        <div className="pin bg-graydark bg-opacity-50 fixed flex h-screen w-screen overflow-auto">
          <div className="relative m-auto flex w-full max-w-md flex-col rounded-md bg-white p-8">
            <span
              className={cn(
                'self-center text-[30px] font-semibold',
                typeColors[type as keyof typeof typeColors]
              )}
            >
              {title}
            </span>
            <p className="mt-[20px] mb-[20px] text-[20px] font-medium">{message}</p>
            <div className="mt-[20px]">
              {type === 'info' && <BlueButton onClick={closeModal} label={label} />}
              {type === 'error' && <RedButton onClick={closeModal} label={label} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
