import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-3xl font-bold text-[#1e3a8a] mb-4">Page Not Found</h2>
      <p className="text-[#475569] mb-6">Could not find requested resource.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-[#1e3a8a] text-white font-medium hover:bg-[#1e3a8a]/90 transition"
      >
        Return Home
      </Link>
    </div>
  );
}
