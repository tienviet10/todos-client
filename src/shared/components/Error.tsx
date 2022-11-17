export default function Error({ error }: { error: string }) {
  return (
    <div>
      <div
        className="relative bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        role="alert"
      >
        {error}
      </div>
    </div>
  );
}
