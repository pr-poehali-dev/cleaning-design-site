import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const Index = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [area, setArea] = useState('50');
  const [serviceType, setServiceType] = useState('basic');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');

  const services = [
    { id: 'basic', name: 'Базовая уборка', price: 2000, icon: 'Home' },
    { id: 'deep', name: 'Генеральная уборка', price: 4000, icon: 'Sparkles' },
    { id: 'after', name: 'После ремонта', price: 5000, icon: 'Hammer' },
    { id: 'office', name: 'Офисная уборка', price: 3500, icon: 'Building' },
  ];

  const calculatePrice = () => {
    const basePrice = services.find(s => s.id === serviceType)?.price || 2000;
    const areaMultiplier = parseInt(area) / 50;
    return Math.round(basePrice * areaMultiplier);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !time || !name || !phone) {
      toast({
        title: 'Заполните все поля',
        description: 'Пожалуйста, укажите дату, время и контактные данные',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Заявка отправлена!',
      description: `Мы свяжемся с вами в ближайшее время для подтверждения записи на ${format(selectedDate, 'dd MMMM', { locale: ru })} в ${time}`,
    });
    
    setSelectedDate(undefined);
    setTime('');
    setName('');
    setPhone('');
    setComment('');
  };

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-20 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left relative z-10 animate-fade-in">
              <div className="mb-8">
                <h2 className="font-heading text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  Beauty & Clean
                </h2>
              </div>
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
                Красота в каждой детали
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                Премиальная уборка квартир с профессиональными клинерами. Красота, качество, безупречность
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Записаться на уборку
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            </div>

            <div className="relative h-[400px] hidden md:block">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-6 animate-slide-up">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400/50 shadow-2xl animate-float" style={{ animationDelay: '0s' }}>
                  <img 
                    src="https://cdn.poehali.dev/projects/59f838a9-7d70-436b-9b50-e9dc6652d8b4/files/e15a62af-b3c2-4379-b826-3768274bd664.jpg" 
                    alt="Клинер" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400/50 shadow-2xl ml-12 animate-float" style={{ animationDelay: '1s' }}>
                  <img 
                    src="https://cdn.poehali.dev/projects/59f838a9-7d70-436b-9b50-e9dc6652d8b4/files/e3a65918-6ffc-4753-9f5f-d8046f3deeba.jpg" 
                    alt="Клинер" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400/50 shadow-2xl animate-float" style={{ animationDelay: '2s' }}>
                  <img 
                    src="https://cdn.poehali.dev/projects/59f838a9-7d70-436b-9b50-e9dc6652d8b4/files/8436bcc9-0d30-4b6d-8656-a572c32d4108.jpg" 
                    alt="Клинер" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center mb-12 text-gray-900">
            Наши услуги
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={service.id}
                className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border-2 hover:border-yellow-400"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-yellow-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Icon name={service.icon as any} size={32} className="text-yellow-600" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2 text-gray-900">{service.name}</h3>
                <p className="text-3xl font-bold text-yellow-600 mb-2">от {service.price}₽</p>
                <p className="text-gray-600 text-sm">за 50 м²</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center mb-4 text-gray-900">
            Калькулятор стоимости
          </h2>
          <p className="text-center text-gray-600 mb-12">Рассчитайте стоимость уборки за 30 секунд</p>
          
          <Card className="p-8 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label htmlFor="service" className="text-base font-semibold mb-2">Тип уборки</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger id="service" className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map(service => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="area" className="text-base font-semibold mb-2">Площадь (м²)</Label>
                <Input
                  id="area"
                  type="number"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  min="20"
                  max="500"
                  className="h-12"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-6 rounded-2xl text-center">
              <p className="text-lg mb-2 font-semibold">Стоимость уборки</p>
              <p className="text-5xl font-bold font-heading">{calculatePrice()}₽</p>
            </div>
          </Card>
        </div>
      </section>

      <section id="booking" className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center mb-4 text-gray-900">
            Онлайн-запись
          </h2>
          <p className="text-center text-gray-600 mb-12">Выберите удобное время и мы свяжемся с вами</p>
          
          <Card className="p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="date" className="text-base font-semibold mb-2">Дата уборки</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 justify-start text-left font-normal"
                      >
                        <Icon name="Calendar" className="mr-2" size={18} />
                        {selectedDate ? format(selectedDate, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        locale={ru}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="time" className="text-base font-semibold mb-2">Время</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger id="time" className="h-12">
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="13:00">13:00</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="17:00">17:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-base font-semibold mb-2">Ваше имя</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Иванов"
                    className="h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base font-semibold mb-2">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    className="h-12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="comment" className="text-base font-semibold mb-2">Комментарий (необязательно)</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Особые пожелания или детали..."
                  className="min-h-[100px]"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600"
              >
                Отправить заявку
                <Icon name="Send" className="ml-2" size={20} />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-scale-in">
              <div className="bg-yellow-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Phone" size={32} className="text-yellow-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Телефон</h3>
              <p className="text-gray-300">+7 (495) 123-45-67</p>
            </div>

            <div className="animate-scale-in" style={{ animationDelay: '100ms' }}>
              <div className="bg-yellow-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Mail" size={32} className="text-yellow-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-300">info@cleaning.ru</p>
            </div>

            <div className="animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="bg-yellow-400/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={32} className="text-yellow-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">Режим работы</h3>
              <p className="text-gray-300">Ежедневно с 8:00 до 22:00</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 Beauty & Clean. Все права защищены</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;