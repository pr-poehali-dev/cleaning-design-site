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

const BookingForm = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');

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
    <section id="booking" className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Онлайн-запись
          </h2>
          <p className="text-gray-600 text-lg">
            Выберите удобное время, и мы свяжемся с вами для подтверждения
          </p>
        </div>
        
        <Card className="p-10 shadow-glow border-2 border-primary/20 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date" className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Calendar" size={20} className="text-primary" />
                  Дата уборки
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-14 justify-start text-left font-normal border-2 border-gray-200 hover:border-primary/50 text-base"
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
                <Label htmlFor="time" className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Clock" size={20} className="text-primary" />
                  Время
                </Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger id="time" className="h-14 border-2 border-gray-200 hover:border-primary/50 text-base">
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
                <Label htmlFor="name" className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Icon name="User" size={20} className="text-primary" />
                  Ваше имя
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван Иванов"
                  className="h-14 border-2 border-gray-200 hover:border-primary/50 text-base"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Phone" size={20} className="text-primary" />
                  Телефон
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  className="h-14 border-2 border-gray-200 hover:border-primary/50 text-base"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="comment" className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Icon name="MessageSquare" size={20} className="text-primary" />
                Комментарий (необязательно)
              </Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Особые пожелания или детали..."
                className="min-h-[120px] border-2 border-gray-200 hover:border-primary/50 text-base"
              />
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-16 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:shadow-glow transition-all text-white group"
            >
              Отправить заявку
              <Icon name="Send" className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;
