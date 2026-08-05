import dynamic from 'next/dynamic';

const PlatformPrototyper = dynamic(() => import('@/components/PlatformPrototyper'), {
  ssr: false,
});

export default function PlatformSandboxPage() {
  return (
    <main style={{ margin: 0, padding: 0, overflow: 'hidden', width: '100vw', height: '100vh' }}>
      <PlatformPrototyper />
    </main>
  );
}
