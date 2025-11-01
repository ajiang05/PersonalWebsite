import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Minimum distance between points visualizer",
    description:
      "Created a visualizer for finding the smallest distance between two points using conquer and divide",
    tags: ["Python", "Matplot"],
    github: "https://github.com/ajiang05/Minimum-Distance-Point-Visualization",
    demo: "https://github.com/ajiang05/Minimum-Distance-Point-Visualization",
  },
  {
    title: "RecipeFind",
    description: "Swift App that finds recipes for you",
    tags: ["Swift"],
    github: "https://github.com/ajiang05/RecipeFind",
    demo: "https://github.com/ajiang05/RecipeFind",
  },
  {
    title: "N/A",
    description: "N/A",
    tags: [""],
    github: "#",
    demo: "#",
  },
  {
    title: "N/A",
    description: "N/A",
    tags: [""],
    github: "#",
    demo: "#",
  },
  {
    title: "N/A",
    description: "N/A",
    tags: [""],
    github: "#",
    demo: "#",
  },
  {
    title: "N/A",
    description: "N/A",
    tags: [""],
    github: "#",
    demo: "#",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Projects
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A collection of projects showcasing my expertise in full-stack
            development, from concept to deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group hover:border-accent/50 transition-colors"
            >
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
