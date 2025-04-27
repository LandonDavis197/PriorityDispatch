export function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow p-4 flex space-x-4">
      <div className="h-16 w-16 bg-gray-200 rounded-full" />
      <div className="flex-1 space-y-3 py-1">
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}
