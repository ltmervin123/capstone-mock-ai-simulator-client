import React from 'react';

type Activity = {
  id: string;
  name: string;
  course: string;
  status: 'accepted' | 'rejected';
  time: string;
};

const activities: Activity[] = [
  { id: '1', name: 'Alvincent F. Sangco', course: 'BSIT', status: 'accepted', time: '1 hour ago' },
  { id: '2', name: 'Lanilyn P. Mongado', course: 'BSIT', status: 'accepted', time: '1 hour ago' },
  { id: '3', name: 'Steve A. Job', course: 'BSBA', status: 'rejected', time: '1 hour ago' },
];

const getInitials = (fullName: string) =>
  fullName
    .split(' ')
    .map((p) => p[0] ?? '')
    .slice(0, 2)
    .join('')
    .toUpperCase();

export default function RecentActivity() {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold text-gray-900">Recent Activity</h3>

      <ul className="divide-y divide-gray-100">
        {activities.map((a) => (
          <li key={a.id} className="flex items-start gap-3 py-3">
            <div
              aria-hidden
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700"
            >
              {getInitials(a.name)}
            </div>

            <div className="flex-1">
              <div className="text-sm text-gray-900">
                <span className="font-medium">{a.name}</span>
                <span className="text-gray-500"> ({a.course}) has been </span>
                <span
                  className={
                    a.status === 'accepted'
                      ? 'font-semibold text-green-600'
                      : 'font-semibold text-red-600'
                  }
                >
                  {a.status}
                </span>
              </div>
              <div className="mt-1 text-xs text-gray-500">{a.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
