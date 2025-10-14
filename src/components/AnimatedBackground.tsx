import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const crystals: Array<{
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      crystals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.15 + 0.05,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    const drawCrystal = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = Math.cos(angle) * size;
        const py = Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      
      ctx.strokeStyle = `rgba(250, 204, 21, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.fillStyle = `rgba(250, 204, 21, ${opacity * 0.3})`;
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      crystals.forEach((crystal) => {
        crystal.rotation += crystal.rotationSpeed;
        crystal.twinklePhase += crystal.twinkleSpeed;
        
        const twinkle = Math.sin(crystal.twinklePhase) * 0.5 + 0.5;
        const currentOpacity = crystal.opacity * twinkle;
        
        drawCrystal(crystal.x, crystal.y, crystal.size, crystal.rotation, currentOpacity);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        background: '#000',
        zIndex: 1
      }}
    />
  );
};

export default AnimatedBackground;