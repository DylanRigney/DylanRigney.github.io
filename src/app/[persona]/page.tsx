import Intro from "@/components/intro";
import SectionDivider from "@/components/section-divider";
import About from "@/components/about";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import { PersonaProvider } from "@/context/PersonaContext";
import { personas } from "@/lib/data";
import { notFound } from "next/navigation";
import AIChatCardExperience from "@/components/AIChatCardExperience";
import LayoutShifter from "@/components/LayoutShifter";
import type { Metadata } from "next";

export function generateStaticParams() {
  return Object.keys(personas).map((persona) => ({
    persona,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { persona: string };
}): Metadata {
  const validPersona = personas[params.persona];
  if (!validPersona) return {};

  return {
    title: `Dylan Rigney | ${validPersona.roleTitle}`,
    description: validPersona.heroHighlight,
  };
}

export default function PersonaPage({
  params,
}: {
  params: { persona: string };
}) {
  const validPersona = personas[params.persona];

  if (!validPersona) {
    notFound();
  }

  return (
    <PersonaProvider personaId={params.persona}>
      <LayoutShifter>
        <main className="flex flex-col items-center px-4 w-full max-w-5xl mx-auto">
          <Intro />
          <SectionDivider />
          <About />
          <Projects />
          <Skills />
          <Experience />
        </main>
      </LayoutShifter>
      <AIChatCardExperience />
    </PersonaProvider>
  );
}
