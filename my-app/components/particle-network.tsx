"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  label: string;
  glow: number;
  glowDirection: number;
}

interface Connection {
  from: number;
  to: number;
  progress: number;
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particleCount = Math.min(
      25,
      Math.floor((canvas.width * canvas.height) / 15000)
    );
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      radius: 1.5,
    }));

    const nodeLabels = [
      "NODE 01",
      "NODE 02",
      "PROC",
      "DATA",
      "SYS",
      "CORE",
      "NET",
      "API",
    ];
    const nodeCount = Math.min(8, Math.max(5, Math.floor(canvas.width / 300)));
    nodesRef.current = Array.from({ length: nodeCount }, (_, i) => ({
      x:
        (canvas.width / (nodeCount + 1)) * (i + 1) +
        (Math.random() - 0.5) * 100,
      y: 100 + Math.random() * (canvas.height - 200),
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      width: 120 + Math.random() * 40,
      height: 80 + Math.random() * 20,
      label: nodeLabels[i % nodeLabels.length],
      glow: Math.random(),
      glowDirection: Math.random() > 0.5 ? 1 : -1,
    }));

    connectionsRef.current = [];
    for (let i = 0; i < nodesRef.current.length - 1; i++) {
      if (Math.random() > 0.4) {
        connectionsRef.current.push({
          from: i,
          to: i + 1,
          progress: Math.random(),
        });
      }
    }
    // Add some random connections
    for (let i = 0; i < 2; i++) {
      const from = Math.floor(Math.random() * nodesRef.current.length);
      const to = Math.floor(Math.random() * nodesRef.current.length);
      if (
        from !== to &&
        !connectionsRef.current.some((c) => c.from === from && c.to === to)
      ) {
        connectionsRef.current.push({
          from,
          to,
          progress: Math.random(),
        });
      }
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const nodes = nodesRef.current;
      const connections = connectionsRef.current;
      const mouse = mouseRef.current;

      particles.forEach((particle, i) => {
        // Mouse interaction - gentle drift
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = 120;

        if (distance < minDistance) {
          const force = (minDistance - distance) / minDistance;
          particle.vx += (dx / distance) * force * 0.03;
          particle.vy += (dy / distance) * force * 0.03;
        }

        // Apply velocity with damping
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Add slight random movement
        particle.vx += (Math.random() - 0.5) * 0.015;
        particle.vy += (Math.random() - 0.5) * 0.015;

        // Limit velocity
        const maxSpeed = 0.8;
        const speed = Math.sqrt(
          particle.vx * particle.vx + particle.vy * particle.vy
        );
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed;
          particle.vy = (particle.vy / speed) * maxSpeed;
        }

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.fill();

        // Draw connections between particles
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 120;

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      connections.forEach((connection) => {
        const fromNode = nodes[connection.from];
        const toNode = nodes[connection.to];

        if (!fromNode || !toNode) return;

        const fromX = fromNode.x + fromNode.width / 2;
        const fromY = fromNode.y + fromNode.height / 2;
        const toX = toNode.x + toNode.width / 2;
        const toY = toNode.y + toNode.height / 2;

        // Check if mouse is near the line
        const mouseDistToLine = pointToLineDistance(
          mouse.x,
          mouse.y,
          fromX,
          fromY,
          toX,
          toY
        );
        const isNearMouse = mouseDistToLine < 30;

        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = isNearMouse
          ? "rgba(100, 200, 255, 0.5)"
          : "rgba(150, 150, 150, 0.3)";
        ctx.lineWidth = isNearMouse ? 2 : 1;
        ctx.stroke();

        // Draw animated data flow dots
        connection.progress += 0.01;
        if (connection.progress > 1) connection.progress = 0;

        for (let i = 0; i < 3; i++) {
          const offset = (connection.progress + i * 0.33) % 1;
          const dotX = fromX + (toX - fromX) * offset;
          const dotY = fromY + (toY - fromY) * offset;

          ctx.beginPath();
          ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(100, 200, 255, 0.8)";
          ctx.fill();
        }
      });

      nodes.forEach((node, i) => {
        // Mouse interaction - subtle shift
        const dx = node.x + node.width / 2 - mouse.x;
        const dy = node.y + node.height / 2 - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = 150;
        const isNearMouse = distance < minDistance;

        if (isNearMouse) {
          const force = (minDistance - distance) / minDistance;
          node.vx += (dx / distance) * force * 0.02;
          node.vy += (dy / distance) * force * 0.02;
        }

        // Apply velocity with damping
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.95;
        node.vy *= 0.95;

        // Add slight random movement
        node.vx += (Math.random() - 0.5) * 0.01;
        node.vy += (Math.random() - 0.5) * 0.01;

        // Keep nodes within bounds
        node.x = Math.max(50, Math.min(canvas.width - node.width - 50, node.x));
        node.y = Math.max(
          50,
          Math.min(canvas.height - node.height - 50, node.y)
        );

        // Update glow animation
        node.glow += node.glowDirection * 0.01;
        if (node.glow > 1 || node.glow < 0) {
          node.glowDirection *= -1;
          node.glow = Math.max(0, Math.min(1, node.glow));
        }

        // Draw node box with glass effect
        const glowIntensity = 0.3 + node.glow * 0.3;
        const highlightIntensity = isNearMouse ? 0.4 : 0.2;

        // Background with blur effect
        ctx.fillStyle = `rgba(20, 20, 30, ${highlightIntensity})`;
        ctx.fillRect(node.x, node.y, node.width, node.height);

        // Border with glow
        ctx.strokeStyle = isNearMouse
          ? `rgba(100, 200, 255, ${glowIntensity + 0.3})`
          : `rgba(200, 200, 200, ${glowIntensity})`;
        ctx.lineWidth = isNearMouse ? 2 : 1;
        ctx.strokeRect(node.x, node.y, node.width, node.height);

        // Subtle inner glow
        if (isNearMouse || node.glow > 0.7) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = "rgba(100, 200, 255, 0.5)";
          ctx.strokeRect(
            node.x + 1,
            node.y + 1,
            node.width - 2,
            node.height - 2
          );
          ctx.shadowBlur = 0;
        }

        // Draw label
        ctx.fillStyle = isNearMouse
          ? "rgba(100, 200, 255, 0.9)"
          : "rgba(200, 200, 200, 0.8)";
        ctx.font = "12px 'Courier New', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          node.label,
          node.x + node.width / 2,
          node.y + node.height / 2 - 8
        );

        // Draw technical data
        ctx.fillStyle = "rgba(150, 150, 150, 0.6)";
        ctx.font = "9px 'Courier New', monospace";
        ctx.fillText(
          `[${String(i).padStart(2, "0")}]`,
          node.x + node.width / 2,
          node.y + node.height / 2 + 8
        );
        ctx.fillText(
          `${Math.floor(node.x)},${Math.floor(node.y)}`,
          node.x + node.width / 2,
          node.y + node.height / 2 + 18
        );
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    function pointToLineDistance(
      px: number,
      py: number,
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): number {
      const A = px - x1;
      const B = py - y1;
      const C = x2 - x1;
      const D = y2 - y1;

      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      let param = -1;

      if (lenSq !== 0) param = dot / lenSq;

      let xx, yy;

      if (param < 0) {
        xx = x1;
        yy = y1;
      } else if (param > 1) {
        xx = x2;
        yy = y2;
      } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
      }

      const dx = px - xx;
      const dy = py - yy;
      return Math.sqrt(dx * dx + dy * dy);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
