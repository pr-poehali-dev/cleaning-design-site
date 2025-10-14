const ValueSection = () => {
  return (
    <section className="relative py-24 px-4 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-black to-yellow-500/5"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
            Время с семьей — самое ценное
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Пока мы наводим порядок вы можете создавать воспоминания
          </p>

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