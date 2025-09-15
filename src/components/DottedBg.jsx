// src/components/DottedBg.jsx
import React, { useEffect, useRef } from "react";

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function rgbToHex({ r, g, b }) {
  const toHex = (v) => v.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mix(fromHex, toHex, t) {
  const a = hexToRgb(fromHex);
  const b = hexToRgb(toHex);
  const lerp = (x, y, t) => Math.round(x + (y - x) * t);
  return rgbToHex({
    r: lerp(a.r, b.r, t),
    g: lerp(a.g, b.g, t),
    b: lerp(a.b, b.b, t),
  });
}

const clamp01 = (v) => Math.max(0, Math.min(1, v));

/**
 * A full-viewport dotted background that reacts to mouse and theme changes.
 * Props:
 *  - dotSize: px diameter of a dot (device-independent; handles HiDPI)
 *  - spacing: px distance between dot centers
 *  - radius: px hover influence radius
 *  - intensity: 0..1 how far to blend to darkColor at cursor
 *  - ease: 0..1 easing of the cursor (lower = smoother)
 *  - baseColor: hex for resting dots
 *  - darkColor: hex used near mouse
 *  - background: hex page background fill
 */
export default function DottedBg({
  dotSize = 2,
  spacing = 18,
  radius = 300,
  intensity = 1,
  ease = 0.18,
  baseColor = "#b4b7c4",
  darkColor = "#111111",
  background = "#ffffff",
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999, sx: -9999, sy: -9999 }); // x,y actual; sx,sy smoothed
  const propsRef = useRef({
    dotSize,
    spacing,
    radius,
    intensity,
    ease,
    baseColor,
    darkColor,
    background,
  });

  // keep latest props in a ref so RAF loop always sees updates
  useEffect(() => {
    propsRef.current = {
      dotSize,
      spacing,
      radius,
      intensity,
      ease,
      baseColor,
      darkColor,
      background,
    };
  }, [
    dotSize,
    spacing,
    radius,
    intensity,
    ease,
    baseColor,
    darkColor,
    background,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    let w = 0,
      h = 0,
      dpr = 1,
      cols = 0,
      rows = 0;

    function resize() {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { spacing } = propsRef.current;
      cols = Math.ceil(w / spacing);
      rows = Math.ceil(h / spacing);
    }

    function onMove(e) {
      if (e.touches?.[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
      } else {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }
    }
    function onLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      const {
        spacing,
        dotSize,
        radius,
        intensity,
        ease,
        baseColor,
        darkColor,
        background,
      } = propsRef.current;

      // smooth the cursor
      mouseRef.current.sx += (mouseRef.current.x - mouseRef.current.sx) * ease;
      mouseRef.current.sy += (mouseRef.current.y - mouseRef.current.sy) * ease;

      // background fill
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);

      const r2 = radius * radius;
      const rad = dotSize / 2;

      for (let r = 0; r <= rows; r++) {
        const y = r * spacing + spacing * 0.5;
        for (let c = 0; c <= cols; c++) {
          const x = c * spacing + spacing * 0.5;

          const dx = x - mouseRef.current.sx;
          const dy = y - mouseRef.current.sy;
          const d2 = dx * dx + dy * dy;

          // 0..1 influence based on distance (quadratic falloff inside radius)
          let t = 0;
          if (d2 < r2) {
            const d = Math.sqrt(d2);
            const k = 1 - d / radius; // 1 at cursor, 0 at edge
            t = clamp01(k * k * intensity); // soften with square
          }

          ctx.fillStyle = mix(baseColor, darkColor, t);
          ctx.beginPath();
          ctx.arc(x, y, rad, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
