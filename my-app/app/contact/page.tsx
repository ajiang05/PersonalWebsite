"use client";

import type React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Github, Linkedin } from "lucide-react";

export default function ContactPage() {
  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:aidanjiang3@gmail.com",
      label: "aidanjiang3@gmail.com",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/ajiang05",
      label: "github.com/ajiang05",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/aidan-jiang/",
      label: "linkedin.com/in/aidan-jiang",
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Get In Touch
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
                <CardDescription>
                  Connect with me on various platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent/50 hover:bg-accent/5 transition-colors group"
                    >
                      <Icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{link.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {link.label}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I'm currently available for freelance projects and
                  internships. Feel free to reach out to discuss how we can work
                  together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
