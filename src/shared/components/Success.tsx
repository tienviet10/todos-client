export default function Success({ success }: { success: string }): JSX.Element {
  return (
    <div>
      <div
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {success}
      </div>
    </div>
  );
}
