import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-700 text-gray-300 py-8 px-4 border-t border-gray-600">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate('/checklist')}
              className="btn-shine bg-transparent text-white hover:bg-transparent font-semibold px-6 py-3 uppercase"
            >
              <Icon name="ClipboardCheck" size={20} />
              <span className="ml-2">Чек-лист уборки</span>
            </Button>
            <Button
              onClick={() => navigate('/inspection')}
              className="btn-shine bg-transparent text-white hover:bg-transparent font-semibold px-6 py-3 uppercase"
            >
              <Icon name="Search" size={20} />
              <span className="ml-2">Чек-лист проверки</span>
            </Button>
          </div>
          <p>&copy; 2024 p9 clean. Все права защищены</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;