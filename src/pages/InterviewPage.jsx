import React from 'react';
import AppHeader from '../layouts/AppHeader';
import AppSidebar from '../layouts/AppSidebar';
import Interview from '../components/interview/Interview';
export default function InterviewPage() {
  return (
    <div className="flex flex-col bg-green-50">
      <AppHeader />

      <div className="flex min-h-screen flex-1 overflow-hidden pt-24">
        <div>
          <AppSidebar />
        </div>

        <div className="min-h-screen flex-1 overflow-hidden p-4">
          <Interview />
        </div>
      </div>
    </div>
  );
}
