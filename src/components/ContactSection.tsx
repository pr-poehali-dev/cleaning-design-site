import Icon from '@/components/ui/icon';

const ContactSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="animate-scale-in">
            <div className="bg-yellow-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Phone" size={32} className="text-yellow-400" />
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">Телефон</h3>
            <p className="text-gray-300">+7 (914) 196-51-72</p>
          </div>

          <div className="animate-scale-in" style={{ animationDelay: '100ms' }}>
            <div className="bg-yellow-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Mail" size={32} className="text-yellow-400" />
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-300">info@cleaning.ru</p>
          </div>

          <div className="animate-scale-in" style={{ animationDelay: '200ms' }}>
            <div className="bg-yellow-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Clock" size={32} className="text-yellow-400" />
            </div>
            <h3 className="font-heading text-xl font-semibold mb-2">Режим работы</h3>
            <p className="text-gray-300">Ежедневно с 8:00 до 22:00</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;