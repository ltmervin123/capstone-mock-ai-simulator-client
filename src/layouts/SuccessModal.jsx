export default function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex animate-[fadeIn_0.2s_ease-in-out] items-center justify-center bg-white/30 backdrop-blur-[1px]">
      <div className="w-[550px] animate-[scaleIn_0.3s_ease-in-out] rounded-lg bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-600">
            <svg
              width="90"
              height="90"
              viewBox="0 0 90 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M45.0001 88.3332C50.6918 88.3402 56.3287 87.2226 61.5871 85.0444C66.8454 82.8662 71.6216 79.6705 75.6411 75.6409C79.6708 71.6213 82.8665 66.8452 85.0446 61.5868C87.2228 56.3284 88.3405 50.6915 88.3335 44.9999C88.3405 39.3082 87.2228 33.6713 85.0446 28.4129C82.8665 23.1546 79.6708 18.3784 75.6411 14.3589C71.6216 10.3292 66.8454 7.13351 61.5871 4.95535C56.3287 2.7772 50.6918 1.65952 45.0001 1.66654C39.3085 1.65952 33.6715 2.7772 28.4132 4.95535C23.1548 7.13351 18.3787 10.3292 14.3591 14.3589C10.3295 18.3784 7.13376 23.1546 4.9556 28.4129C2.77744 33.6713 1.65976 39.3082 1.66678 44.9999C1.65976 50.6915 2.77744 56.3284 4.9556 61.5868C7.13376 66.8452 10.3295 71.6213 14.3591 75.6409C18.3787 79.6705 23.1548 82.8662 28.4132 85.0444C33.6715 87.2226 39.3085 88.3402 45.0001 88.3332Z" />
              <path
                d="M27.6667 45L40.6667 58L66.6667 32"
                stroke="#0A7E32"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <p className="text-center text-gray-800">
            Thanks for signing up! We've sent an activation link to the email address you provided.
            Please check your inbox and click the link to verify your email and activate your
            account.
          </p>

          <button
            onClick={onClose}
            className="mt-4 rounded-md bg-green-600 px-8 py-2 font-medium text-white hover:bg-green-700"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
