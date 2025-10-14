import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-20 px-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left relative z-10 animate-fade-in">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6 hero-title-gradient leading-tight">
              ГАРАНТИРУЕМ КАЧЕСТВЕННУЮ УБОРКУ
            </h1>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg animate-bounce-subtle">
                  <Icon name="ClipboardCheck" size={28} className="text-black" />
                </div>
                <p className="text-lg md:text-xl text-gray-300 whitespace-nowrap">
                  Проверка на чистоту по чек-листу
                </p>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg animate-bounce-subtle" style={{ animationDelay: '0.2s' }}>
                  <Icon name="ShieldCheck" size={28} className="text-black" />
                </div>
                <p className="text-lg md:text-xl text-gray-300 whitespace-nowrap">
                  Не устроила уборка — Не возьмем деньги
                </p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Записаться на уборку
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
            
            <div className="mt-10 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-400/50 aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-yellow-400/20 rounded-full flex items-center justify-center animate-pulse">
                      <Icon name="Play" size={40} className="text-yellow-400 ml-1" />
                    </div>
                    <p className="text-gray-400 text-sm">Видео о качестве нашей работы</p>
                  </div>
                </div>
                
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-yellow-400 text-xs font-semibold">▶ Процесс уборки</span>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="Sparkles" size={24} className="text-yellow-400" />
                    <p className="text-white font-semibold">Профессиональная уборка за 2 часа</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-yellow-400/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-yellow-400 text-xs font-semibold">До и После</span>
                    </div>
                    <div className="bg-yellow-400/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-yellow-400 text-xs font-semibold">Таймлапс</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-gray-400 text-sm mt-4">
                💡 Загрузите своё видео через редактор, чтобы заменить этот плейсхолдер
              </p>
            </div>
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