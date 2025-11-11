import { InterviewPreview } from '@/types/admin/report-type';
import { exportInterviewsToExcel } from '@/utils/excel';
import { useState } from 'react';

export default function useExcel() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (interviews: InterviewPreview[]) => {
    if (interviews.length === 0) {
      alert('No data available to export');
      return;
    }
    try {
      setIsExporting(true);
      await exportInterviewsToExcel(interviews);
    } catch (error) {
      alert('An error occurred while exporting the data.');
    } finally {
      setIsExporting(false);
    }
  };
  return {
    isExporting,
    handleExport,
  };
}
