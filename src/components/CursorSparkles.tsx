import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

const CursorSparkles = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    let sparkleId = 0;
    const colors = ['#facc15', '#fbbf24', '#fef08a', '#fde047', '#f59e0b', '#fcd34d'];

    const handleMouseMove = (e: MouseEvent) => {
      const newSparkle: Sparkle = {
        id: sparkleId++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 800 + 600,
      };

      setSparkles(prev => [...prev, newSparkle]);

      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
      }, newSparkle.duration);
    };

    const throttledMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.7) {
        handleMouseMove(e);
      }
    };

    window.addEventListener('mousemove', throttledMouseMove);
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute rounded-full animate-sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
            animation: `sparkle ${sparkle.duration}ms ease-out forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default CursorSparkles;