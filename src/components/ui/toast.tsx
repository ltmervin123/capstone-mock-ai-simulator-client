import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type ToastProps = {
  statusCode: number;
  message: string;
  onClose?: () => void;
};

export default function Toast({ statusCode, message, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  const isSuccess = statusCode >= 200 && statusCode < 300;
  const isClientError = statusCode >= 400 && statusCode < 500;
  const isServerError = statusCode >= 500;

  let variantStyles = 'bg-background border-border text-foreground';
  let icon = <Info className="h-5 w-5 text-primary" />;
  let title = 'Info';

  if (isSuccess) {
    variantStyles =
      'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-900 dark:text-green-100';
    icon = <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />;
    title = 'Success';
  } else if (isClientError) {
    variantStyles =
      'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-900 dark:text-yellow-100';
    icon = <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
    title = 'Warning';
  } else if (isServerError) {
    variantStyles =
      'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-900 dark:text-red-100';
    icon = <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
    title = 'Error';
  }

  return (
    <div
      className={cn(
        'fixed left-4 right-4 top-4 z-50 flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 animate-in slide-in-from-top-full md:left-auto md:right-4 md:top-4 md:w-full md:max-w-md md:slide-in-from-right-full',
        variantStyles
      )}
    >
      <div className="shrink-0 pt-0.5">{icon}</div>
      <div className="grid flex-1 gap-1">
        <h3 className="font-semibold leading-none tracking-tight">
          {title} <span className="text-xs font-normal opacity-70">({statusCode})</span>
        </h3>
        <p className="break-words text-sm opacity-90">{message}</p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="shrink-0 rounded-md p-1 opacity-50 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <span className="sr-only">Close</span>
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
