import Icon from '@/components/ui/icon';

const ValueSection = () => {
  const handleEventClick = () => {
    window.open('https://www.afisha.ru/msk/', '_blank');
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-500/5"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
            Время с семьей — самое ценное
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Пока мы наводим порядок вы можете создавать воспоминания
          </p>

          <button
            onClick={handleEventClick}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 hover:scale-105"
          >
            <Icon name="Calendar" size={24} className="group-hover:scale-110 transition-transform" />
            <span>Куда сходить с семьёй</span>
            <Icon name="ExternalLink" size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">2-3ч</div>
              <div className="text-gray-400 text-sm">среднее время уборки</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-gray-400 text-sm">гарантия качества</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">5★</div>
              <div className="text-gray-400 text-sm">средняя оценка</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;