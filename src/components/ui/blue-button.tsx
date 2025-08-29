import type React from 'react';
import { useThrottle } from '@/hooks/use-throttle';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  onClick?: () => unknown;
};

export const BlueButton: React.FC<Props> = (input: Props) => {
  const { label, onClick } = input;

  const throttledPress = useThrottle(onClick, 2000);

  return (
    <button
      onClick={onClick ? throttledPress : () => null}
      className="inline-flex h-[50px] w-[100%] cursor-pointer items-center justify-center gap-2.5 rounded-[5px] bg-blue-400 px-10 py-4 text-center text-[16px] font-medium text-[white]"
    >
      {label}
    </button>
  );
};
