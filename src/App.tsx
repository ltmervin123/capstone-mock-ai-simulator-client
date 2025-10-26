import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import InterviewPage from './pages/InterviewPage';
import AnswerPage from './pages/AnswerPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import AuthCheck from './middlewares/AuthCheck';
import InterviewOptionCheck from './middlewares/InterviewOptionCheck';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route element={<AuthCheck />}>
          <Route path="/user/dashboard" element={<DashboardPage />} />
          <Route path="/user/history" element={<HistoryPage />} />
          <Route path="/user/interview" element={<InterviewPage />} />
          <Route element={<InterviewOptionCheck />}>
            <Route path="/interview/answer" element={<AnswerPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
