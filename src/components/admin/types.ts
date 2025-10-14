export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  phone: string;
}

export interface Address {
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
  photo_before?: string;
  photo_after?: string;
  photos_uploaded_at?: string;
  assigned_maid_name?: string;
}

export interface Maid {
  id: number;
  full_name: string;
  phone: string;
  email?: string;
  completed_count?: number;
  in_progress_count?: number;
  assigned_count?: number;
  total_assignments?: number;
}

export const serviceTypeNames: Record<string, string> = {
  basic: 'Базовая',
  deep: 'Генеральная',
  after: 'После ремонта',
  office: 'Офисная',
};

export const statusNames: Record<string, string> = {
  pending: 'Ожидает',
  assigned: 'Назначена',
  in_progress: 'В работе',
  completed: 'Выполнена',
  cancelled: 'Отменена',
};