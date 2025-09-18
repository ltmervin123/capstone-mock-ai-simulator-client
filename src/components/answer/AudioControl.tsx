import useTimer from '@/hooks/answer/useTimer';
type AudioControlProps = {
  onSeeConversation: () => void;
};
export default function AudioControl({ onSeeConversation }: AudioControlProps) {
  const { isRecording, timer, toggleRecording } = useTimer();

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-md py-4">
      <div className="flex flex-col items-center space-y-2">
        <button
          onClick={toggleRecording}
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            isRecording ? 'bg-red-500' : 'bg-red-400'
          } transition-colors hover:bg-red-500`}
        >
          {isRecording ? (
            // Pause icon (two vertical bars)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            // Microphone icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" x2="12" y1="19" y2="22"></line>
            </svg>
          )}
        </button>
        <p className="w-16 text-center text-sm font-bold tabular-nums text-gray-600">
          {timer}/3:00
        </p>
      </div>
      <button
        className="text-sm text-gray-600 hover:cursor-pointer hover:text-gray-800"
        onClick={onSeeConversation}
      >
        See conversation?
      </button>
    </div>
  );
}
