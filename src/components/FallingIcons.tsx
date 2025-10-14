import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface FallingIcon {
  id: number;
  icon: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

const FallingIcons = () => {
  const [icons, setIcons] = useState<FallingIcon[]>([]);

  const cleaningIcons = ['Sparkles', 'Droplet', 'Wind', 'Star', 'Zap', 'Circle'];

  useEffect(() => {
    const generateIcons = () => {
      const newIcons: FallingIcon[] = [];
      for (let i = 0; i < 15; i++) {
        newIcons.push({
          id: i,
          icon: cleaningIcons[Math.floor(Math.random() * cleaningIcons.length)],
          left: Math.random() * 100,
          duration: 8 + Math.random() * 7,
          delay: Math.random() * 5,
          size: 20 + Math.random() * 20,
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
          className="absolute animate-fall opacity-20"
          style={{
            left: `${item.left}%`,
            top: '-50px',
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <Icon 
            name={item.icon as any} 
            size={item.size} 
            className="text-yellow-400"
          />
        </div>
      ))}
    </div>
  );
};

export default FallingIcons;
