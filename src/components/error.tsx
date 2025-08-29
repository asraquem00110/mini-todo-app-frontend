import { RedButton } from './ui/red-button';
interface Props<T> {
  onClick: T;
  message?: string;
}

export const ErrorComponent = <T extends (...args: unknown[]) => void>(props: Props<T>) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center py-4">
      <div className="flex flex-col items-center justify-center">
        <span className="mb-15 text-[75px] font-extrabold text-red-400">Oops !</span>
        <span className="text-[25px] font-medium">
          Something went wrong! Please contact the administrator
        </span>
        <span className="mb-15">{props?.message}</span>
        <div className="w-[330px]">
          <RedButton
            onClick={() => {
              if (props.onClick) props.onClick();
            }}
            label="Retry"
          />
        </div>
      </div>
    </div>
  );
};
