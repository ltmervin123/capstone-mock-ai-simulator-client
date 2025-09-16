export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface InterviewSession {
  id: string;
  title: string;
  type: InterviewType;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  date: Date;
  duration?: number;
  score?: number;
}

export interface InterviewType {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedDuration: number;
}

export interface DashboardStats {
  totalInterviews: number;
  completedInterviews: number;
  averageScore: number;
  improvementRate: number;
}

export interface ChartDataPoint {
  date: string;
  score: number;
  type?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface FormData {
  [key: string]: any;
}
