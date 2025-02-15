export default function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="p-4 bg-red-50 text-red-700 rounded border border-red-200">
      ⚠️ {message}
    </div>
  );
}
