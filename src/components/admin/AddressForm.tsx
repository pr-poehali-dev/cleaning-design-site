import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface AddressFormProps {
  newAddress: {
    address: string;
    client_name: string;
    client_phone: string;
    service_type: string;
    area: number;
    price: number;
    scheduled_date: string;
    scheduled_time: string;
    notes: string;
  };
  onAddressChange: (address: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const AddressForm = ({ newAddress, onAddressChange, onSubmit, onCancel }: AddressFormProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
      <h3 className="text-xl font-bold mb-4">Новый адрес</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Адрес</Label>
            <Input
              value={newAddress.address}
              onChange={(e) => onAddressChange({ ...newAddress, address: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <Label>Имя клиента</Label>
            <Input
              value={newAddress.client_name}
              onChange={(e) => onAddressChange({ ...newAddress, client_name: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <Label>Телефон клиента</Label>
            <Input
              value={newAddress.client_phone}
              onChange={(e) => onAddressChange({ ...newAddress, client_phone: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <Label>Тип уборки</Label>
            <Select value={newAddress.service_type} onValueChange={(value) => onAddressChange({ ...newAddress, service_type: value })}>
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
              onChange={(e) => onAddressChange({ ...newAddress, area: parseInt(e.target.value) })}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <Label>Цена (₽)</Label>
            <Input
              type="number"
              value={newAddress.price}
              onChange={(e) => onAddressChange({ ...newAddress, price: parseInt(e.target.value) })}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <Label>Дата</Label>
            <Input
              type="date"
              value={newAddress.scheduled_date}
              onChange={(e) => onAddressChange({ ...newAddress, scheduled_date: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <Label>Время</Label>
            <Input
              type="time"
              value={newAddress.scheduled_time}
              onChange={(e) => onAddressChange({ ...newAddress, scheduled_time: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
        </div>
        <div>
          <Label>Примечания</Label>
          <Textarea
            value={newAddress.notes}
            onChange={(e) => onAddressChange({ ...newAddress, notes: e.target.value })}
            className="bg-gray-700 border-gray-600 text-white"
            rows={3}
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="bg-green-500 hover:bg-green-600">
            Сохранить
          </Button>
          <Button type="button" onClick={onCancel} variant="ghost">
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
