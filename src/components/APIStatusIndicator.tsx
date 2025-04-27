'use client';

import { useMembersContext } from '../context/MembersContext';

export function APIStatusIndicator() {
  const { error } = useMembersContext();
  if (!error) return null;
  return (
    <div className="ml-4 flex items-center text-red-600 text-xs">
      <span className="h-2 w-2 bg-red-600 rounded-full animate-pulse mr-1" />
      randomuser.me unavailable
    </div>
  );
}
