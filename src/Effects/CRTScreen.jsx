import React, { useRef, useEffect } from 'react';
import './CRTStyle.css'
const CRTScreen = () => {
  const canvasRef = useRef(null);

  const generateSnow = (ctx) => {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const d = ctx.createImageData(w, h);
    const b = new Uint32Array(d.data.buffer);
    const len = b.length;

    for (let i = 0; i < len; i++) {
      b[i] = ((255 * Math.random()) | 0) << 24;
    }

    ctx.putImageData(d, 0, 0);
  };

  const animate = () => {
    const ctx = canvasRef.current.getContext('2d');
    generateSnow(ctx);
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth / 3;
    canvas.height = (window.innerWidth * 0.5625) / 3;

    animate();
  }, []);

  return <canvas className ="crtBody"ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />;
};

export default CRTScreen;
