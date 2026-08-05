import Intro from "@/components/intro";
import SectionDivider from "@/components/section-divider";
import About from "@/components/about";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import { PersonaProvider } from "@/context/PersonaContext";
import KanagawaBg from "./components/backgrounds/KanagawaBg";

export default function Home() {
  return (
    <PersonaProvider personaId="ai">
      <KanagawaBg />
      <main className="flex flex-col items-center px-4 w-full max-w-5xl mx-auto">
        <Intro />
        <SectionDivider />
        <About />
        <Projects />
        <Skills />
        <Experience />
      </main>
    </PersonaProvider>
  );
}
