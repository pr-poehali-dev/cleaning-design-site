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
}

interface MaidStats {
  maid_id: number;
  maid_name: string;
  role: string;
  total_earned: number;
  completed_count: number;
  current_month_earned: number;
  current_month_count: number;
}

const AdminSalaryStats = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<MaidStats[]>([]);
  const [totalPaid, setTotalPaid] = useState<number>(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== 'admin') {
        navigate('/maid');
        return;
      }
      setUser(parsedUser);
      loadStats();
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  const loadStats = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=salary-stats');
      const data = await response.json();
      if (response.ok) {
        setStats(data.stats);
        setTotalPaid(data.total_paid);
      }
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось загрузить статистику', 
        variant: 'destructive' 
      });
    }
  };

  if (!user) return null;

  const currentMonthTotal = stats.reduce((sum, s) => sum + s.current_month_earned, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/admin')}
                variant="ghost"
                className="text-yellow-400 hover:text-yellow-300"
              >
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-yellow-400">Статистика начислений</h1>
                <p className="text-gray-400">Зарплаты горничных</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500 rounded-lg p-6">
            <Icon name="DollarSign" size={32} className="text-yellow-400 mb-2" />
            <div className="text-3xl font-bold text-white">{currentMonthTotal.toLocaleString('ru-RU')} ₽</div>
            <div className="text-sm text-gray-300">Начислено в этом месяце</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500 rounded-lg p-6">
            <Icon name="TrendingUp" size={32} className="text-green-400 mb-2" />
            <div className="text-3xl font-bold text-white">{totalPaid.toLocaleString('ru-RU')} ₽</div>
            <div className="text-sm text-gray-300">Всего выплачено</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-yellow-400">Статистика по горничным</h2>
          </div>

          {stats.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Icon name="Users" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Нет данных о начислениях</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Горничная</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Этот месяц</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Заданий в месяц</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Всего заработано</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Всего заданий</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {stats.map((stat) => (
                    <tr key={stat.maid_id} className="hover:bg-gray-750 transition-colors">
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{stat.maid_name}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            stat.role === 'senior_cleaner' ? 'bg-purple-500/20 text-purple-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {stat.role === 'senior_cleaner' ? 'Ст. клинер' : 'Горничная'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        <span className="text-yellow-400 font-bold">{stat.current_month_earned.toLocaleString('ru-RU')} ₽</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-300">{stat.current_month_count}</td>
                      <td className="px-4 py-3 text-sm text-right">
                        <span className="text-green-400 font-bold">{stat.total_earned.toLocaleString('ru-RU')} ₽</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-300">{stat.completed_count}</td>
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

export default AdminSalaryStats;