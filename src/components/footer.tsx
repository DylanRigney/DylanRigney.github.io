
export default function Footer() {
  return (
    <footer className="relative z-10 mb-10 pb-10 px-4 text-center text-[#64748b]">
      <small className="mb-2 block text-xs">
        &copy; 2024 Dylan Rigney. All rights reserved.
      </small>
      <p className="text-xs">
        <span className="font-semibold">About this website:</span> built with
        React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS,
        Framer Motion, React Email & Resend, OpenAI Assistants API, Github hosting.
      </p>
    </footer>
  );
}
