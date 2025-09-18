import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export default function DashboardCards() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-[100px] rounded bg-white p-4 text-center shadow-sm md:text-left">
        <h1 className="text-2xl font-semibold">Total Interviews</h1>
        <h1 className="text-4xl font-bold text-green-700">8</h1>
        <p className="font-normal">sessions</p>
      </div>
      <div className="min-h-[100px] rounded bg-white p-4 text-center shadow-sm md:text-left">
        <h1 className="text-2xl font-semibold">Average Scores</h1>
        <h1 className="text-4xl font-bold text-green-700">70%</h1>
        <p className="font-normal">overall</p>
      </div>
      <div className="min-h-[100px] rounded bg-white p-4 text-center shadow-sm md:col-span-1 md:text-left">
        <h1 className="text-2xl font-semibold">Current Best</h1>
        <h1 className="text-4xl font-bold text-green-700">85%</h1>
        <p className="font-normal">Basic Interview</p>
        <p className="font-normal">January 26, 2025 | 8:00 A.M</p>
      </div>
      <div className="min-h-[100px] rounded bg-white p-4 text-center shadow-sm md:col-span-1 md:text-left">
        <h1 className="text-2xl font-semibold">Quick Start</h1>
        <Button
          className="mt-4 min-h-[50px] rounded-3xl bg-green-700 hover:bg-green-600"
          onClick={() => navigate('/interview')}
        >
          New Interview
        </Button>
      </div>
    </>
  );
}
