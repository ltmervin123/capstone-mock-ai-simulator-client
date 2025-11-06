import Header from './Header';
import FilterBar from './FilterBar';
import ResultsTable from './ResultsTable';

const Index = () => {
  return (
    <div className="min-h-screen flex-1 overflow-x-auto font-inter">
      <Header />
      <div className="mt-6">
        <div className="mt-6 bg-white p-4">
          <FilterBar />
          <ResultsTable />
        </div>
      </div>
    </div>
  );
};

export default Index;
