import interviewStore from '@/stores/interview-store';
import { useState } from 'react';
import authStore from '@/stores/auth-store';

const greetings = [
  "Hello [candidate], I'm [interviewer], your interviewer today. How has your day been so far?",
  "Welcome [candidate], my name is [interviewer] and I'll be conducting your interview today. How are you doing this morning/afternoon?",
  "Good morning/afternoon [candidate], I'm [interviewer] and I'm delighted to be speaking with you today. How's your day going?",
  "Hi there [candidate], I'm [interviewer] and I'll be your interviewer today. How has your journey been getting here?",
  "Greetings [candidate], my name is [interviewer] and I'm pleased to meet you. How are you feeling today?",
  "Hello and welcome [candidate], I'm [interviewer] and I'll be guiding our conversation today. How has your experience been so far?",
  "Good day [candidate], I'm [interviewer] and I'm excited to learn more about you today. How are you settling in?",
  "Welcome aboard [candidate], I'm [interviewer] and I'll be your interviewer today. How has everything been going for you?",
  "Hi [candidate], thanks for joining us today. I'm [interviewer] and I'll be conducting this interview. How's everything going?",
  "Good morning/afternoon [candidate], I'm [interviewer], and I appreciate you taking the time to meet with us today. How are you doing?",
  "Hello there [candidate], my name is [interviewer] and I'm happy to be your interviewer today. How has your week been going?",
  "Welcome [candidate], I'm [interviewer] and I'll be asking you some questions today. How's your day shaping up so far?",
  "Greetings [candidate], I'm [interviewer] from the team here. I'll be conducting your interview today. How are you feeling?",
  "Hello and thank you for coming in [candidate], I'm [interviewer] and I'll be your interviewer today. How was your trip here?",
  "Hi [candidate], wonderful to meet you! I'm [interviewer] and I'm looking forward to our conversation. How's your day going so far?",
  "Good morning/afternoon [candidate], my name is [interviewer] and I'm pleased to be meeting with you. How are things with you today?",
  "Welcome to our office [candidate], I'm [interviewer] and I'll be leading our discussion today. How has your experience been so far?",
  "Hello [candidate], thank you for joining us. I'm [interviewer] and I'll be conducting your interview today. How are you feeling?",
  "Hi there [candidate], pleased to meet you! I'm [interviewer], your interviewer for today. How has your day been treating you?",
  "Good day and welcome [candidate], I'm [interviewer] and I'm looking forward to learning more about you today. How are you doing?",
];

const makeGreeting = (candidate: string, interviewer: string) => {
  const randomIndex = Math.floor(Math.random() * greetings.length);

  const greeting = greetings[randomIndex];

  if (greeting.includes('morning/afternoon')) {
    const currentHour = new Date().getHours();
    const timeOfDay = currentHour < 12 ? 'morning' : 'afternoon';
    return greeting
      .replace('morning/afternoon', timeOfDay)
      .replace('[candidate]', candidate)
      .replace('[interviewer]', interviewer);
  }

  return greeting.replace('[candidate]', candidate).replace('[interviewer]', interviewer);
};

export default function useGreeting() {
  const interviewOption = interviewStore((state) => state.interviewOption);
  const user = authStore((state) => state.user);

  const [isGreeting, setIsGreeting] = useState(true);
  const AIIntroductionMessage = makeGreeting(
    user?.firstName!,
    interviewOption?.selectedInterviewee!
  );

  return { isGreeting, setIsGreeting, AIIntroductionMessage };
}
