import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-700 text-gray-300 py-8 px-4 border-t border-gray-600">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/login')}
            className="text-gray-300 hover:text-white hover:bg-gray-600"
          >
            <Icon name="LogIn" size={16} className="mr-2" />
            Вход для сотрудников
          </Button>
          <p className="text-sm text-center">&copy; 2024 p9 clean. Все права защищены</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;