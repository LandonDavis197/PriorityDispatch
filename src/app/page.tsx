'use client';

import { useState } from 'react';
import { MemberCard } from '../components/MemberCard';
import { SkeletonCard } from '../components/SkeletonCard';
import { SearchBar } from '../components/SearchBar';
import { useMembersContext } from '../context/MembersContext';

type SortKey = 'first' | 'last';

export default function MembersPage() {
  const { members, isLoading, error, loadMore } = useMembersContext();
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('first');

  const filtered = members.filter((u) =>
    `${u.name.first} ${u.name.last}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) =>
    a.name[sortKey].localeCompare(b.name[sortKey])
  );

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
        <SearchBar value={filter} onChange={setFilter} />
        <div className="flex items-center space-x-2">
          <label htmlFor="sortBy" className="font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sortBy"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-200"
          >
            <option value="first">First Name</option>
            <option value="last">Last Name</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : sorted.map((u) => <MemberCard key={u.login.uuid} user={u} />)}
      </div>

      {!isLoading && !error && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
