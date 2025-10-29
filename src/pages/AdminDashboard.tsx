import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AdminHeader from '@/components/admin/AdminHeader';
import AddressForm from '@/components/admin/AddressForm';
import AddressCard from '@/components/admin/AddressCard';
import StatusFilter from '@/components/admin/StatusFilter';
import MaidForm from '@/components/admin/MaidForm';
import MaidCard from '@/components/admin/MaidCard';
import { User, Address, Maid } from '@/components/admin/types';

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
    role: 'maid',
  });

  const [editingMaid, setEditingMaid] = useState<Maid & { password?: string } | null>(null);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

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
        toast({ title: 'Сотрудник добавлен', description: 'Новый сотрудник успешно добавлен' });
        setShowMaidForm(false);
        setNewMaid({ email: '', password: '', full_name: '', phone: '', role: 'maid' });
        loadMaids();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось добавить горничную', variant: 'destructive' });
    }
  };

  const handleAssignMaid = async (addressId: number, maidId: number, salary: number, seniorCleanerId?: number, seniorCleanerSalary?: number) => {
    try {
      const response = await fetch('https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          address_id: addressId, 
          maid_id: maidId, 
          salary,
          senior_cleaner_id: seniorCleanerId,
          senior_cleaner_salary: seniorCleanerSalary
        }),
      });

      if (response.ok) {
        const seniorMsg = seniorCleanerId ? ` + старший клинер (${seniorCleanerSalary} ₽)` : '';
        toast({ title: 'Назначено', description: `Горничная назначена на адрес. Зарплата: ${salary} ₽${seniorMsg}` });
        setShowAssignForm(null);
        loadAddresses();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось назначить горничную', variant: 'destructive' });
    }
  };

  const handleVerify = async (addressId: number) => {
    try {
      const response = await fetch('https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address_id: addressId, admin_id: user?.id }),
      });

      if (response.ok) {
        toast({ title: 'Проверено', description: 'Зарплаты начислены' });
        loadAddresses();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось подтвердить выполнение', variant: 'destructive' });
    }
  };

  const handleReassign = (addressId: number) => {
    setShowAssignForm(addressId);
  };

  const handleCancelAssignment = async (addressId: number) => {
    try {
      const response = await fetch('https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=cancel-assignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address_id: addressId }),
      });

      if (response.ok) {
        toast({ title: 'Отменено', description: 'Задание отменено' });
        loadAddresses();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось отменить задание', variant: 'destructive' });
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setNewAddress({
      address: address.address,
      client_name: address.client_name,
      client_phone: address.client_phone,
      service_type: address.service_type,
      area: address.area,
      price: address.price,
      scheduled_date: address.scheduled_date,
      scheduled_time: address.scheduled_time,
      notes: address.notes || '',
    });
    setShowAddressForm(true);
  };

  const handleUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAddress) return;

    try {
      const response = await fetch(`https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=addresses&id=${editingAddress.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAddress),
      });

      if (response.ok) {
        toast({ title: 'Обновлено', description: 'Адрес успешно обновлён' });
        setShowAddressForm(false);
        setEditingAddress(null);
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
      toast({ title: 'Ошибка', description: 'Не удалось обновить адрес', variant: 'destructive' });
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/aeb1b34e-b695-4397-aa18-2998082b0b2c?action=addresses&id=${addressId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({ title: 'Удалено', description: 'Адрес успешно удалён' });
        loadAddresses();
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось удалить адрес', variant: 'destructive' });
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

  const filteredAddresses = addresses.filter((address) => {
    if (statusFilter === 'all') return true;
    return address.status === statusFilter;
  });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminHeader user={user} onLogout={handleLogout} />

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

            <StatusFilter
              statusFilter={statusFilter}
              addresses={addresses}
              onFilterChange={setStatusFilter}
            />

            {showAddressForm && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">
                  {editingAddress ? 'Редактировать адрес' : 'Добавить новый адрес'}
                </h3>
                <AddressForm
                  newAddress={newAddress}
                  onAddressChange={setNewAddress}
                  onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress}
                  onCancel={() => {
                    setShowAddressForm(false);
                    setEditingAddress(null);
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
                  }}
                />
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
                <AddressCard
                  key={address.id}
                  address={address}
                  maids={maids}
                  showAssignForm={showAssignForm === address.id}
                  onAssign={(maidId, salary, seniorCleanerId, seniorCleanerSalary) => handleAssignMaid(address.id, maidId, salary, seniorCleanerId, seniorCleanerSalary)}
                  onShowAssignForm={() => setShowAssignForm(address.id)}
                  onCancelAssign={() => setShowAssignForm(null)}
                  onVerify={handleVerify}
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                  onReassign={handleReassign}
                  onCancel={handleCancelAssignment}
                />
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
              <MaidForm
                maid={newMaid}
                onMaidChange={setNewMaid}
                onSubmit={handleAddMaid}
                onCancel={() => setShowMaidForm(false)}
              />
            )}

            {editingMaid && (
              <MaidForm
                maid={editingMaid}
                isEditing
                onMaidChange={setEditingMaid}
                onSubmit={handleUpdateMaid}
                onCancel={() => setEditingMaid(null)}
              />
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {maids.map((maid) => (
                <MaidCard
                  key={maid.id}
                  maid={maid}
                  onEdit={() => setEditingMaid(maid)}
                  onDelete={() => handleDeleteMaid(maid.id)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;