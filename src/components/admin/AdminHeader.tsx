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
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
          Панель администратора
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-300">Привет, {user.full_name}</span>
          <Button
            onClick={() => navigate('/admin/salary-stats')}
            className="bg-green-500 hover:bg-green-600"
          >
            <Icon name="BarChart3" size={20} />
            <span className="ml-2">Статистика зарплат</span>
          </Button>
          <Button
            onClick={() => navigate('/admin/payments')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            <Icon name="Wallet" size={20} />
            <span className="ml-2">Управление выплатами</span>
          </Button>
          <Button
            variant="ghost"
            onClick={onLogout}
            className="text-white hover:text-yellow-400"
          >
            <Icon name="LogOut" size={20} />
            <span className="ml-2">Выход</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;