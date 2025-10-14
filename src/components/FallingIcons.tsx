import { useEffect, useState } from 'react';

interface FallingIcon {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

const FallingIcons = () => {
  const [icons, setIcons] = useState<FallingIcon[]>([]);

  const cleaningEmojis = ['🧹', '🧽', '🪣', '🧴', '💧', '✨', '🧼', '🪥'];

  useEffect(() => {
    const generateIcons = () => {
      const newIcons: FallingIcon[] = [];
      for (let i = 0; i < 20; i++) {
        newIcons.push({
          id: i,
          emoji: cleaningEmojis[Math.floor(Math.random() * cleaningEmojis.length)],
          left: Math.random() * 100,
          duration: 10 + Math.random() * 10,
          delay: Math.random() * 8,
          size: 30 + Math.random() * 30,
        });
      }
      setIcons(newIcons);
    };

    generateIcons();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map((item) => (
        <div
          key={item.id}
          className="absolute animate-fall"
          style={{
            left: `${item.left}%`,
            top: '-100px',
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            fontSize: `${item.size}px`,
            opacity: 0.3,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
};

export default FallingIcons;
