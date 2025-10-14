import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface BookingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingModal = ({ isOpen, onOpenChange }: BookingModalProps) => {
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
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Записаться на уборку</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
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
                  <SelectItem value="12:00">12:00</SelectItem>
                  <SelectItem value="13:00">13:00</SelectItem>
                  <SelectItem value="14:00">14:00</SelectItem>
                  <SelectItem value="15:00">15:00</SelectItem>
                  <SelectItem value="16:00">16:00</SelectItem>
                  <SelectItem value="17:00">17:00</SelectItem>
                  <SelectItem value="18:00">18:00</SelectItem>
                  <SelectItem value="19:00">19:00</SelectItem>
                  <SelectItem value="20:00">20:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
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
                placeholder="+7 (914) 196-51-72"
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
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;