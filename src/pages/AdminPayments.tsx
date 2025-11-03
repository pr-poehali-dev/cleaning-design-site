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

interface Payment {
  id: number;
  address: string;
  client_name: string;
  scheduled_date: string;
  maid_name: string;
  maid_role: string;
  salary: number;
  verified_at: string | null;
  inspection_completed_at: string | null;
  paid: boolean;
  service_type: string;
  area: number;
  senior_cleaner_name: string | null;
  senior_cleaner_salary: number;
}

const AdminPayments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('unpaid');
  const [loading, setLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

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
      loadPayments('unpaid');
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  const loadPayments = async (filterValue: string, fromDate?: string, toDate?: string) => {
    setLoading(true);
    try {
      let url = 'https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=payments';
      if (filterValue === 'paid') {
        url += '&paid=true';
      } else if (filterValue === 'unpaid') {
        url += '&paid=false';
      }
      
      if (fromDate) {
        url += `&date_from=${fromDate}`;
      }
      if (toDate) {
        url += `&date_to=${toDate}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setPayments(data.payments);
      }
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось загрузить выплаты', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsPaid = async (assignmentId: number) => {
    try {
      const response = await fetch('https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=mark-paid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignment_id: assignmentId })
      });

      if (response.ok) {
        toast({ 
          title: 'Успех', 
          description: 'Выплата отмечена' 
        });
        loadPayments(filter);
      }
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось отметить выплату', 
        variant: 'destructive' 
      });
    }
  };

  const deletePayment = async (assignmentId: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту запись оплаты?')) return;

    try {
      const response = await fetch(`https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=payments&id=${assignmentId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({ 
          title: 'Удалено', 
          description: 'Запись оплаты удалена' 
        });
        loadPayments(filter);
      }
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось удалить запись', 
        variant: 'destructive' 
      });
    }
  };

  const handleFilterChange = (newFilter: 'all' | 'paid' | 'unpaid') => {
    setFilter(newFilter);
    loadPayments(newFilter, dateFrom, dateTo);
  };

  const handleDateFilter = () => {
    loadPayments(filter, dateFrom, dateTo);
  };

  const handleClearDateFilter = () => {
    setDateFrom('');
    setDateTo('');
    loadPayments(filter, '', '');
  };

  const serviceTypeNames: Record<string, string> = {
    basic: 'Базовая',
    deep: 'Генеральная',
    after: 'После ремонта',
    office: 'Офисная',
  };

  if (!user) return null;

  const totalAmount = payments.reduce((sum, p) => {
    const maidSalary = p.salary || 0;
    const seniorSalary = p.senior_cleaner_salary || 0;
    return sum + maidSalary + seniorSalary;
  }, 0);

  const unpaidCount = payments.filter(p => !p.paid).length;

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
                <h1 className="text-2xl font-bold text-yellow-400">Управление выплатами</h1>
                <p className="text-gray-400">Отслеживание и учёт зарплат</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 border-2 border-red-500 rounded-lg p-6">
            <Icon name="AlertCircle" size={32} className="text-red-400 mb-2" />
            <div className="text-3xl font-bold text-white">{unpaidCount}</div>
            <div className="text-sm text-gray-300">Ожидают выплаты</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500 rounded-lg p-6">
            <Icon name="DollarSign" size={32} className="text-yellow-400 mb-2" />
            <div className="text-3xl font-bold text-white">{totalAmount.toLocaleString('ru-RU')} ₽</div>
            <div className="text-sm text-gray-300">Сумма по фильтру</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500 rounded-lg p-6">
            <Icon name="Users" size={32} className="text-green-400 mb-2" />
            <div className="text-3xl font-bold text-white">{payments.length}</div>
            <div className="text-sm text-gray-300">Записей по фильтру</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-xl font-bold text-yellow-400">История выплат</h2>
              
              <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => handleFilterChange('unpaid')}
                variant={filter === 'unpaid' ? 'default' : 'outline'}
                size="sm"
                className={filter === 'unpaid' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                <Icon name="Clock" size={16} className="mr-2" />
                Не выплачено
              </Button>
              <Button
                onClick={() => handleFilterChange('paid')}
                variant={filter === 'paid' ? 'default' : 'outline'}
                size="sm"
                className={filter === 'paid' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                <Icon name="CheckCircle" size={16} className="mr-2" />
                Выплачено
              </Button>
              <Button
                onClick={() => handleFilterChange('all')}
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
              >
                <Icon name="List" size={16} className="mr-2" />
                Все
              </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-gray-400 mb-1">Дата от</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-gray-400 mb-1">Дата до</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleDateFilter}
                  className="bg-yellow-600 hover:bg-yellow-700"
                  size="sm"
                >
                  <Icon name="Filter" size={16} className="mr-1" />
                  Применить
                </Button>
                {(dateFrom || dateTo) && (
                  <Button
                    onClick={handleClearDateFilter}
                    variant="outline"
                    size="sm"
                  >
                    <Icon name="X" size={16} className="mr-1" />
                    Сбросить
                  </Button>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">
              <Icon name="Loader" size={48} className="mx-auto mb-4 opacity-50 animate-spin" />
              <p>Загрузка...</p>
            </div>
          ) : payments.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Icon name="Wallet" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Нет записей по выбранному фильтру</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Дата</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Адрес</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Сотрудник</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Тип уборки</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">Сумма</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Статус</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {payments.map((payment) => {
                    const displayDate = payment.verified_at || payment.inspection_completed_at;
                    const totalSalary = (payment.salary || 0) + (payment.senior_cleaner_salary || 0);
                    
                    return (
                      <tr key={payment.id} className="hover:bg-gray-750 transition-colors">
                        <td className="px-4 py-3 text-sm text-white">
                          {displayDate ? new Date(displayDate).toLocaleDateString('ru-RU') : '—'}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="text-white font-medium">{payment.address}</div>
                          <div className="text-gray-400 text-xs">{payment.client_name}</div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="text-white">{payment.maid_name}</span>
                              <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400">
                                {payment.salary?.toLocaleString('ru-RU')} ₽
                              </span>
                            </div>
                            {payment.senior_cleaner_name && (
                              <div className="flex items-center gap-2">
                                <span className="text-gray-300 text-xs">{payment.senior_cleaner_name}</span>
                                <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">
                                  {payment.senior_cleaner_salary?.toLocaleString('ru-RU')} ₽
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="text-gray-300">{serviceTypeNames[payment.service_type]}</div>
                          <div className="text-gray-500 text-xs">{payment.area} м²</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <span className="text-green-400 font-bold">{totalSalary.toLocaleString('ru-RU')} ₽</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {payment.paid ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                              <Icon name="CheckCircle" size={14} className="mr-1" />
                              Выплачено
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                              <Icon name="Clock" size={14} className="mr-1" />
                              Ожидает
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {!payment.paid && (
                              <Button
                                onClick={() => markAsPaid(payment.id)}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Icon name="CheckCircle" size={16} className="mr-1" />
                                Выплачено
                              </Button>
                            )}
                            <Button
                              onClick={() => deletePayment(payment.id)}
                              size="sm"
                              variant="destructive"
                              className="bg-red-600 hover:bg-red-700 hover:scale-110 transition-all shadow-md hover:shadow-red-500/50"
                              title="Удалить запись о выплате"
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPayments;