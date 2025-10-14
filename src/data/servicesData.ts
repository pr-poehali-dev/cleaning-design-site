export interface Service {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
  includes: string[];
}

export interface AdditionalService {
  id: string;
  name: string;
  price: number;
  category: string;
}

export const services: Service[] = [
  { 
    id: 'basic', 
    name: 'Базовая уборка', 
    price: 10000, 
    icon: 'Home',
    description: 'Включает уборку всех помещений, влажную уборку полов, протирку пыли, уборку санузлов и кухни. Мы используем собственные профессиональные чистящие и моющие средства, а также всё необходимое оборудование.',
    includes: ['Влажная уборка полов', 'Протирка пыли на всех поверхностях', 'Уборка санузлов', 'Мытье кухни', 'Вынос мусора', 'Собственные средства и оборудование']
  },
  { 
    id: 'deep', 
    name: 'Генеральная уборка', 
    price: 15000, 
    icon: 'Sparkles',
    description: 'Глубокая уборка всех помещений с использованием профессиональных средств. Мы используем собственные чистящие и моющие средства, а также всё необходимое оборудование.',
    includes: ['Всё из базовой уборки', 'Мытьё окон', 'Чистка бытовой техники', 'Уборка труднодоступных мест', 'Мытьё плинтусов и дверей', 'Чистка мебели', 'Собственные средства и оборудование']
  },
  { 
    id: 'after', 
    name: 'После ремонта', 
    price: 20000, 
    icon: 'Hammer',
    description: 'Профессиональная уборка после строительных и ремонтных работ. Мы используем собственные профессиональные чистящие и моющие средства, а также всё необходимое оборудование.',
    includes: ['Удаление строительной пыли', 'Мытьё окон и рам', 'Очистка всех поверхностей от загрязнений', 'Уборка следов краски и клея', 'Полировка сантехники', 'Собственные средства и оборудование']
  },
  { 
    id: 'office', 
    name: 'Офисная уборка', 
    price: 12000, 
    icon: 'Building',
    description: 'Комплексная уборка офисных помещений с учетом рабочего графика. Мы используем собственные профессиональные чистящие и моющие средства, а также всё необходимое оборудование.',
    includes: ['Уборка рабочих мест', 'Влажная уборка полов', 'Протирка оргтехники', 'Уборка переговорных', 'Уборка кухонной зоны', 'Вынос мусора', 'Собственные средства и оборудование']
  },
];

export const additionalServices: AdditionalService[] = [
  { id: 'windows', name: 'Мойка окон', price: 3000, category: 'Уборка' },
  { id: 'steam', name: 'Обработка паром помещения', price: 4000, category: 'Обработка' },
  { id: 'ozone', name: 'Озонирование', price: 2500, category: 'Обработка' },
  { id: 'furniture', name: 'Химчистка мебели', price: 5000, category: 'Чистка' },
  { id: 'carpet', name: 'Химчистка ковролина', price: 4500, category: 'Чистка' },
  { id: 'mold', name: 'Удаление плесени', price: 6000, category: 'Обработка' },
  { id: 'disinfection', name: 'Дезинфекция', price: 3500, category: 'Обработка' },
  { id: 'ironing', name: 'Глажка белья', price: 2000, category: 'Уборка' },
  { id: 'curtains', name: 'Стирка штор', price: 3500, category: 'Уборка' },
  { id: 'blinds', name: 'Чистка жалюзи', price: 2500, category: 'Чистка' },
  { id: 'dishes', name: 'Мытье посуды', price: 1500, category: 'Уборка' },
  { id: 'balcony', name: 'Уборка балкона/лоджии', price: 2000, category: 'Уборка' },
  { id: 'hood', name: 'Чистка вытяжки', price: 2500, category: 'Чистка' },
  { id: 'chandelier', name: 'Чистка люстр и светильников', price: 3000, category: 'Чистка' },
  { id: 'parquet', name: 'Полировка паркета', price: 5000, category: 'Чистка' },
  { id: 'plants', name: 'Уход за растениями', price: 1500, category: 'Уборка' },
  { id: 'organize', name: 'Организация пространства', price: 4000, category: 'Уборка' },
  { id: 'mattress', name: 'Чистка матрасов', price: 4500, category: 'Чистка' },
  { id: 'stains', name: 'Удаление пятен', price: 3000, category: 'Чистка' },
  { id: 'antibacterial', name: 'Антибактериальная обработка', price: 3500, category: 'Обработка' },
  { id: 'odor', name: 'Устранение запахов', price: 3000, category: 'Обработка' },
  { id: 'insects', name: 'Обработка от насекомых', price: 5000, category: 'Обработка' },
  { id: 'protection', name: 'Защита поверхностей (нанокерамика)', price: 6000, category: 'Обработка' },
  { id: 'aroma', name: 'Ароматизация помещения', price: 2000, category: 'Обработка' },
  { id: 'facade', name: 'Мытье фасадов (снаружи окон)', price: 4500, category: 'Уборка' },
  { id: 'holiday', name: 'Уборка после праздников', price: 5000, category: 'Уборка' },
  { id: 'fireplace', name: 'Чистка каминов', price: 4000, category: 'Чистка' },
  { id: 'yard', name: 'Уборка придомовой территории', price: 3500, category: 'Уборка' },
  { id: 'garage', name: 'Уборка гаража/подвала', price: 4500, category: 'Уборка' },
];