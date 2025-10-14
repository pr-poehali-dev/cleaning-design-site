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
  completed_at: string;
  verified_at: string;
  salary: number;
  service_type: string;
  area: number;
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
      if (parsedUser.role !== 'maid') {
        navigate('/admin');
        return;
      }
      setUser(parsedUser);
      loadSalaryHistory(parsedUser.id);
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  const loadSalaryHistory = async (maidId: number) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/9af65dd4-4184-4636-9cc8-b12aa6b82787?action=salary-history&maid_id=${maidId}`);
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
    const recordDate = new Date(r.verified_at);
    const now = new Date();
    return recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear();
  });

  const currentMonthTotal = currentMonth.reduce((sum, r) => sum + r.salary, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/maid')}
                variant="ghost"
                className="text-yellow-400 hover:text-yellow-300"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-yellow-400">История зарплаты</h1>
                <p className="text-gray-400">{user.full_name}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500 rounded-lg p-6">
            <Icon name="DollarSign" size={32} className="text-green-400 mb-2" />
            <div className="text-3xl font-bold text-white">{currentMonthTotal.toLocaleString('ru-RU')} ₽</div>
            <div className="text-sm text-gray-300">Заработано в этом месяце</div>
            <div className="text-xs text-gray-400 mt-1">{currentMonth.length} выполненных заданий</div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500 rounded-lg p-6">
            <Icon name="TrendingUp" size={32} className="text-yellow-400 mb-2" />
            <div className="text-3xl font-bold text-white">{totalEarned.toLocaleString('ru-RU')} ₽</div>
            <div className="text-sm text-gray-300">Всего заработано</div>
            <div className="text-xs text-gray-400 mt-1">{salaryRecords.length} выполненных заданий</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-yellow-400">История начислений</h2>
          </div>

          {salaryRecords.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Icon name="Wallet" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Пока нет завершённых заданий</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Дата проверки</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Адрес</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Клиент</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Тип уборки</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Площадь</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Начислено</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {salaryRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-750 transition-colors">
                      <td className="px-4 py-3 text-sm text-white">
                        {new Date(record.verified_at).toLocaleDateString('ru-RU')}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">{record.address}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{record.client_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {serviceTypeNames[record.service_type]}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">{record.area} м²</td>
                      <td className="px-4 py-3 text-sm text-right">
                        <span className="text-green-400 font-bold">{record.salary.toLocaleString('ru-RU')} ₽</span>
                      </td>
                    </tr>
                  ))}
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
