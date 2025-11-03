import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Address, Maid, serviceTypeNames, statusNames } from './types';

interface AddressCardProps {
  address: Address;
  maids: Maid[];
  showAssignForm: boolean;
  onAssign: (maidId: number, salary: number, seniorCleanerId?: number, seniorCleanerSalary?: number) => void;
  onShowAssignForm: () => void;
  onCancelAssign: () => void;
  onVerify: (addressId: number) => void;
  onEdit: (address: Address) => void;
  onDelete: (addressId: number) => void;
  onReassign: (addressId: number) => void;
  onCancel: (addressId: number) => void;
}

const AddressCard = ({ address, maids, showAssignForm, onAssign, onShowAssignForm, onCancelAssign, onVerify, onEdit, onDelete, onReassign, onCancel }: AddressCardProps) => {
  const [showPhotos, setShowPhotos] = useState(false);
  const [selectedMaidId, setSelectedMaidId] = useState<string>('');
  const [selectedSeniorCleanerId, setSelectedSeniorCleanerId] = useState<string>('');
  const [salary, setSalary] = useState<number>(address.salary || 5000);
  const [seniorCleanerSalary, setSeniorCleanerSalary] = useState<number>(address.senior_cleaner_salary || 2000);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const regularMaids = maids.filter(m => m.role === 'maid');
  const seniorCleaners = maids.filter(m => m.role === 'senior_cleaner');

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-yellow-400">{address.address}</h3>
          <p className="text-gray-400">Клиент: {address.client_name} • {address.client_phone}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded text-sm ${
            address.status === 'verified' ? 'bg-purple-500/20 text-purple-400' :
            address.status === 'completed' ? 'bg-yellow-500/20 text-yellow-400' :
            address.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
            address.status === 'assigned' ? 'bg-orange-500/20 text-orange-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {statusNames[address.status]}
          </span>
          <div className="flex gap-1">
            {!address.verified_at && (
              <Button
                onClick={() => onEdit(address)}
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300"
              >
                <Icon name="Edit" size={16} />
              </Button>
            )}
            <Button
              onClick={() => setShowDeleteConfirm(true)}
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300"
            >
              <Icon name="Trash2" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded">
          <p className="text-red-400 mb-3">Удалить этот адрес? Это действие нельзя отменить.</p>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                onDelete(address.id);
                setShowDeleteConfirm(false);
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Да, удалить
            </Button>
            <Button
              onClick={() => setShowDeleteConfirm(false)}
              variant="ghost"
            >
              Отмена
            </Button>
          </div>
        </div>
      )}
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

      {address.assigned_maid_name && (
        <div className="mb-4 space-y-2">
          <div className="p-3 bg-gray-700 rounded">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-gray-400 text-sm">Назначена горничная:</span>
                <p className="text-white font-semibold">{address.assigned_maid_name}</p>
                {address.salary && <p className="text-yellow-400 text-sm mt-1">Зарплата: {address.salary} ₽</p>}
              </div>
              {!address.verified_at && (
                <Button
                  onClick={() => onReassign(address.id)}
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Icon name="UserCog" size={16} className="mr-1" />
                  Изменить
                </Button>
              )}
            </div>
          </div>
          {address.senior_cleaner_name ? (
            <div className="p-3 bg-gray-700 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-400 text-sm">Старший клинер:</span>
                  <p className="text-white font-semibold">{address.senior_cleaner_name}</p>
                  {address.senior_cleaner_salary && <p className="text-yellow-400 text-sm mt-1">Зарплата: {address.senior_cleaner_salary} ₽</p>}
                </div>
                {!address.verified_at && (
                  <Button
                    onClick={() => onReassign(address.id)}
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Icon name="UserCog" size={16} className="mr-1" />
                    Изменить
                  </Button>
                )}
              </div>
            </div>
          ) : !address.verified_at && (
            <div className="p-3 bg-gray-700/50 rounded border border-dashed border-gray-600">
              <Button
                onClick={() => onShowAssignForm()}
                variant="ghost"
                size="sm"
                className="text-yellow-400 hover:text-yellow-300 w-full"
              >
                <Icon name="UserPlus" size={16} className="mr-2" />
                Добавить старшего клинера
              </Button>
            </div>
          )}
        </div>
      )}

      {(address.photo_before || address.photo_after) && (
        <div className="mb-4">
          <Button
            onClick={() => setShowPhotos(!showPhotos)}
            variant="ghost"
            className="text-yellow-400 hover:text-yellow-300"
          >
            <Icon name={showPhotos ? "EyeOff" : "Eye"} size={16} className="mr-2" />
            {showPhotos ? 'Скрыть фото' : 'Показать фото уборки'}
          </Button>
          {showPhotos && (
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {address.photo_before && (
                <div>
                  <p className="text-gray-400 text-sm mb-2">Фото ДО уборки</p>
                  <img 
                    src={address.photo_before} 
                    alt="До уборки" 
                    className="w-full h-64 object-cover rounded-lg border-2 border-gray-600"
                  />
                </div>
              )}
              {address.photo_after && (
                <div>
                  <p className="text-gray-400 text-sm mb-2">Фото ПОСЛЕ уборки</p>
                  <img 
                    src={address.photo_after} 
                    alt="После уборки" 
                    className="w-full h-64 object-cover rounded-lg border-2 border-gray-600"
                  />
                </div>
              )}
            </div>
          )}
          {address.photos_uploaded_at && (
            <p className="text-gray-400 text-xs mt-2">Загружено: {new Date(address.photos_uploaded_at).toLocaleString('ru-RU')}</p>
          )}
        </div>
      )}
      
      {showAssignForm ? (
        <div className="space-y-3">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Горничная</label>
            <Select onValueChange={(value) => setSelectedMaidId(value)}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Выберите горничную" />
              </SelectTrigger>
              <SelectContent>
                {regularMaids.map((maid) => (
                  <SelectItem key={maid.id} value={maid.id.toString()}>
                    {maid.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-white text-sm">Зарплата горничной:</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded w-32"
              min="0"
              step="500"
            />
            <span className="text-gray-400">₽</span>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Старший клинер (опционально)</label>
            <Select onValueChange={(value) => setSelectedSeniorCleanerId(value)}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Выберите старшего клинера" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Без старшего клинера</SelectItem>
                {seniorCleaners.map((cleaner) => (
                  <SelectItem key={cleaner.id} value={cleaner.id.toString()}>
                    {cleaner.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedSeniorCleanerId && selectedSeniorCleanerId !== 'none' && (
            <div className="flex gap-2 items-center">
              <label className="text-white text-sm">Зарплата старшего клинера:</label>
              <input
                type="number"
                value={seniorCleanerSalary}
                onChange={(e) => setSeniorCleanerSalary(Number(e.target.value))}
                className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded w-32"
                min="0"
                step="500"
              />
              <span className="text-gray-400">₽</span>
            </div>
          )}
          <div className="flex gap-2">
            <Button 
              onClick={() => {
                if (selectedMaidId) {
                  const seniorId = selectedSeniorCleanerId && selectedSeniorCleanerId !== 'none' 
                    ? parseInt(selectedSeniorCleanerId) 
                    : undefined;
                  const seniorSalary = seniorId ? seniorCleanerSalary : undefined;
                  onAssign(parseInt(selectedMaidId), salary, seniorId, seniorSalary);
                }
              }}
              disabled={!selectedMaidId}
              className="bg-green-500 hover:bg-green-600"
            >
              Назначить
            </Button>
            <Button onClick={onCancelAssign} variant="ghost">
              Отмена
            </Button>
          </div>
        </div>
      ) : address.status === 'cancelled' ? (
        <div className="p-3 bg-red-500/20 border border-red-500 rounded">
          <p className="text-red-400 text-sm">❌ Задание отменено</p>
        </div>
      ) : address.status === 'completed' && !address.verified_at ? (
        <div className="space-y-2">
          <div className="p-3 bg-yellow-500/20 border border-yellow-500 rounded">
            <p className="text-yellow-400 text-sm">⏳ Ожидает проверки администратором</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => onVerify(address.id)}
              className="bg-green-500 hover:bg-green-600 flex-1"
            >
              <Icon name="CheckCircle" size={16} className="mr-2" />
              Проверено
            </Button>
            <Button
              onClick={() => setShowCancelConfirm(true)}
              className="bg-red-500 hover:bg-red-600"
            >
              <Icon name="XCircle" size={16} className="mr-2" />
              Отменить
            </Button>
          </div>
          {showCancelConfirm && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded">
              <p className="text-red-400 mb-2 text-sm">Отменить это задание?</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    onCancel(address.id);
                    setShowCancelConfirm(false);
                  }}
                  className="bg-red-500 hover:bg-red-600"
                  size="sm"
                >
                  Да, отменить
                </Button>
                <Button
                  onClick={() => setShowCancelConfirm(false)}
                  variant="ghost"
                  size="sm"
                >
                  Нет
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : address.verified_at ? (
        <div className="p-3 bg-green-500/20 border border-green-500 rounded">
          <p className="text-green-400 text-sm">✅ Проверено {new Date(address.verified_at).toLocaleString('ru-RU')}</p>
          {address.salary && <p className="text-white font-semibold mt-1">Начислено: {address.salary} ₽</p>}
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            onClick={onShowAssignForm}
            className="bg-blue-500 hover:bg-blue-600 flex-1"
          >
            <Icon name="UserPlus" size={16} className="mr-2" />
            Назначить горничную
          </Button>
          {(address.status === 'assigned' || address.status === 'in_progress') && (
            <Button
              onClick={() => setShowCancelConfirm(true)}
              className="bg-red-500 hover:bg-red-600"
            >
              <Icon name="XCircle" size={16} className="mr-2" />
              Отменить
            </Button>
          )}
          {showCancelConfirm && (
            <div className="absolute z-10 mt-12 p-3 bg-gray-900 border border-red-500 rounded shadow-lg">
              <p className="text-red-400 mb-2 text-sm">Отменить это задание?</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    onCancel(address.id);
                    setShowCancelConfirm(false);
                  }}
                  className="bg-red-500 hover:bg-red-600"
                  size="sm"
                >
                  Да
                </Button>
                <Button
                  onClick={() => setShowCancelConfirm(false)}
                  variant="ghost"
                  size="sm"
                >
                  Нет
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressCard;