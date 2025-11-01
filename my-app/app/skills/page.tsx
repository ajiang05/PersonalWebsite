import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "HTML/CSS",
      "Swift",
    ],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "REST APIs", "Java", "Flask"],
  },
  {
    title: "Database",
    skills: ["MySQL", "SQL"],
  },
  {
    title: "DevOps & Tools",
    skills: ["Git", "AWS", "Vercel"],
  },
  {
    title: "Other",
    skills: [
      "System Design",
      "API Design",
      "Technical Writing",
      "Team Leadership",
    ],
  },
];

export default function SkillsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Skills & Technologies
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A comprehensive overview of my technical expertise and the tools I
            use to build modern web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-lg border border-border bg-card">
          <h2 className="text-2xl font-semibold mb-4">Always Learning</h2>
          <p className="text-muted-foreground leading-relaxed">
            Technology evolves rapidly, and I'm committed to continuous
            learning. Currently exploring advanced topics in distributed
            systems, cloud architecture, and AI integration. I believe in
            staying current with industry trends while maintaining a strong
            foundation in core computer science principles.
          </p>
        </div>
      </div>
    </main>
  );
}
