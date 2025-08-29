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
  const { visible, classes = '', label = 'Processing ...' } = props;

  return (
    <>
      {visible && (
        <div
          className={cn(
            'pin bg-graydark bg-opacity-50 fixed top-0 left-0 z-99999 flex h-screen w-screen overflow-auto',
            classes
          )}
        >
          <div className="relative m-auto flex w-full max-w-md flex-col items-center rounded-md bg-white p-8">
            <Lottie loop animationData={BlueLoading} play style={{ width: 250, height: 250 }} />
            <h3 className="text-2xl text-blue-400">{label}</h3>
          </div>
        </div>
      )}
    </>
  );
};
