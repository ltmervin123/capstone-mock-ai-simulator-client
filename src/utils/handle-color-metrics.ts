import { TrendingUp, Minus, TrendingDown } from "lucide-react";

export const getScoreColor = (percentage: number) => {
  if (percentage >= 75) return 'text-green-600';
  if (percentage >= 50) return 'text-yellow-600';
  return 'text-red-600';
};

export const getProgressColor = (percentage: number) => {
  if (percentage >= 75) return 'bg-green-500';
  if (percentage >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
};

export const getTrendIcon = (percentage: number) => {
  if (percentage >= 75) return TrendingUp;
  if (percentage >= 50) return Minus;
  return TrendingDown;
};

export const getFillerCountColor = (count: number) => {
  if (count <= 5) return 'text-green-600 bg-green-100';
  if (count <= 12) return 'text-yellow-600 bg-yellow-100';
  return 'text-red-600 bg-red-100';
};
