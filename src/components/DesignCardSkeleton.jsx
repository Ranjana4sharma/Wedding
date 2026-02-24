export default function DesignCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-gray-100 shadow-md animate-pulse">
      <div className="aspect-[3/4] bg-gray-200" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
