import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface ChecklistItem {
  id: string;
  text: string;
  category: string;
}

const checklistData: ChecklistItem[] = [
  { id: '1', text: 'Протереть пыль с мебели', category: 'Общие зоны' },
  { id: '2', text: 'Пропылесосить полы', category: 'Общие зоны' },
  { id: '3', text: 'Вымыть полы', category: 'Общие зоны' },
  { id: '4', text: 'Протереть зеркала', category: 'Общие зоны' },
  { id: '5', text: 'Протереть дверные ручки', category: 'Общие зоны' },
  { id: '6', text: 'Протереть выключатели', category: 'Общие зоны' },
  
  { id: '7', text: 'Вымыть раковину', category: 'Кухня' },
  { id: '8', text: 'Очистить плиту', category: 'Кухня' },
  { id: '9', text: 'Протереть столешницы', category: 'Кухня' },
  { id: '10', text: 'Вымыть холодильник снаружи', category: 'Кухня' },
  { id: '11', text: 'Очистить микроволновку', category: 'Кухня' },
  { id: '12', text: 'Вынести мусор', category: 'Кухня' },
  
  { id: '13', text: 'Вымыть унитаз', category: 'Ванная' },
  { id: '14', text: 'Очистить раковину', category: 'Ванная' },
  { id: '15', text: 'Вымыть ванну/душевую', category: 'Ванная' },
  { id: '16', text: 'Протереть зеркало', category: 'Ванная' },
  { id: '17', text: 'Вымыть плитку', category: 'Ванная' },
  { id: '18', text: 'Протереть смесители', category: 'Ванная' },
  
  { id: '19', text: 'Протереть подоконники', category: 'Спальня' },
  { id: '20', text: 'Пропылесосить под кроватью', category: 'Спальня' },
  { id: '21', text: 'Протереть пыль со всех поверхностей', category: 'Спальня' },
];

const Checklist = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const categories = Array.from(new Set(checklistData.map(item => item.category)));
  const progress = Math.round((checkedItems.size / checklistData.length) * 100);

  const resetChecklist = () => {
    setCheckedItems(new Set());
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-700 border-b border-gray-600 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white hover:text-yellow-400"
          >
            <Icon name="ArrowLeft" size={20} />
            <span className="ml-2">Назад</span>
          </Button>
          <h1 className="font-heading text-2xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            Чек-лист уборки
          </h1>
          <Button
            variant="ghost"
            onClick={resetChecklist}
            className="text-white hover:text-yellow-400"
          >
            <Icon name="RotateCcw" size={20} />
            <span className="ml-2">Сброс</span>
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-yellow-400/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold">Прогресс выполнения</span>
            <span className="text-2xl font-bold text-yellow-400">{progress}%</span>
          </div>
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 text-sm text-gray-400">
            Выполнено: {checkedItems.size} из {checklistData.length}
          </div>
        </div>

        <div className="space-y-8">
          {categories.map(category => {
            const categoryItems = checklistData.filter(item => item.category === category);
            const categoryChecked = categoryItems.filter(item => checkedItems.has(item.id)).length;
            
            return (
              <div key={category} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-yellow-400">{category}</h2>
                  <span className="text-sm text-gray-400">
                    {categoryChecked}/{categoryItems.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {categoryItems.map(item => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        checkedItems.has(item.id)
                          ? 'bg-yellow-400/10 border border-yellow-400/30'
                          : 'bg-gray-700/50 border border-transparent hover:bg-gray-700'
                      }`}
                    >
                      <Checkbox
                        checked={checkedItems.has(item.id)}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
                      />
                      <span
                        className={`flex-1 ${
                          checkedItems.has(item.id)
                            ? 'line-through text-gray-400'
                            : 'text-white'
                        }`}
                      >
                        {item.text}
                      </span>
                      {checkedItems.has(item.id) && (
                        <Icon name="Check" size={20} className="text-yellow-400" />
                      )}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {progress === 100 && (
          <div className="mt-8 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border-2 border-yellow-400 rounded-lg p-6 text-center animate-bounce-subtle">
            <Icon name="CheckCircle" size={48} className="text-yellow-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">Отличная работа!</h3>
            <p className="text-gray-300">Все задачи выполнены</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checklist;
