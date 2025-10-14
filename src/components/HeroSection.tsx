import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(77,209,194,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjNGQxZGMyIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 py-32">
        <div className="text-center">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 glass-effect px-6 py-3 rounded-full animate-fade-in">
              <Icon name="Sparkles" size={20} className="text-primary" />
              <span className="text-sm font-medium text-white">Премиум-сервис клининга</span>
            </div>
          </div>
          
          <h1 className="font-heading text-6xl md:text-8xl font-bold mb-8 animate-slide-up text-white">
            Красота в каждой
            <br />
            <span className="gradient-text">детали</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '200ms' }}>
            Превратим ваше пространство в произведение искусства. 
            Профессиональная уборка с гарантией качества и безупречным сервисом
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in" style={{ animationDelay: '400ms' }}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all duration-300 text-white font-semibold text-lg px-10 py-7 rounded-full group"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Заказать уборку
              <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="glass-effect border-primary/30 hover:border-primary text-white font-semibold text-lg px-10 py-7 rounded-full"
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Рассчитать стоимость
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">2000+</div>
              <div className="text-sm text-gray-400">Довольных клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">100%</div>
              <div className="text-sm text-gray-400">Гарантия качества</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-sm text-gray-400">Поддержка клиентов</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={32} className="text-primary" />
      </div>
    </section>
  );
};

export default HeroSection;
