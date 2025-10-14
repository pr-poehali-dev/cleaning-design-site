import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    
    updateCanvasSize();

    const crystals: Array<{
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
      isGold: boolean;
    }> = [];

    for (let i = 0; i < 200; i++) {
      crystals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.4 + 0.2,
        twinkleSpeed: Math.random() * 0.015 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        isGold: i % 2 === 0,
      });
    }

    const drawCrystal = (x: number, y: number, size: number, rotation: number, opacity: number, color: string) => {
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
      
      ctx.strokeStyle = color.replace('COLOR', `${opacity}`);
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      ctx.fillStyle = color.replace('COLOR', `${opacity * 0.3}`);
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      crystals.forEach((crystal) => {
        crystal.rotation += crystal.rotationSpeed;
        crystal.twinklePhase += crystal.twinkleSpeed;
        
        const twinkle = Math.sin(crystal.twinklePhase) * 0.5 + 0.5;
        
        let currentOpacity: number;
        let color: string;
        
        if (crystal.isGold) {
          currentOpacity = crystal.opacity * twinkle;
          color = 'rgba(250, 204, 21, COLOR)';
        } else {
          currentOpacity = crystal.opacity * (1 - twinkle);
          color = 'rgba(255, 255, 255, COLOR)';
        }
        
        drawCrystal(crystal.x, crystal.y, crystal.size, crystal.rotation, currentOpacity, color);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ 
        background: '#000',
        zIndex: 1,
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default AnimatedBackground;