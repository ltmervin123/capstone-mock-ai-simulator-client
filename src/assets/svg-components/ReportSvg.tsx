import React from 'react';

type ReportSvgProps = {
  isActive?: boolean;
};

const ReportSvg: React.FC<ReportSvgProps> = ({ isActive }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <rect x="3" y="4" width="14" height="12" rx="2" fill={isActive ? '#14AE5C' : '#757575'} />
    <rect x="6" y="7" width="8" height="2" rx="1" fill={isActive ? '#fff' : '#e5e7eb'} />
    <rect x="6" y="11" width="5" height="2" rx="1" fill={isActive ? '#fff' : '#e5e7eb'} />
    <rect x="9" y="2" width="2" height="2" rx="1" fill={isActive ? '#14AE5C' : '#757575'} />
  </svg>
);

export default ReportSvg;
