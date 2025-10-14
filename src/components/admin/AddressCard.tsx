import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Address, Maid, serviceTypeNames, statusNames } from './types';

interface AddressCardProps {
  address: Address;
  maids: Maid[];
  showAssignForm: boolean;
  onAssign: (maidId: number) => void;
  onShowAssignForm: () => void;
  onCancelAssign: () => void;
}

const AddressCard = ({ address, maids, showAssignForm, onAssign, onShowAssignForm, onCancelAssign }: AddressCardProps) => {
  const [showPhotos, setShowPhotos] = useState(false);

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
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

      {address.assigned_maid_name && (
        <div className="mb-4 p-3 bg-gray-700 rounded">
          <span className="text-gray-400 text-sm">Назначена горничная:</span>
          <p className="text-white font-semibold">{address.assigned_maid_name}</p>
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
        <div className="flex gap-2 items-center">
          <Select onValueChange={(value) => onAssign(parseInt(value))}>
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
          <Button onClick={onCancelAssign} variant="ghost">
            Отмена
          </Button>
        </div>
      ) : (
        <Button
          onClick={onShowAssignForm}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Icon name="UserPlus" size={16} className="mr-2" />
          Назначить горничную
        </Button>
      )}
    </div>
  );
};

export default AddressCard;