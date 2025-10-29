import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MaidFormProps {
  maid: {
    email: string;
    password?: string;
    full_name: string;
    phone: string;
    role?: string;
  };
  isEditing?: boolean;
  onMaidChange: (maid: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const MaidForm = ({ maid, isEditing = false, onMaidChange, onSubmit, onCancel }: MaidFormProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
      <h3 className="text-xl font-bold mb-4">{isEditing ? 'Редактировать сотрудника' : 'Новый сотрудник'}</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={maid.email}
              onChange={(e) => onMaidChange({ ...maid, email: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <Label>{isEditing ? 'Новый пароль (оставьте пустым, чтобы не менять)' : 'Пароль'}</Label>
            <Input
              type="password"
              value={maid.password || ''}
              onChange={(e) => onMaidChange({ ...maid, password: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder={isEditing ? 'Оставьте пустым' : ''}
              required={!isEditing}
            />
          </div>
          <div>
            <Label>ФИО</Label>
            <Input
              value={maid.full_name}
              onChange={(e) => onMaidChange({ ...maid, full_name: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div>
            <Label>Телефон</Label>
            <Input
              value={maid.phone}
              onChange={(e) => onMaidChange({ ...maid, phone: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          {!isEditing && (
            <div>
              <Label>Роль</Label>
              <Select 
                value={maid.role || 'maid'} 
                onValueChange={(value) => onMaidChange({ ...maid, role: value })}
                required
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maid">Горничная</SelectItem>
                  <SelectItem value="senior_cleaner">Старший клинер</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" name="role" value={maid.role || 'maid'} required />
            </div>
          )}
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

export default MaidForm;