import { cn } from '@apollo/utils';
import { Spinner } from './spinner';

interface BackdropProps {
  /** Optional extra classes for the outer div */
  className?: string;
  /** Whether to show a spinner in the center */
  showSpinner?: boolean;
}

function Backdrop({ className, showSpinner = true }: BackdropProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-primary/60',
        className
      )}
    >
      {showSpinner && <Spinner className="text-primary-foreground" />}
    </div>
  );
}

export { Backdrop };
