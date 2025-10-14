const ValueSection = () => {
  return (
    <section className="relative py-24 px-4 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-black to-yellow-500/5"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
            <span className="inline-block">Время с семьей</span>
            {' '}
            <span className="inline-block">— самое ценное</span>
            <span className="inline-block ml-2 w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full align-middle"></span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="inline-block">Пока мы наводим порядок</span>
            <span className="inline-block ml-2 w-8 h-8 md:w-10 md:h-10 bg-yellow-400/80 rounded-full align-middle"></span>
            <span className="inline-block">, вы можете создавать воспоминания</span>
            <span className="inline-block ml-2 w-8 h-8 md:w-10 md:h-10 bg-yellow-400/60 rounded-full align-middle"></span>
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
