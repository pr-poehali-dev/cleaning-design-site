import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MaidHeaderProps {
  userName: string;
  onNavigateToSalary: () => void;
  onLogout: () => void;
}

const MaidHeader = ({ userName, onNavigateToSalary, onLogout }: MaidHeaderProps) => {
  return (
    <header className="bg-gray-700 border-b border-gray-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between mb-2 sm:mb-0">
          <h1 className="font-heading text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            Мои задания
          </h1>
          <Button
            variant="ghost"
            onClick={onLogout}
            className="text-white hover:text-yellow-400 sm:hidden"
            size="sm"
          >
            <Icon name="LogOut" size={18} />
          </Button>
        </div>
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <span className="text-sm sm:text-base text-gray-300 truncate">Привет, {userName}</span>
          <div className="flex items-center gap-2">
            <Button
              onClick={onNavigateToSalary}
              className="bg-green-500 hover:bg-green-600 h-9 sm:h-10 text-sm sm:text-base"
              size="sm"
            >
              <Icon name="Wallet" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Зарплата</span>
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

export default MaidHeader;