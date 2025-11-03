import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden text-white py-12 sm:py-16 md:py-20 px-3 sm:px-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left relative z-10 animate-fade-in">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 hero-title-gradient leading-tight">
              ГАРАНТИРУЕМ КАЧЕСТВЕННУЮ УБОРКУ
            </h1>
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg animate-bounce-subtle shrink-0">
                  <Icon name="ClipboardCheck" size={24} className="text-black sm:w-7 sm:h-7" />
                </div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 text-left">
                  Проверка на чистоту по чек-листу
                </p>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg animate-bounce-subtle shrink-0" style={{ animationDelay: '0.2s' }}>
                  <Icon name="ShieldCheck" size={24} className="text-black sm:w-7 sm:h-7" />
                </div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 text-left">
                  Не устроила уборка — Не возьмем деньги
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center md:justify-start">
              <Button
                onClick={() => navigate('/checklist')}
                className="btn-shine bg-transparent text-white hover:bg-transparent font-semibold px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm uppercase w-full sm:w-auto"
              >
                <Icon name="ClipboardCheck" size={18} className="shrink-0" />
                <span className="ml-2">Чек-лист уборки</span>
              </Button>
              <Button
                onClick={() => navigate('/inspection')}
                className="btn-shine bg-transparent text-white hover:bg-transparent font-semibold px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm uppercase w-full sm:w-auto"
              >
                <Icon name="Search" size={18} className="shrink-0" />
                <span className="ml-2">Чек-лист проверки</span>
              </Button>
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