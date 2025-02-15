export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-12 bg-gray-200 rounded-lg mb-2" // Added margin
        />
      ))}
    </div>
  );
}
