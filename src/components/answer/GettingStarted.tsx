export default function GettingStarted() {
  return (
    <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-6">
      <h3 className="mb-3 text-lg font-semibold text-blue-900">Getting Started</h3>
      <ul className="space-y-2 text-slate-700">
        <li className="flex items-start gap-2">
          <span className="font-bold text-blue-600">•</span>
          <span>Click "Start Interview" to begin your mock interview session</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="font-bold text-blue-600">•</span>
          <span>Allow camera and microphone access when prompted</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="font-bold text-blue-600">•</span>
          <span>Answer questions naturally as you would in a real interview</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="font-bold text-blue-600">•</span>
          <span>Use the controls to mute/unmute or toggle your camera during the session</span>
        </li>
      </ul>
    </div>
  );
}
