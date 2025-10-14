import Icon from '@/components/ui/icon';

const ContactSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(77,209,194,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(184,169,255,0.15),transparent_50%)]"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Свяжитесь с нами
          </h2>
          <p className="text-gray-300 text-lg">
            Мы всегда на связи и готовы ответить на ваши вопросы
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group glass-effect p-8 rounded-3xl text-center hover:shadow-glow transition-all duration-300 border-2 border-primary/20 animate-scale-in">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary/30 to-accent/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Icon name="Phone" size={36} className="text-primary" />
              </div>
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3">Телефон</h3>
            <a href="tel:+74951234567" className="text-lg text-gray-300 hover:text-primary transition-colors">
              +7 (495) 123-45-67
            </a>
          </div>

          <div className="group glass-effect p-8 rounded-3xl text-center hover:shadow-glow transition-all duration-300 border-2 border-primary/20 animate-scale-in" style={{ animationDelay: '100ms' }}>
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary/30 to-accent/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Icon name="Mail" size={36} className="text-primary" />
              </div>
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3">Email</h3>
            <a href="mailto:info@beautyandclean.ru" className="text-lg text-gray-300 hover:text-primary transition-colors">
              info@beautyandclean.ru
            </a>
          </div>

          <div className="group glass-effect p-8 rounded-3xl text-center hover:shadow-glow transition-all duration-300 border-2 border-primary/20 animate-scale-in" style={{ animationDelay: '200ms' }}>
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary/30 to-accent/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Icon name="Clock" size={36} className="text-primary" />
              </div>
            </div>
            <h3 className="font-heading text-2xl font-bold mb-3">Режим работы</h3>
            <p className="text-lg text-gray-300">
              Ежедневно<br />с 8:00 до 22:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
