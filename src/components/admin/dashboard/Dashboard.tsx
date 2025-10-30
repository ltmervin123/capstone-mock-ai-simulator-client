import Cards from './Cards';
import Header from './Header';
import RecentActivity from './RecentActivity';
import StudentBarChart from './StudentBarChart';
export default function Dashboard() {
  return (
    <div className="row-3 grid gap-6">
      <Header />
      <Cards />
      <div className="grid gap-6 lg:grid-cols-2 lg:grid-rows-1">
        <RecentActivity />
        <StudentBarChart />
      </div>
    </div>
  );
}
