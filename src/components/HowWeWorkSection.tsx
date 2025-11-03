import Icon from '@/components/ui/icon';

const HowWeWorkSection = () => {
  const steps = [
    {
      number: '01',
      icon: 'Phone',
      title: 'Заявка',
      description: 'Оставьте заявку и получите расчёт'
    },
    {
      number: '02',
      icon: 'User',
      title: 'Выезд',
      description: 'Приезжаем с оборудованием'
    },
    {
      number: '03',
      icon: 'Sparkles',
      title: 'Уборка',
      description: 'Работаем по чек-листу'
    },
    {
      number: '04',
      icon: 'ClipboardCheck',
      title: 'Проверка',
      description: 'Проверяете качество'
    }
  ];

  return (
    <section className="relative py-10 sm:py-12 md:py-16 px-3 sm:px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-500/5"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-block mb-3">
            <span className="px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-xs font-semibold tracking-wider uppercase">
              Прозрачный процесс
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-white">
            Как мы работаем
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Премиальный сервис с гарантией качества
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent"></div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 hover:border-yellow-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/10">
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 rotate-45">
                    <span className="text-xs sm:text-sm font-bold text-black -rotate-45">{step.number}</span>
                  </div>

                  <div className="mt-3 sm:mt-4 mb-2 sm:mb-3 flex justify-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400/10 to-yellow-500/10 rounded-lg sm:rounded-xl flex items-center justify-center border border-yellow-400/30 group-hover:scale-110 transition-all duration-300">
                      <Icon name={step.icon as any} size={20} className="text-yellow-400 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 text-white text-center">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-400 text-center text-xs sm:text-sm leading-snug">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 text-center">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl blur-lg opacity-20"></div>
            <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black/20 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                  <Icon name="Clock" size={20} className="text-black sm:w-6 sm:h-6" />
                </div>
                <div className="text-left">
                  <p className="text-black font-bold text-base sm:text-lg md:text-xl">Средняя уборка — 2-3 часа</p>
                  <p className="text-black/70 text-xs sm:text-sm">Точное время зависит от площади</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;