import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Service } from '@/data/servicesData';

interface HeaderProps {
  serviceType: string;
  setServiceType: (value: string) => void;
  area: string;
  setArea: (value: string) => void;
  services: Service[];
  calculatePrice: () => number;
  onInfoClick: () => void;
}

const Header = ({ serviceType, setServiceType, area, setArea, services, calculatePrice, onInfoClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'glass-effect shadow-glow py-3' : 'bg-gradient-to-b from-black/50 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <Icon name="Sparkles" size={36} className="text-primary relative z-10 group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold gradient-text">Beauty & Clean</h1>
              <p className="text-xs text-muted-foreground">Премиум клининг</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-primary transition-colors relative group">
              Услуги
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
            </button>
            <button onClick={() => scrollToSection('calculator')} className="text-sm font-medium hover:text-primary transition-colors relative group">
              Калькулятор
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
            </button>
            <button onClick={() => scrollToSection('booking')} className="text-sm font-medium hover:text-primary transition-colors relative group">
              Запись
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all"></span>
            </button>
            
            <div className="glass-effect px-6 py-3 rounded-2xl space-y-2 shadow-lg hover:shadow-glow transition-all">
              <div className="flex items-center gap-4">
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger className="w-[200px] border-primary/20 bg-white/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={onInfoClick} className="hover:bg-primary/10">
                  <Icon name="Info" size={18} className="text-primary" />
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Maximize2" size={16} className="text-primary" />
                <Slider 
                  value={[parseInt(area)]} 
                  onValueChange={(v) => setArea(v[0].toString())}
                  min={20}
                  max={200}
                  step={10}
                  className="w-[180px]"
                />
                <span className="text-sm font-semibold text-primary min-w-[50px]">{area} м²</span>
              </div>
              <div className="text-center pt-1 border-t border-primary/20">
                <p className="text-xs text-muted-foreground">от</p>
                <p className="text-2xl font-bold gradient-text">{calculatePrice().toLocaleString('ru-RU')} ₽</p>
              </div>
            </div>

            <Button onClick={() => scrollToSection('booking')} className="bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all text-white font-semibold px-6">
              Заказать
            </Button>
          </nav>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 glass-effect rounded-2xl p-4 space-y-4 animate-slide-up">
            <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 hover:text-primary transition-colors">
              Услуги
            </button>
            <button onClick={() => scrollToSection('calculator')} className="block w-full text-left py-2 hover:text-primary transition-colors">
              Калькулятор
            </button>
            <button onClick={() => scrollToSection('booking')} className="block w-full text-left py-2 hover:text-primary transition-colors">
              Запись
            </button>
            <Button onClick={() => scrollToSection('booking')} className="w-full bg-gradient-to-r from-primary to-accent text-white">
              Заказать
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
