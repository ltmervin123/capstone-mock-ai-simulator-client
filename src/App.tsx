import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import SignupPage from './pages/public/SignupPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';
import NotFoundPage from './pages/public/NotFoundPage';
import EmailVerificationPage from './pages/public/EmailVerificationPage';

// Student Pages
import StudentDashboardPage from './pages/student/DashboardPage';
import StudentHistoryPage from './pages/student/HistoryPage';
import StudentInterviewPage from './pages/student/InterviewPage';
import StudentAnswerPage from './pages/student/AnswerPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/DashboardPage';
import AdminUsersPage from './pages/admin/UserPage';
import AdminQuestionPage from './pages/admin/QuestionsPage';

// Middlewares
import AuthCheck from './middlewares/AuthCheck';
import InterviewOptionCheck from './middlewares/InterviewOptionCheck';
import StudentCheck from './middlewares/StudentCheck';
import AdminCheck from './middlewares/AdminCheck';

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
          <Route element={<StudentCheck />}>
            <Route path="/user/dashboard" element={<StudentDashboardPage />} />
            <Route path="/user/history" element={<StudentHistoryPage />} />
            <Route path="/user/interview" element={<StudentInterviewPage />} />
            <Route element={<InterviewOptionCheck />}>
              <Route path="/interview/answer" element={<StudentAnswerPage />} />
            </Route>
          </Route>

          <Route element={<AdminCheck />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/questions" element={<AdminQuestionPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
