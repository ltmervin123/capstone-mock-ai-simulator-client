type SpinnerProps = {
  height?: string;
  width?: string;
  type?: 'fullscreen' | 'center';
};

export default function Spinner({ height = 'h-8', width = 'w-8', type = 'center' }: SpinnerProps) {
  const spinner = (
    <div
      role="status"
      aria-label="Loading"
      className={`${height} ${width} inline-block animate-spin rounded-full border-4 border-solid border-neutral-300 border-t-green-700`}
    />
  );

  if (type === 'fullscreen') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
        {spinner}
      </div>
    );
  }

  if (type === 'center') {
    return <div className="flex items-center justify-center">{spinner}</div>;
  }

  return spinner;
}
