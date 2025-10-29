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

interface SalaryRecord {
  id: number;
  address: string;
  client_name: string;
  scheduled_date: string;
  completed_at?: string;
  verified_at?: string;
  inspection_started_at?: string;
  inspection_completed_at?: string;
  salary: number;
  service_type: string;
  area: number;
  paid: boolean;
}

const SalaryHistory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [salaryRecords, setSalaryRecords] = useState<SalaryRecord[]>([]);
  const [totalEarned, setTotalEarned] = useState<number>(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== 'maid' && parsedUser.role !== 'senior_cleaner') {
        navigate('/admin');
        return;
      }
      setUser(parsedUser);
      loadSalaryHistory(parsedUser.id, parsedUser.role);
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  const loadSalaryHistory = async (userId: number, role: string) => {
    try {
      let url = '';
      if (role === 'maid') {
        url = `https://functions.poehali.dev/9af65dd4-4184-4636-9cc8-b12aa6b82787?action=salary-history&maid_id=${userId}`;
      } else {
        url = `https://functions.poehali.dev/8e4bbd17-1246-4e91-9377-b1a02010a354?action=salary-history&senior_cleaner_id=${userId}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setSalaryRecords(data.records);
        setTotalEarned(data.total_earned);
      }
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось загрузить историю', 
        variant: 'destructive' 
      });
    }
  };

  const serviceTypeNames: Record<string, string> = {
    basic: 'Базовая',
    deep: 'Генеральная',
    after: 'После ремонта',
    office: 'Офисная',
  };

  if (!user) return null;

  const currentMonth = salaryRecords.filter(r => {
    const dateField = r.verified_at || r.inspection_completed_at;
    if (!dateField) return false;
    const recordDate = new Date(dateField);
    const now = new Date();
    return recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear();
  });

  const currentMonthTotal = currentMonth.reduce((sum, r) => sum + r.salary, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <Button
                onClick={() => navigate(user.role === 'senior_cleaner' ? '/senior-cleaner' : '/maid')}
                variant="ghost"
                className="text-yellow-400 hover:text-yellow-300 flex-shrink-0"
                size="sm"
              >
                <Icon name="ArrowLeft" size={18} className="sm:mr-2" />
                <span className="hidden sm:inline">Назад</span>
              </Button>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-yellow-400 truncate">История зарплаты</h1>
                <p className="text-sm sm:text-base text-gray-400 truncate">{user.full_name}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500 rounded-lg p-4 sm:p-6">
            <Icon name="DollarSign" size={28} className="text-green-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-white">{currentMonthTotal.toLocaleString('ru-RU')} ₽</div>
            <div className="text-xs sm:text-sm text-gray-300">Заработано в этом месяце</div>
            <div className="text-xs text-gray-400 mt-1">{currentMonth.length} выполненных заданий</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500 rounded-lg p-4 sm:p-6">
            <Icon name="TrendingUp" size={28} className="text-yellow-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-white">{totalEarned.toLocaleString('ru-RU')} ₽</div>
            <div className="text-xs sm:text-sm text-gray-300">Всего заработано</div>
            <div className="text-xs text-gray-400 mt-1">{salaryRecords.length} выполненных заданий</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-3 sm:p-4 border-b border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold text-yellow-400">История начислений</h2>
          </div>

          {salaryRecords.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-gray-400">
              <Icon name="Wallet" size={40} className="mx-auto mb-3 sm:mb-4 opacity-50" />
              <p className="text-sm sm:text-base">Пока нет завершённых заданий</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-300">Дата</th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-300">Адрес</th>
                    <th className="hidden md:table-cell px-4 py-3 text-left text-sm font-semibold text-gray-300">Клиент</th>
                    <th className="hidden sm:table-cell px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-300">Тип</th>
                    <th className="hidden lg:table-cell px-4 py-3 text-left text-sm font-semibold text-gray-300">Площадь</th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold text-gray-300">Сумма</th>
                    <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold text-gray-300">Статус</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {salaryRecords.map((record) => {
                    const displayDate = record.verified_at || record.inspection_completed_at;
                    return (
                    <tr key={record.id} className="hover:bg-gray-750 transition-colors">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white">
                        {displayDate ? new Date(displayDate).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }) : '—'}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white max-w-[120px] sm:max-w-none truncate">{record.address}</td>
                      <td className="hidden md:table-cell px-4 py-3 text-sm text-gray-300">{record.client_name}</td>
                      <td className="hidden sm:table-cell px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-300">
                        {serviceTypeNames[record.service_type]}
                      </td>
                      <td className="hidden lg:table-cell px-4 py-3 text-sm text-gray-300">{record.area} м²</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right">
                        <span className="text-green-400 font-bold">{record.salary.toLocaleString('ru-RU')} ₽</span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                        {record.paid ? (
                          <span className="inline-flex items-center px-1.5 sm:px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            <Icon name="CheckCircle" size={12} className="sm:mr-1" />
                            <span className="hidden sm:inline">Выплачено</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-1.5 sm:px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                            <Icon name="Clock" size={12} className="sm:mr-1" />
                            <span className="hidden sm:inline">Ожидает</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SalaryHistory;