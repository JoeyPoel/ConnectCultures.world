import React, { useEffect, useRef } from "react";

/**
 * High-performance procedural film grain overlay canvas.
 * Throttles frame generation and halts when document is hidden to optimize battery and CPU.
 */
export const GrainOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    const patternSize = 96;
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const pCtx = patternCanvas.getContext("2d");
    if (!pCtx) return;

    const imgData = pCtx.createImageData(patternSize, patternSize);
    const buffer = new Uint32Array(imgData.data.buffer);

    let isVisible = true;
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const resize = () => {
      canvas.width = Math.min(window.innerWidth, 1920);
      canvas.height = Math.min(window.innerHeight, 1080);
    };

    let resizeTimer: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };

    window.addEventListener("resize", debouncedResize, { passive: true });
    resize();

    let frameCount = 0;
    const render = () => {
      if (isVisible) {
        frameCount++;
        // Generate grain once every 6 frames (10-12fps texture refresh is ideal for film grain and near-zero CPU)
        if (frameCount % 6 === 0) {
          for (let i = 0; i < buffer.length; i++) {
            const noise = (Math.random() * 255) | 0;
            buffer[i] = (12 << 24) | (noise << 16) | (noise << 8) | noise;
          }
          pCtx.putImageData(imgData, 0, 0);

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const pattern = ctx.createPattern(patternCanvas, "repeat");
          if (pattern) {
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-5 w-full h-full opacity-35 mix-blend-screen will-change-transform"
    />
  );
};

export default GrainOverlay;
