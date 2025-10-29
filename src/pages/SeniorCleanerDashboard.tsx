import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  phone: string;
}

interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  checked: boolean;
}

interface Inspection {
  id: number;
  address: string;
  client_name: string;
  client_phone: string;
  service_type: string;
  area: number;
  price: number;
  scheduled_date: string;
  scheduled_time: string;
  status: string;
  notes?: string;
  photo_before?: string;
  photo_after?: string;
  photos_uploaded_at?: string;
  senior_cleaner_salary?: number;
  inspection_checklist_data?: ChecklistItem[];
  inspection_started_at?: string;
  inspection_completed_at?: string;
  maid_name?: string;
}

const SeniorCleanerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [inspections, setInspections] = useState<Inspection[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'senior_cleaner') {
      navigate('/login');
      return;
    }

    setUser(parsedUser);
    loadInspections(parsedUser.id);
  }, [navigate]);

  const loadInspections = async (seniorCleanerId: number) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/8e4bbd17-1246-4e91-9377-b1a02010a354?action=inspections&senior_cleaner_id=${seniorCleanerId}`);
      const data = await response.json();
      if (response.ok) {
        setInspections(data.inspections);
      }
    } catch (error) {
      console.error('Failed to load inspections:', error);
    }
  };

  const handleStartInspection = async (assignmentId: number) => {
    try {
      const response = await fetch('https://functions.poehali.dev/8e4bbd17-1246-4e91-9377-b1a02010a354?action=start-inspection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignment_id: assignmentId }),
      });

      if (response.ok) {
        toast({ title: 'Проверка начата', description: 'Чек-лист проверки создан' });
        if (user) {
          loadInspections(user.id);
        }
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось начать проверку', variant: 'destructive' });
    }
  };

  const handleUpdateChecklist = async (assignmentId: number, checklist: ChecklistItem[]) => {
    try {
      await fetch('https://functions.poehali.dev/8e4bbd17-1246-4e91-9377-b1a02010a354?action=update-inspection-checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignment_id: assignmentId,
          checklist_data: checklist,
        }),
      });
      if (user) {
        loadInspections(user.id);
      }
    } catch (error) {
      console.error('Failed to update checklist:', error);
    }
  };

  const handleCompleteInspection = async (assignmentId: number) => {
    console.log('Completing inspection:', assignmentId);
    try {
      const response = await fetch('https://functions.poehali.dev/8e4bbd17-1246-4e91-9377-b1a02010a354?action=complete-inspection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignment_id: assignmentId }),
      });

      const data = await response.json();
      console.log('Complete inspection response:', response.status, data);

      if (response.ok) {
        toast({ title: 'Проверка завершена', description: 'Адрес помечен как проверенный' });
        if (user) {
          loadInspections(user.id);
        }
      } else {
        toast({ title: 'Ошибка', description: data.error || 'Не удалось завершить проверку', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Error completing inspection:', error);
      toast({ title: 'Ошибка', description: 'Не удалось завершить проверку', variant: 'destructive' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const serviceTypeNames: Record<string, string> = {
    basic: 'Базовая',
    deep: 'Генеральная',
    after: 'После ремонта',
    office: 'Офисная',
  };

  const statusNames: Record<string, string> = {
    pending: 'Ожидает',
    assigned: 'Назначена',
    in_progress: 'В работе',
    completed: 'На проверке',
    verified: 'Проверена',
    cancelled: 'Отменена',
  };

  if (!user) return null;

  const pendingInspections = inspections.filter(i => i.status === 'completed' && !i.inspection_completed_at);
  const completedInspections = inspections.filter(i => i.inspection_completed_at);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center mb-2 sm:mb-0">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Старший клинер
              </h1>
              <p className="text-sm sm:text-base text-gray-400 truncate">{user.full_name}</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="text-black hover:text-black sm:hidden" size="sm">
              <Icon name="LogOut" size={16} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => navigate('/salary')} variant="outline" className="text-black hover:text-black h-9 sm:h-10 text-sm sm:text-base" size="sm">
              <Icon name="Wallet" size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">История зарплат</span>
              <span className="sm:hidden ml-1">Зарплата</span>
            </Button>
            <Button onClick={handleLogout} variant="outline" className="text-black hover:text-black hidden sm:flex" size="sm">
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-400/30 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">На проверке</p>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400">{pendingInspections.length}</p>
              </div>
              <Icon name="ClipboardCheck" size={32} className="text-yellow-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Проверено</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-400">{completedInspections.length}</p>
              </div>
              <Icon name="CheckCircle" size={32} className="text-green-400" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/30 rounded-lg p-4 sm:p-6 sm:col-span-2 md:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Всего заданий</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-400">{inspections.length}</p>
              </div>
              <Icon name="Briefcase" size={32} className="text-blue-400" />
            </div>
          </div>
        </div>

        {pendingInspections.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-3 sm:mb-4">Требуют проверки</h2>
            <div className="space-y-3 sm:space-y-4">
              {pendingInspections.map((inspection) => (
                <InspectionCard
                  key={inspection.id}
                  inspection={inspection}
                  serviceTypeNames={serviceTypeNames}
                  statusNames={statusNames}
                  onStartInspection={handleStartInspection}
                  onUpdateChecklist={handleUpdateChecklist}
                  onCompleteInspection={handleCompleteInspection}
                />
              ))}
            </div>
          </div>
        )}

        {completedInspections.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-3 sm:mb-4">Проверенные</h2>
            <div className="space-y-3 sm:space-y-4">
              {completedInspections.map((inspection) => (
                <div key={inspection.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white">{inspection.address}</h3>
                      <p className="text-gray-400 text-sm">{inspection.scheduled_date}</p>
                    </div>
                    <span className="text-green-400 text-sm">✓ Проверено</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

interface InspectionCardProps {
  inspection: Inspection;
  serviceTypeNames: Record<string, string>;
  statusNames: Record<string, string>;
  onStartInspection: (assignmentId: number) => void;
  onUpdateChecklist: (assignmentId: number, checklist: ChecklistItem[]) => void;
  onCompleteInspection: (assignmentId: number) => void;
}

const InspectionCard = ({
  inspection,
  serviceTypeNames,
  statusNames,
  onStartInspection,
  onUpdateChecklist,
  onCompleteInspection,
}: InspectionCardProps) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(inspection.inspection_checklist_data || []);
  const [showChecklist, setShowChecklist] = useState(false);

  useEffect(() => {
    setChecklist(inspection.inspection_checklist_data || []);
  }, [inspection.inspection_checklist_data]);

  const toggleChecklistItem = (itemId: string) => {
    const updatedChecklist = checklist.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setChecklist(updatedChecklist);
    onUpdateChecklist(inspection.id, updatedChecklist);
  };

  const allChecked = checklist.length > 0 && checklist.every(item => item.checked);
  const progress = checklist.length > 0 ? Math.round((checklist.filter(i => i.checked).length / checklist.length) * 100) : 0;
  const categories = Array.from(new Set(checklist.map(item => item.category)));

  console.log('Inspection', inspection.id, '- allChecked:', allChecked, 'checklist length:', checklist.length, 'completed_at:', inspection.inspection_completed_at);

  return (
    <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border-2 border-yellow-400">
      <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-yellow-400 break-words">{inspection.address}</h3>
          <p className="text-sm sm:text-base text-gray-400 break-words">Клиент: {inspection.client_name}</p>
          <p className="text-xs sm:text-sm text-gray-400 truncate">Горничная: {inspection.maid_name}</p>
        </div>
        <span className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm bg-yellow-500/20 text-yellow-400 flex-shrink-0">
          {statusNames[inspection.status]}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div>
          <span className="text-gray-400 text-xs sm:text-sm">Тип уборки</span>
          <p className="text-sm sm:text-base text-white font-semibold">{serviceTypeNames[inspection.service_type]}</p>
        </div>
        <div>
          <span className="text-gray-400 text-xs sm:text-sm">Площадь</span>
          <p className="text-sm sm:text-base text-white font-semibold">{inspection.area} м²</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-gray-400 text-xs sm:text-sm">Дата</span>
          <p className="text-sm sm:text-base text-white font-semibold">{inspection.scheduled_date}</p>
        </div>
      </div>

      {(inspection.photo_before || inspection.photo_after) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
          {inspection.photo_before && (
            <div>
              <p className="text-gray-400 text-xs sm:text-sm mb-2">Фото ДО уборки</p>
              <img src={inspection.photo_before} alt="До уборки" className="w-full h-40 sm:h-48 object-cover rounded-lg" />
            </div>
          )}
          {inspection.photo_after && (
            <div>
              <p className="text-gray-400 text-xs sm:text-sm mb-2">Фото ПОСЛЕ уборки</p>
              <img src={inspection.photo_after} alt="После уборки" className="w-full h-40 sm:h-48 object-cover rounded-lg" />
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {!inspection.inspection_started_at && (
          <Button
            onClick={() => onStartInspection(inspection.id)}
            className="bg-blue-500 hover:bg-blue-600 h-9 sm:h-10 text-sm sm:text-base"
            size="sm"
          >
            <Icon name="Play" size={16} className="mr-1 sm:mr-2" />
            Начать проверку
          </Button>
        )}

        {checklist.length > 0 && !inspection.inspection_completed_at && (
          <Button
            onClick={() => setShowChecklist(!showChecklist)}
            className="bg-yellow-500 hover:bg-yellow-600 h-9 sm:h-10 text-sm sm:text-base"
            size="sm"
          >
            <Icon name="ClipboardCheck" size={16} className="mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{showChecklist ? 'Скрыть чек-лист' : `Чек-лист проверки (${progress}%)`}</span>
            <span className="sm:hidden">{progress}%</span>
          </Button>
        )}

        {allChecked && !inspection.inspection_completed_at && (
          <Button
            onClick={() => onCompleteInspection(inspection.id)}
            className="bg-green-500 hover:bg-green-600 h-9 sm:h-10 text-sm sm:text-base"
            size="sm"
          >
            <Icon name="CheckCircle" size={16} className="mr-1 sm:mr-2" />
            Проверено
          </Button>
        )}
      </div>

      {showChecklist && checklist.length > 0 && (
        <div className="mt-4 sm:mt-6 bg-gray-700 rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-base sm:text-lg font-semibold text-white">Прогресс проверки</span>
            <span className="text-xl sm:text-2xl font-bold text-yellow-400">{progress}%</span>
          </div>
          <div className="w-full h-2 sm:h-3 bg-gray-600 rounded-full overflow-hidden mb-3 sm:mb-4">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
            Проверено: {checklist.filter(i => i.checked).length} из {checklist.length}
          </div>

          <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
            {categories.map(category => {
              const categoryItems = checklist.filter(item => item.category === category);
              const categoryChecked = categoryItems.filter(item => item.checked).length;

              return (
                <div key={category} className="bg-gray-800 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-sm sm:text-base text-yellow-400">{category}</h4>
                    <span className="text-xs sm:text-sm text-gray-400">
                      {categoryChecked}/{categoryItems.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {categoryItems.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2 sm:space-x-3 p-2 rounded hover:bg-gray-700 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleChecklistItem(item.id)}
                          id={`inspection-item-${item.id}`}
                          className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-yellow-400 focus:ring-yellow-400 flex-shrink-0"
                        />
                        <label
                          htmlFor={`inspection-item-${item.id}`}
                          className={`flex-1 cursor-pointer text-xs sm:text-sm ${
                            item.checked ? 'line-through text-gray-500' : 'text-white'
                          }`}
                        >
                          {item.text}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeniorCleanerDashboard;