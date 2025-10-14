import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import PhotoUploadForm from './PhotoUploadForm';

interface Assignment {
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
  assigned_at: string;
  photo_before?: string;
  photo_after?: string;
  photos_uploaded_at?: string;
  salary?: number;
  verified_at?: string;
}

interface AssignmentCardProps {
  assignment: Assignment;
  variant: 'today' | 'upcoming' | 'past';
  uploadingPhotos: boolean;
  photoBefore: string;
  photoAfter: string;
  serviceTypeNames: Record<string, string>;
  statusNames: Record<string, string>;
  onUpdateStatus: (assignmentId: number, status: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => void;
  onPhotoUpload: (assignmentId: number) => void;
  onStartUpload: () => void;
  onCancelUpload: () => void;
  onNavigateToChecklist: () => void;
}

const AssignmentCard = ({
  assignment,
  variant,
  uploadingPhotos,
  photoBefore,
  photoAfter,
  serviceTypeNames,
  statusNames,
  onUpdateStatus,
  onFileChange,
  onPhotoUpload,
  onStartUpload,
  onCancelUpload,
  onNavigateToChecklist,
}: AssignmentCardProps) => {
  const borderClass = variant === 'today' 
    ? 'border-2 border-yellow-400' 
    : variant === 'upcoming' 
    ? 'border border-gray-700' 
    : 'border border-gray-700';

  const bgClass = variant === 'past' ? 'bg-gray-800/50' : 'bg-gray-800';

  if (variant === 'past') {
    return (
      <div className={`${bgClass} rounded-lg p-4 ${borderClass}`}>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-white">{assignment.address}</h3>
            <p className="text-gray-400 text-sm">{assignment.scheduled_date}</p>
          </div>
          <div className="text-right">
            <p className="text-green-400 font-semibold">{assignment.price} ₽</p>
            <span className="text-green-400 text-sm">✓ Выполнено</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${bgClass} rounded-lg p-6 ${borderClass}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-xl font-bold ${variant === 'today' ? 'text-yellow-400' : 'text-white'}`}>
            {assignment.address}
          </h3>
          <p className="text-gray-400">
            Клиент: {assignment.client_name}{variant === 'today' && ` • ${assignment.client_phone}`}
          </p>
        </div>
        <span className={`px-3 py-1 rounded text-sm ${
          assignment.status === 'completed' ? 'bg-green-500/20 text-green-400' :
          assignment.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
          'bg-yellow-500/20 text-yellow-400'
        }`}>
          {statusNames[assignment.status]}
        </span>
      </div>

      <div className={`grid ${variant === 'today' ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-4 mb-4`}>
        <div>
          <span className="text-gray-400 text-sm">{variant === 'today' ? 'Тип уборки' : 'Тип'}</span>
          <p className={`${variant === 'today' ? 'text-white font-semibold' : 'text-white'}`}>
            {serviceTypeNames[assignment.service_type]}
          </p>
        </div>
        <div>
          <span className="text-gray-400 text-sm">Площадь</span>
          <p className={`${variant === 'today' ? 'text-white font-semibold' : 'text-white'}`}>
            {assignment.area} м²
          </p>
        </div>
        {variant === 'today' && (
          <div>
            <span className="text-gray-400 text-sm">Время</span>
            <p className="text-white font-semibold">{assignment.scheduled_time}</p>
          </div>
        )}
        <div>
          <span className="text-gray-400 text-sm">Оплата</span>
          <p className={`${variant === 'today' ? 'text-white font-semibold' : 'text-white'}`}>
            {assignment.price} ₽
          </p>
        </div>
      </div>

      {variant === 'upcoming' && (
        <p className="text-gray-400 text-sm mb-4">
          📅 {assignment.scheduled_date} в {assignment.scheduled_time}
        </p>
      )}

      {assignment.notes && variant === 'today' && (
        <div className="mb-4 p-3 bg-gray-700 rounded">
          <span className="text-gray-400 text-sm">Примечания:</span>
          <p className="text-white">{assignment.notes}</p>
        </div>
      )}

      {uploadingPhotos ? (
        <PhotoUploadForm
          photoBefore={photoBefore}
          photoAfter={photoAfter}
          onFileChange={onFileChange}
          onSave={() => onPhotoUpload(assignment.id)}
          onCancel={onCancelUpload}
        />
      ) : (
        <>
          {(assignment.photo_before || assignment.photo_after) && variant === 'today' && (
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {assignment.photo_before && (
                <div>
                  <p className="text-gray-400 text-sm mb-2">Фото ДО уборки</p>
                  <img src={assignment.photo_before} alt="До уборки" className="w-full h-48 object-cover rounded-lg" />
                </div>
              )}
              {assignment.photo_after && (
                <div>
                  <p className="text-gray-400 text-sm mb-2">Фото ПОСЛЕ уборки</p>
                  <img src={assignment.photo_after} alt="После уборки" className="w-full h-48 object-cover rounded-lg" />
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {assignment.status === 'assigned' && (
              <Button
                onClick={() => onUpdateStatus(assignment.id, 'in_progress')}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Icon name="Play" size={16} className="mr-2" />
                Начать работу
              </Button>
            )}

            {assignment.status === 'in_progress' && (
              <Button
                onClick={() => onUpdateStatus(assignment.id, 'completed')}
                className="bg-green-500 hover:bg-green-600"
              >
                <Icon name="CheckCircle" size={16} className="mr-2" />
                Завершить
              </Button>
            )}

            {(assignment.status === 'assigned' || assignment.status === 'in_progress') && (
              <Button
                onClick={onStartUpload}
                className="bg-purple-500 hover:bg-purple-600"
              >
                <Icon name="Camera" size={16} className="mr-2" />
                Загрузить фото
              </Button>
            )}

            {variant === 'today' && (assignment.status === 'assigned' || assignment.status === 'in_progress') && (
              <Button
                onClick={onNavigateToChecklist}
                className="btn-shine bg-transparent text-white hover:bg-transparent"
              >
                <Icon name="ClipboardCheck" size={16} className="mr-2" />
                Чек-лист
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AssignmentCard;