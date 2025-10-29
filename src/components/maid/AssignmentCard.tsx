import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import PhotoUploadForm from './PhotoUploadForm';
import { useState, useEffect } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  checked: boolean;
}

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
  checklist_data?: ChecklistItem[];
  checklist_started_at?: string;
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
  onChecklistUpdate: (assignmentId: number, checklist: ChecklistItem[]) => void;
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
  onChecklistUpdate,
}: AssignmentCardProps) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(assignment.checklist_data || []);
  const [showChecklist, setShowChecklist] = useState(false);

  useEffect(() => {
    setChecklist(assignment.checklist_data || []);
  }, [assignment.checklist_data]);

  const toggleChecklistItem = (itemId: string) => {
    const updatedChecklist = checklist.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setChecklist(updatedChecklist);
    onChecklistUpdate(assignment.id, updatedChecklist);
  };

  const allChecked = checklist.length > 0 && checklist.every(item => item.checked);
  const progress = checklist.length > 0 ? Math.round((checklist.filter(i => i.checked).length / checklist.length) * 100) : 0;
  const categories = Array.from(new Set(checklist.map(item => item.category)));
  const borderClass = variant === 'today' 
    ? 'border-2 border-yellow-400' 
    : variant === 'upcoming' 
    ? 'border border-gray-700' 
    : 'border border-gray-700';

  const bgClass = variant === 'past' ? 'bg-gray-800/50' : 'bg-gray-800';

  if (variant === 'past') {
    return (
      <div className={`${bgClass} rounded-lg p-3 sm:p-4 ${borderClass}`}>
        <div className="flex justify-between items-center">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-sm sm:text-base truncate">{assignment.address}</h3>
            <p className="text-gray-400 text-xs sm:text-sm">{assignment.scheduled_date}</p>
          </div>
          <div className="text-right ml-2 flex-shrink-0">
            <span className="text-green-400 text-xs sm:text-sm">✓ Выполнено</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${bgClass} rounded-lg p-4 sm:p-6 ${borderClass}`}>
      <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg sm:text-xl font-bold ${variant === 'today' ? 'text-yellow-400' : 'text-white'} break-words`}>
            {assignment.address}
          </h3>
          <p className="text-gray-400 text-sm break-words">
            Клиент: {assignment.client_name}
            {variant === 'today' && (
              <span className="block sm:inline sm:before:content-['•'] sm:before:mx-1">
                {assignment.client_phone}
              </span>
            )}
          </p>
        </div>
        <span className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm flex-shrink-0 ${
          assignment.status === 'completed' ? 'bg-green-500/20 text-green-400' :
          assignment.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
          'bg-yellow-500/20 text-yellow-400'
        }`}>
          {statusNames[assignment.status]}
        </span>
      </div>

      <div className={`grid grid-cols-2 ${variant === 'today' ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-3 sm:gap-4 mb-3 sm:mb-4`}>
        <div>
          <span className="text-gray-400 text-xs sm:text-sm">{variant === 'today' ? 'Тип уборки' : 'Тип'}</span>
          <p className={`text-sm sm:text-base ${variant === 'today' ? 'text-white font-semibold' : 'text-white'}`}>
            {serviceTypeNames[assignment.service_type]}
          </p>
        </div>
        <div>
          <span className="text-gray-400 text-xs sm:text-sm">Площадь</span>
          <p className={`text-sm sm:text-base ${variant === 'today' ? 'text-white font-semibold' : 'text-white'}`}>
            {assignment.area} м²
          </p>
        </div>
        {variant === 'today' && (
          <div className="col-span-2 sm:col-span-1">
            <span className="text-gray-400 text-xs sm:text-sm">Время</span>
            <p className="text-sm sm:text-base text-white font-semibold">{assignment.scheduled_time}</p>
          </div>
        )}
      </div>

      {variant === 'upcoming' && (
        <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
          📅 {assignment.scheduled_date} в {assignment.scheduled_time}
        </p>
      )}

      {assignment.notes && variant === 'today' && (
        <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-gray-700 rounded">
          <span className="text-gray-400 text-xs sm:text-sm">Примечания:</span>
          <p className="text-white text-sm break-words">{assignment.notes}</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              {assignment.photo_before && (
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm mb-2">Фото ДО уборки</p>
                  <img src={assignment.photo_before} alt="До уборки" className="w-full h-40 sm:h-48 object-cover rounded-lg" />
                </div>
              )}
              {assignment.photo_after && (
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm mb-2">Фото ПОСЛЕ уборки</p>
                  <img src={assignment.photo_after} alt="После уборки" className="w-full h-40 sm:h-48 object-cover rounded-lg" />
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {assignment.status === 'assigned' && (
              <Button
                onClick={() => onUpdateStatus(assignment.id, 'in_progress')}
                className="bg-blue-500 hover:bg-blue-600 h-9 sm:h-10 text-sm sm:text-base"
                size="sm"
              >
                <Icon name="Play" size={16} className="mr-1 sm:mr-2" />
                Начать работу
              </Button>
            )}

            {assignment.status === 'in_progress' && checklist.length > 0 && (
              <Button
                onClick={() => setShowChecklist(!showChecklist)}
                className="bg-yellow-500 hover:bg-yellow-600 h-9 sm:h-10 text-sm sm:text-base"
                size="sm"
              >
                <Icon name="ClipboardCheck" size={16} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{showChecklist ? 'Скрыть чек-лист' : `Чек-лист (${progress}%)`}</span>
                <span className="sm:hidden">{progress}%</span>
              </Button>
            )}

            {assignment.status === 'in_progress' && allChecked && (
              <Button
                onClick={() => onUpdateStatus(assignment.id, 'completed')}
                className="bg-green-500 hover:bg-green-600 h-9 sm:h-10 text-sm sm:text-base"
                size="sm"
              >
                <Icon name="CheckCircle" size={16} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Завершить уборку</span>
                <span className="sm:hidden">Завершить</span>
              </Button>
            )}

            {(assignment.status === 'assigned' || assignment.status === 'in_progress') && (
              <Button
                onClick={onStartUpload}
                className="bg-purple-500 hover:bg-purple-600 h-9 sm:h-10 text-sm sm:text-base"
                size="sm"
              >
                <Icon name="Camera" size={16} className="mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Загрузить фото</span>
                <span className="sm:hidden">Фото</span>
              </Button>
            )}

          </div>

          {showChecklist && checklist.length > 0 && assignment.status === 'in_progress' && (
            <div className="mt-4 sm:mt-6 bg-gray-700 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-base sm:text-lg font-semibold text-white">Прогресс выполнения</span>
                <span className="text-xl sm:text-2xl font-bold text-yellow-400">{progress}%</span>
              </div>
              <div className="w-full h-2 sm:h-3 bg-gray-600 rounded-full overflow-hidden mb-3 sm:mb-4">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                Выполнено: {checklist.filter(i => i.checked).length} из {checklist.length}
              </div>

              <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
                {categories.map(category => {
                  const categoryItems = checklist.filter(item => item.category === category);
                  const categoryChecked = categoryItems.filter(item => item.checked).length;

                  return (
                    <div key={category} className="bg-gray-800 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <h4 className="font-semibold text-sm sm:text-base text-yellow-400">{category}</h4>
                        <span className="text-xs sm:text-sm text-gray-400">
                          {categoryChecked}/{categoryItems.length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {categoryItems.map(item => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-2 sm:space-x-3 p-2 rounded hover:bg-gray-700 transition-colors"
                          >
                            <Checkbox
                              checked={item.checked}
                              onCheckedChange={() => toggleChecklistItem(item.id)}
                              id={`item-${item.id}`}
                            />
                            <label
                              htmlFor={`item-${item.id}`}
                              className={`flex-1 cursor-pointer text-xs sm:text-sm ${
                                item.checked ? 'line-through text-gray-500' : 'text-white'
                              }`}
                            >
                              {item.text}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AssignmentCard;