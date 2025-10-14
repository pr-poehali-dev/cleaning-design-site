import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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

interface Address {
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
}

interface Maid {
  id: number;
  full_name: string;
  phone: string;
  email?: string;
  completed_count?: number;
  in_progress_count?: number;
  assigned_count?: number;
  total_assignments?: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'addresses' | 'maids'>('addresses');
  
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [maids, setMaids] = useState<Maid[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showMaidForm, setShowMaidForm] = useState(false);
  const [showAssignForm, setShowAssignForm] = useState<number | null>(null);

  const [newAddress, setNewAddress] = useState({
    address: '',
    client_name: '',
    client_phone: '',
    service_type: 'basic',
    area: 50,
    price: 10000,
    scheduled_date: '',
    scheduled_time: '12:00',
    notes: '',
  });

  const [newMaid, setNewMaid] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
  });

  const [editingMaid, setEditingMaid] = useState<Maid & { password?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'admin') {
      navigate('/login');
      return;
    }

    setUser(parsedUser);
    loadAddresses();
    loadMaids();
  }, [navigate]);

  const loadAddresses = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=addresses');
      const data = await response.json();
      if (response.ok) {
        setAddresses(data.addresses);
      }
    } catch (error) {
      console.error('Failed to load addresses:', error);
    }
  };

  const loadMaids = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=maids');
      const data = await response.json();
      if (response.ok) {
        setMaids(data.maids);
      }
    } catch (error) {
      console.error('Failed to load maids:', error);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAddress),
      });

      if (response.ok) {
        toast({ title: 'Адрес добавлен', description: 'Новый адрес успешно добавлен' });
        setShowAddressForm(false);
        setNewAddress({
          address: '',
          client_name: '',
          client_phone: '',
          service_type: 'basic',
          area: 50,
          price: 10000,
          scheduled_date: '',
          scheduled_time: '12:00',
          notes: '',
        });
        loadAddresses();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить адрес', variant: 'destructive' });
    }
  };

  const handleAddMaid = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=maids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMaid),
      });

      if (response.ok) {
        toast({ title: 'Горничная добавлена', description: 'Новый сотрудник успешно добавлен' });
        setShowMaidForm(false);
        setNewMaid({ email: '', password: '', full_name: '', phone: '' });
        loadMaids();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить горничную', variant: 'destructive' });
    }
  };

  const handleAssignMaid = async (addressId: number, maidId: number) => {
    try {
      const response = await fetch('https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address_id: addressId, maid_id: maidId }),
      });

      if (response.ok) {
        toast({ title: 'Назначено', description: 'Горничная назначена на адрес' });
        setShowAssignForm(null);
        loadAddresses();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось назначить горничную', variant: 'destructive' });
    }
  };

  const handleUpdateMaid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMaid) return;

    try {
      const response = await fetch('https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=maids', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMaid),
      });

      if (response.ok) {
        toast({ title: 'Обновлено', description: 'Данные горничной обновлены' });
        setEditingMaid(null);
        loadMaids();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось обновить данные', variant: 'destructive' });
    }
  };

  const handleDeleteMaid = async (maidId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этого сотрудника?')) return;

    try {
      const response = await fetch('https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=maids', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: maidId }),
      });

      if (response.ok) {
        toast({ title: 'Удалено', description: 'Сотрудник удален из системы' });
        loadMaids();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить сотрудника', variant: 'destructive' });
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

  const filteredAddresses = addresses.filter((address) => {
    if (statusFilter === 'all') return true;
    return address.status === statusFilter;
  });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-700 border-b border-gray-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-heading text-2xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            Панель администратора
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
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setActiveTab('addresses')}
            className={activeTab === 'addresses' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white'}
          >
            <Icon name="MapPin" size={20} className="mr-2" />
            Адреса уборок
          </Button>
          <Button
            onClick={() => setActiveTab('maids')}
            className={activeTab === 'maids' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white'}
          >
            <Icon name="Users" size={20} className="mr-2" />
            Горничные
          </Button>
        </div>

        {activeTab === 'addresses' && (
          <div>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-yellow-400">Адреса уборок</h2>
              <Button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black"
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Добавить адрес
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                onClick={() => setStatusFilter('all')}
                size="sm"
                className={statusFilter === 'all' ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}
              >
                Все ({addresses.length})
              </Button>
              <Button
                onClick={() => setStatusFilter('pending')}
                size="sm"
                className={statusFilter === 'pending' ? 'bg-gray-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}
              >
                Ожидает ({addresses.filter(a => a.status === 'pending').length})
              </Button>
              <Button
                onClick={() => setStatusFilter('assigned')}
                size="sm"
                className={statusFilter === 'assigned' ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}
              >
                Назначена ({addresses.filter(a => a.status === 'assigned').length})
              </Button>
              <Button
                onClick={() => setStatusFilter('in_progress')}
                size="sm"
                className={statusFilter === 'in_progress' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}
              >
                В работе ({addresses.filter(a => a.status === 'in_progress').length})
              </Button>
              <Button
                onClick={() => setStatusFilter('completed')}
                size="sm"
                className={statusFilter === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}
              >
                Выполнена ({addresses.filter(a => a.status === 'completed').length})
              </Button>
              <Button
                onClick={() => setStatusFilter('cancelled')}
                size="sm"
                className={statusFilter === 'cancelled' ? 'bg-red-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}
              >
                Отменена ({addresses.filter(a => a.status === 'cancelled').length})
              </Button>
            </div>

            {showAddressForm && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
                <h3 className="text-xl font-bold mb-4">Новый адрес</h3>
                <form onSubmit={handleAddAddress} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Адрес</Label>
                      <Input
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label>Имя клиента</Label>
                      <Input
                        value={newAddress.client_name}
                        onChange={(e) => setNewAddress({ ...newAddress, client_name: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label>Телефон клиента</Label>
                      <Input
                        value={newAddress.client_phone}
                        onChange={(e) => setNewAddress({ ...newAddress, client_phone: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label>Тип уборки</Label>
                      <Select value={newAddress.service_type} onValueChange={(value) => setNewAddress({ ...newAddress, service_type: value })}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Базовая</SelectItem>
                          <SelectItem value="deep">Генеральная</SelectItem>
                          <SelectItem value="after">После ремонта</SelectItem>
                          <SelectItem value="office">Офисная</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Площадь (м²)</Label>
                      <Input
                        type="number"
                        value={newAddress.area}
                        onChange={(e) => setNewAddress({ ...newAddress, area: parseInt(e.target.value) })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label>Цена (₽)</Label>
                      <Input
                        type="number"
                        value={newAddress.price}
                        onChange={(e) => setNewAddress({ ...newAddress, price: parseInt(e.target.value) })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label>Дата</Label>
                      <Input
                        type="date"
                        value={newAddress.scheduled_date}
                        onChange={(e) => setNewAddress({ ...newAddress, scheduled_date: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label>Время</Label>
                      <Input
                        type="time"
                        value={newAddress.scheduled_time}
                        onChange={(e) => setNewAddress({ ...newAddress, scheduled_time: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Примечания</Label>
                    <Textarea
                      value={newAddress.notes}
                      onChange={(e) => setNewAddress({ ...newAddress, notes: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-green-500 hover:bg-green-600">
                      Сохранить
                    </Button>
                    <Button type="button" onClick={() => setShowAddressForm(false)} variant="ghost">
                      Отмена
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-4">
              {filteredAddresses.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <Icon name="Search" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Нет адресов с выбранным статусом</p>
                </div>
              )}
              {filteredAddresses.map((address) => (
                <div key={address.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400">{address.address}</h3>
                      <p className="text-gray-400">Клиент: {address.client_name} • {address.client_phone}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm ${
                      address.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      address.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                      address.status === 'assigned' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {statusNames[address.status]}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-gray-400 text-sm">Тип уборки</span>
                      <p className="text-white">{serviceTypeNames[address.service_type]}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Площадь</span>
                      <p className="text-white">{address.area} м²</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Цена</span>
                      <p className="text-white">{address.price} ₽</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Дата и время</span>
                      <p className="text-white">{address.scheduled_date} {address.scheduled_time}</p>
                    </div>
                  </div>
                  {address.notes && (
                    <p className="text-gray-400 text-sm mb-4">Примечания: {address.notes}</p>
                  )}
                  
                  {showAssignForm === address.id ? (
                    <div className="flex gap-2 items-center">
                      <Select onValueChange={(value) => handleAssignMaid(address.id, parseInt(value))}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Выберите горничную" />
                        </SelectTrigger>
                        <SelectContent>
                          {maids.map((maid) => (
                            <SelectItem key={maid.id} value={maid.id.toString()}>
                              {maid.full_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={() => setShowAssignForm(null)} variant="ghost">
                        Отмена
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setShowAssignForm(address.id)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Icon name="UserPlus" size={16} className="mr-2" />
                      Назначить горничную
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'maids' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-yellow-400">Горничные</h2>
              <Button
                onClick={() => setShowMaidForm(!showMaidForm)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black"
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Добавить горничную
              </Button>
            </div>

            {showMaidForm && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
                <h3 className="text-xl font-bold mb-4">Новая горничная</h3>
                <form onSubmit={handleAddMaid} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={newMaid.email}
                        onChange={(e) => setNewMaid({ ...newMaid, email: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label>Пароль</Label>
                      <Input
                        type="password"
                        value={newMaid.password}
                        onChange={(e) => setNewMaid({ ...newMaid, password: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label>ФИО</Label>
                      <Input
                        value={newMaid.full_name}
                        onChange={(e) => setNewMaid({ ...newMaid, full_name: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label>Телефон</Label>
                      <Input
                        value={newMaid.phone}
                        onChange={(e) => setNewMaid({ ...newMaid, phone: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-green-500 hover:bg-green-600">
                      Сохранить
                    </Button>
                    <Button type="button" onClick={() => setShowMaidForm(false)} variant="ghost">
                      Отмена
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {editingMaid && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
                <h3 className="text-xl font-bold mb-4">Редактировать горничную</h3>
                <form onSubmit={handleUpdateMaid} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={editingMaid.email || ''}
                        onChange={(e) => setEditingMaid({ ...editingMaid, email: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label>Новый пароль (оставьте пустым, чтобы не менять)</Label>
                      <Input
                        type="password"
                        value={editingMaid.password || ''}
                        onChange={(e) => setEditingMaid({ ...editingMaid, password: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Оставьте пустым"
                      />
                    </div>
                    <div>
                      <Label>ФИО</Label>
                      <Input
                        value={editingMaid.full_name}
                        onChange={(e) => setEditingMaid({ ...editingMaid, full_name: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label>Телефон</Label>
                      <Input
                        value={editingMaid.phone}
                        onChange={(e) => setEditingMaid({ ...editingMaid, phone: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-green-500 hover:bg-green-600">
                      Сохранить
                    </Button>
                    <Button type="button" onClick={() => setEditingMaid(null)} variant="ghost">
                      Отмена
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {maids.map((maid) => (
                <div key={maid.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Icon name="User" size={24} className="text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{maid.full_name}</h3>
                      <p className="text-gray-400 text-sm">{maid.phone}</p>
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
                      onClick={() => setEditingMaid(maid)}
                      size="sm"
                      className="flex-1 bg-blue-500 hover:bg-blue-600"
                    >
                      <Icon name="Edit" size={16} className="mr-1" />
                      Изменить
                    </Button>
                    <Button
                      onClick={() => handleDeleteMaid(maid.id)}
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                    >
                      <Icon name="Trash2" size={16} className="mr-1" />
                      Удалить
                    </Button>
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

export default AdminDashboard;