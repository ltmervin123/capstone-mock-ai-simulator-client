import { useEffect, useRef, useState } from 'react';

export default function useTimer() {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState('0:00');
  const secondsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      secondsRef.current = 0;
      setTimer('0:00');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      setIsRecording(true);
      secondsRef.current = 0;
      setTimer('0:00');
    }
  };

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        secondsRef.current += 1;
        setTimer(formatTime(secondsRef.current));
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRecording]);
  return { isRecording, timer, toggleRecording };
}
