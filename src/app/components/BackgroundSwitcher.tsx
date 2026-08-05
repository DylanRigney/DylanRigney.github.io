'use client'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const bgs = {
  1: dynamic(() => import('./backgrounds/RaymarchBg'), { ssr: false }),
  2: dynamic(() => import('./backgrounds/FluidBg'), { ssr: false }),
  3: dynamic(() => import('./backgrounds/AsciiBg'), { ssr: false }),
  4: dynamic(() => import('./backgrounds/IridescentBg'), { ssr: false }),
  5: dynamic(() => import('./backgrounds/ContourBg'), { ssr: false }),
  6: dynamic(() => import('./backgrounds/GlitchBg'), { ssr: false }),
}

const bgNames = [
  { id: 1, name: 'Raymarch' },
  { id: 2, name: 'Fluid' },
  { id: 3, name: 'ASCII' },
  { id: 4, name: 'Iridescent' },
  { id: 5, name: 'Contour' },
  { id: 6, name: 'Glitch' }
];

function Inner() {
  const sp = useSearchParams()
  const n = Number(sp.get('bg') ?? '1')
  const Bg = bgs[n as 1|2|3|4|5|6] ?? bgs[1]
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <Suspense fallback={null}><Bg /></Suspense>
      </div>
      <nav className="fixed top-4 left-4 z-50 flex flex-wrap gap-2 rounded-xl bg-black/50 backdrop-blur px-3 py-2 text-xs text-[#0f172a] max-w-[250px] md:max-w-none md:rounded-full">
        {bgNames.map(bg => (
          <a key={bg.id} href={`/?bg=${bg.id}`}
             className={`px-3 py-1 rounded-full transition whitespace-nowrap ${n===bg.id ? 'bg-white text-black font-bold' : 'text-[#0f172a]/70 hover:text-[#0f172a] bg-black/20 hover:bg-black/40'}`}>
            {bg.name}
          </a>
        ))}
      </nav>
    </>
  )
}

export default function BackgroundSwitcher() {
  return <Suspense fallback={null}><Inner /></Suspense>
}
