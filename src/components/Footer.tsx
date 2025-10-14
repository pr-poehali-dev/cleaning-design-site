import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-300 py-12 px-4 border-t border-primary/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Sparkles" size={28} className="text-primary" />
              <h3 className="font-heading text-2xl font-bold gradient-text">Beauty & Clean</h3>
            </div>
            <p className="text-gray-400">
              Премиум-сервис профессиональной уборки. Превращаем пространство в произведение искусства.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-4 text-white">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors">
                  Услуги
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors">
                  Калькулятор
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors">
                  Запись онлайн
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-4 text-white">Контакты</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={16} className="text-primary" />
                <a href="tel:+74951234567" className="hover:text-primary transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={16} className="text-primary" />
                <a href="mailto:info@beautyandclean.ru" className="hover:text-primary transition-colors">
                  info@beautyandclean.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 Beauty & Clean. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
