import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface InspectionItem {
  id: string;
  text: string;
  category: string;
}

const inspectionData: InspectionItem[] = [
  { id: '1', text: 'Нет пыли на мебели', category: 'Общие зоны' },
  { id: '2', text: 'Полы чистые, без разводов', category: 'Общие зоны' },
  { id: '3', text: 'Зеркала без разводов и пятен', category: 'Общие зоны' },
  { id: '4', text: 'Дверные ручки чистые', category: 'Общие зоны' },
  { id: '5', text: 'Выключатели чистые', category: 'Общие зоны' },
  { id: '6', text: 'Подоконники без пыли', category: 'Общие зоны' },
  { id: '7', text: 'Плинтусы чистые', category: 'Общие зоны' },
  
  { id: '8', text: 'Раковина блестит', category: 'Кухня' },
  { id: '9', text: 'Плита чистая, без жирных пятен', category: 'Кухня' },
  { id: '10', text: 'Столешницы без крошек и пятен', category: 'Кухня' },
  { id: '11', text: 'Холодильник чистый снаружи', category: 'Кухня' },
  { id: '12', text: 'Микроволновка чистая внутри и снаружи', category: 'Кухня' },
  { id: '13', text: 'Вытяжка чистая', category: 'Кухня' },
  { id: '14', text: 'Мусор вынесен', category: 'Кухня' },
  { id: '15', text: 'Смесители блестят', category: 'Кухня' },
  
  { id: '16', text: 'Унитаз чистый, без налета', category: 'Ванная' },
  { id: '17', text: 'Раковина блестит', category: 'Ванная' },
  { id: '18', text: 'Ванна/душ без налета и мыльных разводов', category: 'Ванная' },
  { id: '19', text: 'Зеркало без разводов', category: 'Ванная' },
  { id: '20', text: 'Плитка чистая, швы без грязи', category: 'Ванная' },
  { id: '21', text: 'Смесители блестят', category: 'Ванная' },
  { id: '22', text: 'Полотенцесушитель чистый', category: 'Ванная' },
  { id: '23', text: 'Пол сухой и чистый', category: 'Ванная' },
  
  { id: '24', text: 'Нет пыли на всех поверхностях', category: 'Спальня' },
  { id: '25', text: 'Под кроватью чисто', category: 'Спальня' },
  { id: '26', text: 'Шкафы снаружи без пыли', category: 'Спальня' },
  { id: '27', text: 'Батареи чистые', category: 'Спальня' },
];

const InspectionChecklist = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [failedItems, setFailedItems] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});

  const togglePassed = (id: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
        setFailedItems(prevFailed => {
          const newFailed = new Set(prevFailed);
          newFailed.delete(id);
          return newFailed;
        });
      }
      return newSet;
    });
  };

  const toggleFailed = (id: string) => {
    setFailedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
        setCheckedItems(prevChecked => {
          const newChecked = new Set(prevChecked);
          newChecked.delete(id);
          return newChecked;
        });
      }
      return newSet;
    });
  };

  const updateNote = (id: string, note: string) => {
    setNotes(prev => ({ ...prev, [id]: note }));
  };

  const categories = Array.from(new Set(inspectionData.map(item => item.category)));
  const passedCount = checkedItems.size;
  const failedCount = failedItems.size;
  const progress = Math.round((passedCount / inspectionData.length) * 100);

  const resetChecklist = () => {
    setCheckedItems(new Set());
    setFailedItems(new Set());
    setNotes({});
  };

  const allPassed = passedCount === inspectionData.length;
  const hasFailed = failedCount > 0;

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
            Чек-лист проверки
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{passedCount}</div>
              <div className="text-sm text-gray-400">Принято</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">{failedCount}</div>
              <div className="text-sm text-gray-400">Не принято</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{progress}%</div>
              <div className="text-sm text-gray-400">Прогресс</div>
            </div>
          </div>
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-8">
          {categories.map(category => {
            const categoryItems = inspectionData.filter(item => item.category === category);
            const categoryPassed = categoryItems.filter(item => checkedItems.has(item.id)).length;
            const categoryFailed = categoryItems.filter(item => failedItems.has(item.id)).length;
            
            return (
              <div key={category} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-yellow-400">{category}</h2>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-400">✓ {categoryPassed}</span>
                    <span className="text-red-400">✗ {categoryFailed}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {categoryItems.map(item => {
                    const isPassed = checkedItems.has(item.id);
                    const isFailed = failedItems.has(item.id);
                    
                    return (
                      <div
                        key={item.id}
                        className={`p-4 rounded-lg border transition-all ${
                          isPassed
                            ? 'bg-green-400/10 border-green-400/30'
                            : isFailed
                            ? 'bg-red-400/10 border-red-400/30'
                            : 'bg-gray-700/50 border-transparent'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={() => togglePassed(item.id)}
                              className={`w-8 h-8 rounded flex items-center justify-center border-2 transition-all ${
                                isPassed
                                  ? 'bg-green-400 border-green-400'
                                  : 'border-gray-500 hover:border-green-400'
                              }`}
                              title="Принято"
                            >
                              {isPassed && <Icon name="Check" size={20} className="text-white" />}
                            </button>
                            <button
                              onClick={() => toggleFailed(item.id)}
                              className={`w-8 h-8 rounded flex items-center justify-center border-2 transition-all ${
                                isFailed
                                  ? 'bg-red-400 border-red-400'
                                  : 'border-gray-500 hover:border-red-400'
                              }`}
                              title="Не принято"
                            >
                              {isFailed && <Icon name="X" size={20} className="text-white" />}
                            </button>
                          </div>
                          <span className="flex-1 text-white">{item.text}</span>
                        </div>
                        {isFailed && (
                          <Textarea
                            placeholder="Укажите причину или замечание..."
                            value={notes[item.id] || ''}
                            onChange={(e) => updateNote(item.id, e.target.value)}
                            className="mt-2 bg-gray-700 border-red-400/30 text-white"
                            rows={2}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {allPassed && (
          <div className="mt-8 bg-gradient-to-r from-green-400/20 to-green-500/20 border-2 border-green-400 rounded-lg p-6 text-center animate-bounce-subtle">
            <Icon name="CheckCircle" size={48} className="text-green-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-green-400 mb-2">Уборка принята!</h3>
            <p className="text-gray-300">Все пункты проверены и одобрены</p>
          </div>
        )}

        {hasFailed && (
          <div className="mt-8 bg-gradient-to-r from-red-400/20 to-red-500/20 border-2 border-red-400 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={32} className="text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-red-400 mb-2">Требуется доработка</h3>
                <p className="text-gray-300 mb-4">Обнаружены недочеты в {failedCount} пунктах. Пожалуйста, устраните замечания.</p>
                <div className="space-y-2">
                  {Array.from(failedItems).map(id => {
                    const item = inspectionData.find(i => i.id === id);
                    return (
                      <div key={id} className="bg-gray-800 p-3 rounded">
                        <div className="font-semibold text-white">{item?.text}</div>
                        {notes[id] && (
                          <div className="text-sm text-gray-400 mt-1">{notes[id]}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InspectionChecklist;
