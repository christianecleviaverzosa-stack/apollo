import {
  ChangeEventHandler,
  DragEventHandler,
  InputHTMLAttributes,
  forwardRef,
} from 'react';
import { cn } from '@apollo/utils';

type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  onFileChange: (file: File) => void;
  error?: string;
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, error, onFileChange, ...props }, ref) => {
    const { children, ...inputProps } = props;

    const handleDrop: DragEventHandler = (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        onFileChange(file);
      }
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileChange(file);
      }
    };

    return (
      <div className="h-full" onDragOver={(e) => e.preventDefault()}>
        <label
          onDrop={handleDrop}
          className={cn(
            'border-primary rounded-xl border-2 border-dashed text-center cursor-pointer',
            className
          )}
        >
          <input
            ref={ref}
            {...inputProps}
            className="hidden"
            type="file"
            onChange={handleChange}
          />
          {children}
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </label>
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';
