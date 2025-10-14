import Icon from '@/components/ui/icon';

const HowWeWorkSection = () => {
  const steps = [
    {
      number: '01',
      icon: 'Phone',
      title: 'Заявка',
      description: 'Оставьте заявку через сайт или позвоните. Консультант уточнит детали и рассчитает стоимость'
    },
    {
      number: '02',
      icon: 'User',
      title: 'Выезд',
      description: 'Клинеры приезжают в удобное время с профессиональным оборудованием и средствами'
    },
    {
      number: '03',
      icon: 'Sparkles',
      title: 'Уборка',
      description: 'Выполняем уборку строго по чек-листу. Не пропускаем ни одной детали'
    },
    {
      number: '04',
      icon: 'ClipboardCheck',
      title: 'Проверка',
      description: 'Вы проверяете качество по чек-листу. Не устроила уборка — не возьмём деньги'
    }
  ];

  return (
    <section className="relative py-32 px-4 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-black to-yellow-500/5"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmFjYzE1IiBzdHJva2Utb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-semibold tracking-wider uppercase">
              Прозрачный процесс
            </span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-white">
            Как мы работаем
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Премиальный сервис с гарантией качества на каждом этапе
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent transform -translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 rounded-3xl p-8 hover:border-yellow-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-400/10 h-full">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-400/50 group-hover:scale-110 transition-transform duration-300 rotate-45">
                    <span className="text-2xl font-bold text-black -rotate-45">{step.number}</span>
                  </div>

                  <div className="mt-8 mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400/10 to-yellow-500/10 rounded-2xl flex items-center justify-center border border-yellow-400/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Icon name={step.icon as any} size={40} className="text-yellow-400" />
                    </div>
                  </div>

                  <h3 className="font-heading text-2xl font-bold mb-4 text-white text-center">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-400 text-center leading-relaxed">
                    {step.description}
                  </p>

                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-400/0 to-yellow-500/0 group-hover:from-yellow-400/5 group-hover:to-yellow-500/5 transition-all duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl blur-xl opacity-30"></div>
            <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl p-10 shadow-2xl">
              <div className="flex items-center gap-6 flex-wrap justify-center">
                <div className="w-16 h-16 bg-black/20 rounded-2xl flex items-center justify-center">
                  <Icon name="Clock" size={36} className="text-black" />
                </div>
                <div className="text-left">
                  <p className="text-black font-bold text-3xl mb-1">Средняя уборка — 2-3 часа</p>
                  <p className="text-black/70 text-lg">Точное время зависит от площади и типа уборки</p>
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
