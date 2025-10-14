import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-20 px-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left relative z-10 animate-fade-in">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
              ГАРАНТИРУЕМ КАЧЕСТВЕННУЮ УБОРКУ
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Проверка на чистоту по чек-листу. Профессиональные клинеры, качество, безупречность
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Записаться на уборку
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
          </div>

          <div className="relative h-[400px] hidden md:block">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-6 animate-slide-up">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400/50 shadow-2xl animate-float" style={{ animationDelay: '0s' }}>
                <img 
                  src="https://cdn.poehali.dev/projects/59f838a9-7d70-436b-9b50-e9dc6652d8b4/files/e15a62af-b3c2-4379-b826-3768274bd664.jpg" 
                  alt="Клинер" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400/50 shadow-2xl ml-12 animate-float" style={{ animationDelay: '1s' }}>
                <img 
                  src="https://cdn.poehali.dev/projects/59f838a9-7d70-436b-9b50-e9dc6652d8b4/files/e3a65918-6ffc-4753-9f5f-d8046f3deeba.jpg" 
                  alt="Клинер" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400/50 shadow-2xl animate-float" style={{ animationDelay: '2s' }}>
                <img 
                  src="https://cdn.poehali.dev/projects/59f838a9-7d70-436b-9b50-e9dc6652d8b4/files/8436bcc9-0d30-4b6d-8656-a572c32d4108.jpg" 
                  alt="Клинер" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;