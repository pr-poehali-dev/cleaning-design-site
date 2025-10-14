import { Button } from '@/components/ui/button';
import { Address } from './types';

interface StatusFilterProps {
  statusFilter: string;
  addresses: Address[];
  onFilterChange: (filter: string) => void;
}

const StatusFilter = ({ statusFilter, addresses, onFilterChange }: StatusFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        onClick={() => onFilterChange('all')}
        size="sm"
        className={statusFilter === 'all' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}
      >
        Все ({addresses.length})
      </Button>
      <Button
        onClick={() => onFilterChange('pending')}
        size="sm"
        className={statusFilter === 'pending' ? 'bg-gray-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}
      >
        Ожидает ({addresses.filter(a => a.status === 'pending').length})
      </Button>
      <Button
        onClick={() => onFilterChange('assigned')}
        size="sm"
        className={statusFilter === 'assigned' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}
      >
        Назначена ({addresses.filter(a => a.status === 'assigned').length})
      </Button>
      <Button
        onClick={() => onFilterChange('in_progress')}
        size="sm"
        className={statusFilter === 'in_progress' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}
      >
        В работе ({addresses.filter(a => a.status === 'in_progress').length})
      </Button>
      <Button
        onClick={() => onFilterChange('completed')}
        size="sm"
        className={statusFilter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}
      >
        Выполнена ({addresses.filter(a => a.status === 'completed').length})
      </Button>
      <Button
        onClick={() => onFilterChange('cancelled')}
        size="sm"
        className={statusFilter === 'cancelled' ? 'bg-red-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}
      >
        Отменена ({addresses.filter(a => a.status === 'cancelled').length})
      </Button>
    </div>
  );
};

export default StatusFilter;
