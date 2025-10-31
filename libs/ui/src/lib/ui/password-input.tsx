import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@apollo/utils';

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { error?: string }
>(({ className, error, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="space-y-1">
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
