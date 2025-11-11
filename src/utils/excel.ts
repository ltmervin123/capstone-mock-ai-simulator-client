import ExcelJS from 'exceljs';
import { InterviewPreview } from '@/types/admin/report-type';
import { handleDateFormat } from './handle-dates';
import { getProgramAcronym } from './handle-programs';

export const exportInterviewsToExcel = async (interviews: InterviewPreview[]): Promise<void> => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Interview Results');

  worksheet.columns = [
    { header: 'Student', key: 'student', width: 25 },
    { header: 'Course', key: 'course', width: 15 },
    { header: 'Interview Type', key: 'interviewType', width: 20 },
    { header: 'Date', key: 'date', width: 15 },
    { header: 'Score', key: 'score', width: 10 },
  ];

  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' },
  };

  interviews.forEach((interview) => {
    worksheet.addRow({
      student: interview.studentFullName,
      course: getProgramAcronym(interview.program),
      interviewType: interview.interviewType,
      date: handleDateFormat(interview.createdAt),
      score: interview.totalScore,
    });
  });

  const timestamp = new Date().toISOString().split('T')[0];
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Interview_Results_${timestamp}.xlsx`;
  link.click();
  URL.revokeObjectURL(url);
};
