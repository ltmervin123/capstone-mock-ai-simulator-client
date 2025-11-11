import { useState } from 'react';
import { Eye, FileSpreadsheet } from 'lucide-react';
import ResultSummaryModal from './ResultSummaryModal';
import { InterviewFilterParams, InterviewPreview } from '@/types/admin/report-type';
import { handleDateFormat } from '@/utils/handle-dates';
import { getProgramAcronym } from '@/utils/handle-programs';
import authStore from '@/stores/public/auth-store';
import { useGetInterviews } from '@/queries/admin/useReport';
import filterOptionStore from '@/stores/admin/report-filter-option-store';
import useExcel from '@/hooks/shared/useExcel';

export default function ResultsTable() {
  const filterOptions = filterOptionStore((state) => state.filterOptions);
  const user = authStore((state) => state.user);
  const {
    data: interviews = [],
    isLoading,
    isError,
  } = useGetInterviews(user!, filterOptions as InterviewFilterParams);
  const [selectedResult, setSelectedResult] = useState<InterviewPreview | null>(null);
  const { isExporting, handleExport } = useExcel();

  return (
    <div className="rounded bg-white">
      <div className="mb-2 flex justify-end gap-2">
        <button
          className="flex items-center gap-1 rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          onClick={() => handleExport(interviews)}
          disabled={interviews.length === 0 || isExporting}
        >
          <FileSpreadsheet size={16} /> Export Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="h-[400px] overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10 bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">Student</th>
                <th className="px-3 py-2 text-left">Course</th>
                <th className="px-3 py-2 text-left">Interview Type</th>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Score</th>
                <th className="px-3 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={6} className="px-3 py-2 text-center">
                    Fetching interview results...
                  </td>
                </tr>
              )}
              {interviews.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={6} className="px-3 py-2 text-center">
                    No interview results found.
                  </td>
                </tr>
              )}
              {interviews.map((result) => (
                <tr key={result._id} className="border-b">
                  <td className="px-3 py-2 text-left">{result.studentFullName}</td>
                  <td className="px-3 py-2 text-left">{getProgramAcronym(result.program)}</td>
                  <td className="px-3 py-2 text-left">{result.interviewType}</td>
                  <td className="px-3 py-2 text-left">{handleDateFormat(result.createdAt)}</td>
                  <td className="px-3 py-2 text-left">{result.totalScore}</td>
                  <td className="px-3 py-2 text-left">
                    <button
                      className="flex items-center gap-1 rounded bg-gray-200 px-2 py-1 hover:bg-gray-300"
                      onClick={() => setSelectedResult(result)}
                    >
                      <Eye size={16} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedResult?._id && (
        <ResultSummaryModal
          onClose={() => setSelectedResult(null)}
          interviewId={selectedResult._id}
        />
      )}
    </div>
  );
}
