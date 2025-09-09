function BottomSection() {
  return (
    <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 rounded border border-green-600 p-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 sm:h-5 sm:w-5">
          <svg
            className="h-4 w-4 text-white sm:h-3 sm:w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-xs text-gray-700 sm:text-sm lg:text-base">
          Please ensure your microphone are working
        </span>
      </div>

      <button className="w-full rounded bg-green-600 p-2 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 sm:w-auto sm:px-6 h-auto">
        Next
      </button>
    </div>
  );
}

export default BottomSection;
