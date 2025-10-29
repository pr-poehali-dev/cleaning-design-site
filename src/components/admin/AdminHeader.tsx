import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { User } from './types';
import { useNavigate } from 'react-router-dom';

interface AdminHeaderProps {
  user: User;
  onLogout: () => void;
}

const AdminHeader = ({ user, onLogout }: AdminHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-gray-700 border-b border-gray-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between mb-2 sm:mb-0">
          <h1 className="font-heading text-base sm:text-2xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent flex-1 min-w-0 truncate">
            Панель администратора
          </h1>
          <Button
            variant="ghost"
            onClick={onLogout}
            className="text-white hover:text-yellow-400 sm:hidden ml-2"
            size="sm"
          >
            <Icon name="LogOut" size={18} />
          </Button>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs sm:text-base text-gray-300 truncate flex-shrink min-w-0">Привет, {user.full_name}</span>
          <div className="flex flex-wrap items-center gap-1 sm:gap-4 flex-shrink-0">
            <Button
              onClick={() => navigate('/admin/salary-stats')}
              className="bg-green-500 hover:bg-green-600 h-8 sm:h-10 text-xs sm:text-base px-2 sm:px-4"
              size="sm"
            >
              <Icon name="BarChart3" size={16} />
              <span className="hidden md:inline ml-2">Статистика зарплат</span>
            </Button>
            <Button
              onClick={() => navigate('/admin/payments')}
              className="bg-yellow-500 hover:bg-yellow-600 text-black h-8 sm:h-10 text-xs sm:text-base px-2 sm:px-4"
              size="sm"
            >
              <Icon name="Wallet" size={16} />
              <span className="hidden md:inline ml-2">Управление выплатами</span>
            </Button>
            <Button
              variant="ghost"
              onClick={onLogout}
              className="text-white hover:text-yellow-400 hidden sm:flex"
            >
              <Icon name="LogOut" size={20} />
              <span className="ml-2">Выход</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;