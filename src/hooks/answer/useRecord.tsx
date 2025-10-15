import { useEffect, useRef, useState } from 'react';
import socketStore from '@/stores/socket-io-store';
import interviewStore from '@/stores/interview-store';
export default function useRecord() {
  const socket = socketStore((state) => state.socket);
  const emitEvent = socketStore((state) => state.emitEvent);
  const disconnectSocket = socketStore((state) => state.disconnectSocket);
  const connectSocket = socketStore((state) => state.connectSocket);
  const setAiResponse = interviewStore((state) => state.setAiResponse);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState('');
  const [realTimeTranscription, setRealTimeTranscription] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const micRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [hasPermissionError, setHasPermissionError] = useState(false);
  const [isInitializing, setInitializing] = useState(false);

  useEffect(() => {
    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    if (micRef.current && !mediaRecorderRef.current) {
      mediaRecorderRef.current = new MediaRecorder(micRef.current);
    }
  }, [micRef.current]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.off('real-time-transcription');
        socket.off('final-transcription');
        socket.off('transcription-complete');
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async (AIIntroductionMessage: string) => {
    setHasPermissionError(false);
    setInitializing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      streamRef.current = stream;

      // Extract audio tracks for the microphone reference
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        micRef.current = new MediaStream(audioTracks);
        // Initialize MediaRecorder with audio stream
        if (!mediaRecorderRef.current) {
          mediaRecorderRef.current = new MediaRecorder(micRef.current);
        }
      } else {
        console.warn('No audio tracks available in the stream');
      }
      setAiResponse(AIIntroductionMessage);
    } catch (err) {
      console.error('Camera access denied:', err);
      setHasPermissionError(true);
    } finally {
      setInitializing(false);
    }
  };

  const stopCamera = () => {
    // Stop recording if active
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }

    // Stop all tracks in the stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }

    // Clean up the audio stream
    if (micRef.current) {
      micRef.current.getTracks().forEach((track) => track.stop());
      micRef.current = null;
    }

    // Reset video element
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    // Reset MediaRecorder
    mediaRecorderRef.current = null;
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const startRecording = async () => {
    try {
      if (!micRef.current || !mediaRecorderRef.current) return;
      setIsRecording(true);
      setIsUserSpeaking(true);

      socket!.off('real-time-transcription');

      socket!.on('real-time-transcription', (data) => {
        if (data.isFinal) {
          setFinalAnswer((prev) => `${prev} ${data.text.trim()}`);
          setRealTimeTranscription(data.text.trim());
        }
      });
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          emitEvent('audio-stream', event.data);
        }
      };
      mediaRecorderRef.current.start(100);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsUserSpeaking(false);

    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.onstop = async () => {
      if (socket!.connected) {
        emitEvent('stop-transcription');
      }
    };
    // Listen for final transcription
    socket!.once('final-transcription', (data) => {
      if (data?.isFinal) {
        setFinalAnswer((prev) => `${prev} ${data.text.trim()}`);
      }
    });

    await new Promise<void>((resolve) => {
      socket!.once('transcription-complete', (data) => {
        if (data?.message) {
          resolve();
        }
      });
    });

    setFinalAnswer('');
    setRealTimeTranscription('');
  };

  return {
    isInterviewActive,
    isCameraOn,
    videoRef,
    streamRef,
    isRecording,
    finalAnswer,
    realTimeTranscription,
    isUserSpeaking,
    isInitializing,
    hasPermissionError,
    setIsRecording,
    startRecording,
    stopRecording,
    startCamera,
    stopCamera,
    toggleCamera,
    setIsInterviewActive,
  };
}
