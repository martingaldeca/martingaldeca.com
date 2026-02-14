"use client";

import React, { useEffect, useRef } from "react";

const MagneticBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const scaleX =
        canvas.width / (rect.width * (window.devicePixelRatio || 1));
      const scaleY =
        canvas.height / (rect.height * (window.devicePixelRatio || 1));

      mouseX = clientX * scaleX;
      mouseY = clientY * scaleY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gap = 40;
      const length = 20;

      const width = window.innerWidth;
      const height = window.innerHeight;

      const rows = Math.ceil(height / gap);
      const cols = Math.ceil(width / gap);

      ctx.strokeStyle =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--filing-color")
          .trim() || "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap + gap / 2;
          const y = j * gap + gap / 2;

          const dx = mouseX - x;
          const dy = mouseY - y;

          const dist = Math.sqrt(dx * dx + dy * dy);
          let angle = Math.atan2(dy, dx);

          if (dist > 800) {
            angle = 0;
          }

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(-length / 2, 0);
          ctx.lineTo(length / 2, 0);
          ctx.stroke();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default MagneticBackground;
