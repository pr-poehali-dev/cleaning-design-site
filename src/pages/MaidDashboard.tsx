import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import MaidHeader from '@/components/maid/MaidHeader';
import StatsCards from '@/components/maid/StatsCards';
import AssignmentCard from '@/components/maid/AssignmentCard';
import EmptyState from '@/components/maid/EmptyState';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  phone: string;
}

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

const MaidDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [uploadingPhotos, setUploadingPhotos] = useState<number | null>(null);
  const [photoBefore, setPhotoBefore] = useState<string>('');
  const [photoAfter, setPhotoAfter] = useState<string>('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'maid') {
      navigate('/login');
      return;
    }

    setUser(parsedUser);
    loadAssignments(parsedUser.id);
  }, [navigate]);

  const loadAssignments = async (maidId: number) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/9af65dd4-4184-4636-9cc8-b12aa6b82787?action=assignments&maid_id=${maidId}`);
      const data = await response.json();
      if (response.ok) {
        setAssignments(data.assignments);
      }
    } catch (error) {
      console.error('Failed to load assignments:', error);
    }
  };

  const handleUpdateStatus = async (assignmentId: number, status: string) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    
    if (status === 'completed') {
      if (!assignment?.photo_before && !assignment?.photo_after) {
        toast({ 
          title: 'Внимание', 
          description: 'Загрузите фото до завершения работы', 
          variant: 'destructive' 
        });
        return;
      }
      
      const checklist = assignment?.checklist_data || [];
      const allChecked = checklist.length > 0 && checklist.every(item => item.checked);
      if (!allChecked) {
        toast({ 
          title: 'Внимание', 
          description: 'Завершите все пункты чек-листа перед завершением уборки', 
          variant: 'destructive' 
        });
        return;
      }
    }

    try {
      const response = await fetch('https://functions.poehali.dev/9af65dd4-4184-4636-9cc8-b12aa6b82787?action=update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignment_id: assignmentId, status }),
      });

      if (response.ok) {
        const statusMessages: Record<string, string> = {
          'in_progress': 'Работа начата',
          'completed': 'Отправлено на проверку администратору',
        };
        toast({ 
          title: 'Статус обновлен', 
          description: statusMessages[status] || `Статус изменен на "${statusNames[status]}"` 
        });
        if (user) {
          loadAssignments(user.id);
        }
      }
    } catch (error) {
      toast({ 
        title: 'Ошибка', 
        description: 'Не удалось обновить статус', 
        variant: 'destructive' 
      });
    }
  };

  const handlePhotoUpload = async (assignmentId: number) => {
    if (!photoBefore && !photoAfter) {
      toast({ title: 'Ошибка', description: 'Загрузите хотя бы одно фото', variant: 'destructive' });
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/9af65dd4-4184-4636-9cc8-b12aa6b82787?action=upload-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignment_id: assignmentId,
          photo_before: photoBefore || null,
          photo_after: photoAfter || null,
        }),
      });

      if (response.ok) {
        toast({ title: 'Успех', description: 'Фото успешно загружены' });
        setUploadingPhotos(null);
        setPhotoBefore('');
        setPhotoAfter('');
        if (user) {
          loadAssignments(user.id);
        }
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось загрузить фото', variant: 'destructive' });
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'Ошибка', description: 'Размер файла не должен превышать 5МБ', variant: 'destructive' });
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      if (type === 'before') {
        setPhotoBefore(base64);
      } else {
        setPhotoAfter(base64);
      }
    } catch (error) {
      toast({ title: 'Ошибка', description: 'Не удалось обработать файл', variant: 'destructive' });
    }
  };

  const handleChecklistUpdate = async (assignmentId: number, checklist: ChecklistItem[]) => {
    try {
      const response = await fetch('https://functions.poehali.dev/9af65dd4-4184-4636-9cc8-b12aa6b82787?action=update-checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignment_id: assignmentId,
          checklist_data: checklist,
        }),
      });

      if (response.ok) {
        if (user) {
          loadAssignments(user.id);
        }
      }
    } catch (error) {
      console.error('Failed to update checklist:', error);
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
    completed: 'На проверке',
    verified: 'Проверена',
    cancelled: 'Отменена',
  };

  if (!user) return null;

  const todayAssignments = assignments.filter(a => {
    const today = new Date().toISOString().split('T')[0];
    return a.scheduled_date === today;
  });

  const upcomingAssignments = assignments.filter(a => {
    const today = new Date().toISOString().split('T')[0];
    return a.scheduled_date > today;
  });

  const pastAssignments = assignments.filter(a => {
    const today = new Date().toISOString().split('T')[0];
    return a.scheduled_date < today;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <MaidHeader
        userName={user.full_name}
        onNavigateToSalary={() => navigate('/salary')}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <StatsCards
          todayCount={todayAssignments.length}
          upcomingCount={upcomingAssignments.length}
          completedCount={assignments.filter(a => a.status === 'completed').length}
        />

        {todayAssignments.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-3 sm:mb-4">Сегодня</h2>
            <div className="space-y-3 sm:space-y-4">
              {todayAssignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  variant="today"
                  uploadingPhotos={uploadingPhotos === assignment.id}
                  photoBefore={photoBefore}
                  photoAfter={photoAfter}
                  serviceTypeNames={serviceTypeNames}
                  statusNames={statusNames}
                  onUpdateStatus={handleUpdateStatus}
                  onFileChange={handleFileChange}
                  onPhotoUpload={handlePhotoUpload}
                  onStartUpload={() => setUploadingPhotos(assignment.id)}
                  onCancelUpload={() => {
                    setUploadingPhotos(null);
                    setPhotoBefore('');
                    setPhotoAfter('');
                  }}
                  onChecklistUpdate={handleChecklistUpdate}
                />
              ))}
            </div>
          </div>
        )}

        {upcomingAssignments.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-3 sm:mb-4">Предстоящие</h2>
            <div className="space-y-3 sm:space-y-4">
              {upcomingAssignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  variant="upcoming"
                  uploadingPhotos={uploadingPhotos === assignment.id}
                  photoBefore={photoBefore}
                  photoAfter={photoAfter}
                  serviceTypeNames={serviceTypeNames}
                  statusNames={statusNames}
                  onUpdateStatus={handleUpdateStatus}
                  onFileChange={handleFileChange}
                  onPhotoUpload={handlePhotoUpload}
                  onStartUpload={() => setUploadingPhotos(assignment.id)}
                  onCancelUpload={() => {
                    setUploadingPhotos(null);
                    setPhotoBefore('');
                    setPhotoAfter('');
                  }}
                  onChecklistUpdate={handleChecklistUpdate}
                />
              ))}
            </div>
          </div>
        )}

        {pastAssignments.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-400 mb-4">Выполненные</h2>
            <div className="space-y-4">
              {pastAssignments.slice(0, 5).map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  variant="past"
                  uploadingPhotos={false}
                  photoBefore=""
                  photoAfter=""
                  serviceTypeNames={serviceTypeNames}
                  statusNames={statusNames}
                  onUpdateStatus={handleUpdateStatus}
                  onFileChange={handleFileChange}
                  onPhotoUpload={handlePhotoUpload}
                  onStartUpload={() => {}}
                  onCancelUpload={() => {}}
                  onNavigateToChecklist={() => {}}
                />
              ))}
            </div>
          </div>
        )}

        {assignments.length === 0 && <EmptyState />}
      </main>
    </div>
  );
};

export default MaidDashboard;