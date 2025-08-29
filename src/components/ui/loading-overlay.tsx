import type React from 'react';
import Lottie from 'react-lottie-player';
import BlueLoading from '@/assets/animations/blue-loading.json';
import { cn } from '@/lib/utils';

interface Props {
  visible: boolean;
  classes?: string;
  label?: string;
}

export const LoadingOverlay: React.FC<Props> = props => {
  const { visible, label = 'Processing ...' } = props;

  return (
    <>
      {visible && (
        <div className={cn('fixed inset-0 z-50 flex items-center justify-center bg-black/50')}>
          <div className="relative m-auto flex w-full max-w-md flex-col items-center rounded-md bg-white p-8">
            <Lottie loop animationData={BlueLoading} play style={{ width: 250, height: 250 }} />
            <h3 className="text-2xl text-blue-400">{label}</h3>
          </div>
        </div>
      )}
    </>
  );
};
