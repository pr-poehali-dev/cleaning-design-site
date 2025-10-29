import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Maid } from './types';

interface MaidCardProps {
  maid: Maid;
  onEdit: () => void;
  onDelete: () => void;
}

const MaidCard = ({ maid, onEdit, onDelete }: MaidCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
          maid.role === 'senior_cleaner' ? 'bg-purple-400' : 'bg-yellow-400'
        }`}>
          <Icon name={maid.role === 'senior_cleaner' ? 'Crown' : 'User'} size={24} className="text-black" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white">{maid.full_name}</h3>
          <p className="text-gray-400 text-sm">{maid.phone}</p>
          <span className={`text-xs px-2 py-1 rounded ${
            maid.role === 'senior_cleaner' ? 'bg-purple-500/20 text-purple-400' : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {maid.role === 'senior_cleaner' ? 'Старший клинер' : 'Горничная'}
          </span>
        </div>
      </div>
      
      <div className="bg-gray-700/50 rounded-lg p-3 mb-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Всего заданий:</span>
          <span className="text-white font-semibold">{maid.total_assignments || 0}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-green-400">Выполнено:</span>
          <span className="text-green-400 font-semibold">{maid.completed_count || 0}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-blue-400">В работе:</span>
          <span className="text-blue-400 font-semibold">{maid.in_progress_count || 0}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-yellow-400">Назначено:</span>
          <span className="text-yellow-400 font-semibold">{maid.assigned_count || 0}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onEdit}
          size="sm"
          className="flex-1 bg-blue-500 hover:bg-blue-600"
        >
          <Icon name="Edit" size={16} className="mr-1" />
          Изменить
        </Button>
        <Button
          onClick={onDelete}
          size="sm"
          variant="destructive"
          className="flex-1"
        >
          <Icon name="Trash2" size={16} className="mr-1" />
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default MaidCard;