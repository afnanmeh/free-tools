'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

export function MinimalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { colorScheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
      }

      update(canvas: HTMLCanvasElement) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#ffbf00ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    function drawConnections() {
      const strokeColor = colorScheme === 'light' ? '#ffb366' : '#ffffff'; // Light orange for light theme, white for dark
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) { // connect only close particles
            ctx!.globalAlpha = (1 - distance / 180) * 0.5; // subtle line
            ctx!.strokeStyle = strokeColor;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }
      ctx!.globalAlpha = 1; // reset alpha
    }

    function animate() {
      if (!ctx || !canvas) return;
      // Clear canvas completely each frame → no trails
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update(canvas);
        p.draw(ctx);
      });

      drawConnections();
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [colorScheme]); // Re-run animation when theme changes

  const canvasBackground = colorScheme === 'light' 
    ? 'radial-gradient(circle at 20% 30%, rgba(252, 196, 150, 0.18), transparent 55%), radial-gradient(circle at 80% 70%, rgba(255, 160, 200, 0.10), transparent 60%), #ffffff'
    : '#03060c';

  return (
    <canvas
      key={colorScheme}
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        background: canvasBackground,
      }}
    />
  );
}
