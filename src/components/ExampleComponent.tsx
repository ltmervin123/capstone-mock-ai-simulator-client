// Example TypeScript React Component
import React, { useState } from 'react';

// Interface for component props
interface ExampleComponentProps {
  title: string;
  count?: number;
  onCountChange?: (newCount: number) => void;
  children?: React.ReactNode;
  isDisabled?: boolean;
}

// Example component with TypeScript
const ExampleComponent: React.FC<ExampleComponentProps> = ({
  title,
  count = 0,
  onCountChange,
  children,
  isDisabled = false,
}) => {
  const [localCount, setLocalCount] = useState<number>(count);

  const handleIncrement = (): void => {
    const newCount = localCount + 1;
    setLocalCount(newCount);
    onCountChange?.(newCount);
  };

  const handleDecrement = (): void => {
    const newCount = Math.max(0, localCount - 1);
    setLocalCount(newCount);
    onCountChange?.(newCount);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handleDecrement}
          disabled={isDisabled || localCount === 0}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          -
        </button>

        <span className="text-lg font-medium">{localCount}</span>

        <button
          onClick={handleIncrement}
          disabled={isDisabled}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          +
        </button>
      </div>

      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default ExampleComponent;
export type { ExampleComponentProps };
