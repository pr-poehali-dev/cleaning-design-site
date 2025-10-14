import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  phone: string;
}

interface Assignment {
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
  assigned_at: string;
}

const MaidDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'maid') {
      navigate('/login');
      return;
    }

    setUser(parsedUser);
    loadAssignments(parsedUser.id);
  }, [navigate]);

  const loadAssignments = async (maidId: number) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/9af65dd4-4184-4636-9cc8-b12aa6b82787?action=assignments&maid_id=${maidId}`);
      const data = await response.json();
      if (response.ok) {
        setAssignments(data.assignments);
      }
    } catch (error) {
      console.error('Failed to load assignments:', error);
    }
  };

  const handleUpdateStatus = async (assignmentId: number, status: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/9af65dd4-4184-4636-9cc8-b12aa6b82787?action=update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignment_id: assignmentId, status }),
      });

      if (response.ok) {
        toast({ 
          title: 'Статус обновлен', 
          description: `Статус изменен на "${statusNames[status]}"` 
        });
        if (user) {
          loadAssignments(user.id);
        }
      }
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось обновить статус', 
        variant: 'destructive' 
      });
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
    completed: 'Выполнена',
    cancelled: 'Отменена',
  };

  if (!user) return null;

  const todayAssignments = assignments.filter(a => {
    const today = new Date().toISOString().split('T')[0];
    return a.scheduled_date === today;
  });

  const upcomingAssignments = assignments.filter(a => {
    const today = new Date().toISOString().split('T')[0];
    return a.scheduled_date > today;
  });

  const pastAssignments = assignments.filter(a => {
    const today = new Date().toISOString().split('T')[0];
    return a.scheduled_date < today;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-700 border-b border-gray-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-heading text-2xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            Мои задания
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Привет, {user.full_name}</span>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-white hover:text-yellow-400"
            >
              <Icon name="LogOut" size={20} />
              <span className="ml-2">Выход</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-2 border-blue-500 rounded-lg p-6">
            <Icon name="Calendar" size={32} className="text-blue-400 mb-2" />
            <div className="text-3xl font-bold text-white">{todayAssignments.length}</div>
            <div className="text-sm text-gray-300">Заданий на сегодня</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500 rounded-lg p-6">
            <Icon name="Clock" size={32} className="text-yellow-400 mb-2" />
            <div className="text-3xl font-bold text-white">{upcomingAssignments.length}</div>
            <div className="text-sm text-gray-300">Предстоящих заданий</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500 rounded-lg p-6">
            <Icon name="CheckCircle" size={32} className="text-green-400 mb-2" />
            <div className="text-3xl font-bold text-white">
              {assignments.filter(a => a.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-300">Выполнено всего</div>
          </div>
        </div>

        {todayAssignments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Сегодня</h2>
            <div className="space-y-4">
              {todayAssignments.map((assignment) => (
                <div key={assignment.id} className="bg-gray-800 rounded-lg p-6 border-2 border-yellow-400">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400">{assignment.address}</h3>
                      <p className="text-gray-400">Клиент: {assignment.client_name} • {assignment.client_phone}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm ${
                      assignment.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      assignment.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {statusNames[assignment.status]}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-gray-400 text-sm">Тип уборки</span>
                      <p className="text-white font-semibold">{serviceTypeNames[assignment.service_type]}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Площадь</span>
                      <p className="text-white font-semibold">{assignment.area} м²</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Время</span>
                      <p className="text-white font-semibold">{assignment.scheduled_time}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Оплата</span>
                      <p className="text-white font-semibold">{assignment.price} ₽</p>
                    </div>
                  </div>
                  {assignment.notes && (
                    <div className="mb-4 p-3 bg-gray-700 rounded">
                      <span className="text-gray-400 text-sm">Примечания:</span>
                      <p className="text-white">{assignment.notes}</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    {assignment.status === 'assigned' && (
                      <Button
                        onClick={() => handleUpdateStatus(assignment.id, 'in_progress')}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Icon name="Play" size={16} className="mr-2" />
                        Начать работу
                      </Button>
                    )}
                    {assignment.status === 'in_progress' && (
                      <Button
                        onClick={() => handleUpdateStatus(assignment.id, 'completed')}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Icon name="CheckCircle" size={16} className="mr-2" />
                        Завершить
                      </Button>
                    )}
                    <Button
                      onClick={() => navigate('/checklist')}
                      className="btn-shine bg-transparent text-white hover:bg-transparent"
                    >
                      <Icon name="ClipboardCheck" size={16} className="mr-2" />
                      Чек-лист
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {upcomingAssignments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Предстоящие</h2>
            <div className="space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{assignment.address}</h3>
                      <p className="text-gray-400">Клиент: {assignment.client_name}</p>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {assignment.scheduled_date} в {assignment.scheduled_time}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-gray-400 text-sm">Тип</span>
                      <p className="text-white">{serviceTypeNames[assignment.service_type]}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Площадь</span>
                      <p className="text-white">{assignment.area} м²</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Оплата</span>
                      <p className="text-white">{assignment.price} ₽</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pastAssignments.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-400 mb-4">Выполненные</h2>
            <div className="space-y-4">
              {pastAssignments.slice(0, 5).map((assignment) => (
                <div key={assignment.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white">{assignment.address}</h3>
                      <p className="text-gray-400 text-sm">{assignment.scheduled_date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">{assignment.price} ₽</p>
                      <span className="text-green-400 text-sm">✓ Выполнено</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {assignments.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Inbox" size={64} className="text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">Нет заданий</h3>
            <p className="text-gray-500">Пока что вам не назначено ни одного задания</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MaidDashboard;