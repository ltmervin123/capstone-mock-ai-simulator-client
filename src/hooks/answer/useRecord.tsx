import { useEffect, useRef, useState } from 'react';

export default function useRecord() {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isCameraOn && isInterviewActive) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isCameraOn, isInterviewActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (err) {
      console.error('Camera access denied:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = isMuted;
      });
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };
  return {
    isInterviewActive,
    isMuted,
    isCameraOn,
    videoRef,
    streamRef,
    startCamera,
    stopCamera,
    toggleMute,
    toggleCamera,
    setIsInterviewActive,
    isRecording,
    setIsRecording,
  };
}
