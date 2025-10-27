export default function DashBoardSkeleton() {
  return (
    <>
      <div className="grid min-h-[150px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 - Total Interviews */}
        <div className="min-h-[100px] rounded bg-white p-4 text-center shadow-sm md:text-left">
          <div className="mx-auto h-6 w-40 animate-pulse rounded bg-gray-200 md:mx-0" />
          <div className="mx-auto mt-3 h-10 w-20 animate-pulse rounded bg-gray-200 md:mx-0" />
          <div className="mx-auto mt-2 h-4 w-24 animate-pulse rounded bg-gray-200 md:mx-0" />
        </div>

        {/* Card 2 - Average Scores */}
        <div className="min-h-[100px] rounded bg-white p-4 text-center shadow-sm md:text-left">
          <div className="mx-auto h-6 w-36 animate-pulse rounded bg-gray-200 md:mx-0" />
          <div className="mx-auto mt-3 h-10 w-20 animate-pulse rounded bg-gray-200 md:mx-0" />
          <div className="mx-auto mt-2 h-4 w-20 animate-pulse rounded bg-gray-200 md:mx-0" />
        </div>

        {/* Card 3 - Current Best */}
        <div className="min-h-[100px] rounded bg-white p-4 text-center shadow-sm md:col-span-1 md:text-left">
          <div className="mx-auto h-6 w-32 animate-pulse rounded bg-gray-200 md:mx-0" />
          <div className="mx-auto mt-3 h-10 w-16 animate-pulse rounded bg-gray-200 md:mx-0" />
          <div className="mx-auto mt-2 h-4 w-28 animate-pulse rounded bg-gray-200 md:mx-0" />
          <div className="mx-auto mt-1 h-4 w-40 animate-pulse rounded bg-gray-200 md:mx-0" />
        </div>

        {/* Card 4 - Quick Start */}
        <div className="min-h-[100px] rounded bg-white p-4 text-center shadow-sm md:col-span-1 md:text-left">
          <div className="mx-auto h-6 w-24 animate-pulse rounded bg-gray-200 md:mx-0" />
          <div className="mx-auto mt-4 h-12 w-36 animate-pulse rounded-full bg-gray-200 md:mx-0" />
        </div>
      </div>

      {/* Line chart placeholder */}
      <div className="min-h-[250px] rounded bg-white p-4 shadow-sm">
        <div className="h-full w-full animate-pulse rounded bg-gray-200" />
      </div>

      {/* Two stat panels */}
      <div className="grid min-h-[150px] grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="min-h-[150px] rounded bg-white p-4 shadow-sm">
          <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mt-6 h-32 w-full animate-pulse rounded bg-gray-200" />
        </div>
        <div className="min-h-[150px] rounded bg-white p-4 shadow-sm">
          <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
          <div className="mt-6 h-32 w-full animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </>
  );
}
