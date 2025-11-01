import { ParticleNetwork } from "@/components/particle-network";
import { PageViewCounter } from "@/components/page-view-counter";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ParticleNetwork />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-balance">
              Aidan Jiang
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide">
              Full Stack Developer
            </p>
          </div>

          <div className="flex justify-center pt-8">
            <PageViewCounter />
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed pt-4">
            Crafting elegant solutions to complex problems. Specializing in
            modern web technologies and building scalable applications that make
            a difference.
          </p>
        </div>
      </div>
    </main>
  );
}
