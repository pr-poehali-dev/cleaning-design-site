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
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Как мы работаем
          </h2>
          <p className="text-xl text-gray-600">
            Простой и понятный процесс от заявки до идеальной чистоты
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-yellow-400">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-black">{step.number}</span>
                </div>

                <div className="mt-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Icon name={step.icon as any} size={32} className="text-yellow-600" />
                  </div>
                </div>

                <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 text-center">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <Icon name="ArrowRight" size={24} className="text-yellow-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Icon name="Clock" size={32} className="text-black" />
              <div className="text-left">
                <p className="text-black font-bold text-2xl">Средняя уборка — 2-3 часа</p>
                <p className="text-black/80">Точное время зависит от площади и типа уборки</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
