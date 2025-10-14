import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PhotoUploadFormProps {
  photoBefore: string;
  photoAfter: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => void;
  onSave: () => void;
  onCancel: () => void;
}

const PhotoUploadForm = ({ photoBefore, photoAfter, onFileChange, onSave, onCancel }: PhotoUploadFormProps) => {
  return (
    <div className="space-y-4 mt-4 p-4 bg-gray-700 rounded-lg">
      <h4 className="font-bold text-yellow-400">Загрузка фото</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Фото ДО уборки</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileChange(e, 'before')}
            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500"
          />
          {photoBefore && (
            <img src={photoBefore} alt="До уборки" className="mt-2 w-full h-32 object-cover rounded" />
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">Фото ПОСЛЕ уборки</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileChange(e, 'after')}
            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500"
          />
          {photoAfter && (
            <img src={photoAfter} alt="После уборки" className="mt-2 w-full h-32 object-cover rounded" />
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onSave}
          className="bg-green-500 hover:bg-green-600"
        >
          <Icon name="Upload" size={16} className="mr-2" />
          Сохранить фото
        </Button>
        <Button
          onClick={onCancel}
          variant="ghost"
        >
          Отмена
        </Button>
      </div>
    </div>
  );
};

export default PhotoUploadForm;
