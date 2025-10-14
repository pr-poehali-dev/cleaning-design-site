import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
  includes: string[];
}

interface HeaderProps {
  serviceType: string;
  setServiceType: (type: string) => void;
  area: string;
  setArea: (area: string) => void;
  services: Service[];
  calculatePrice: () => number;
  onInfoClick: () => void;
}

const Header = ({
  serviceType,
  setServiceType,
  area,
  setArea,
  services,
  calculatePrice,
  onInfoClick,
}: HeaderProps) => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isConsultationOpen && !hasShownWelcome) {
      setHasShownWelcome(true);
      const timer = setTimeout(() => {
        toast({
          title: "👋 Добро пожаловать!",
          description: "Мы онлайн и готовы ответить на все ваши вопросы о клининге!",
          duration: 5000,
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isConsultationOpen, hasShownWelcome, toast]);

  const handleStart = () => {
    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Заполните данные",
        description: "Укажите ваше имя и телефон для начала консультации",
        variant: "destructive",
      });
      return;
    }
    setIsStarted(true);
    toast({
      title: "Консультант подключится через минуту",
      description: "Мы свяжемся с вами в ближайшее время!",
    });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    toast({
      title: "Сообщение отправлено",
      description: "Консультант ответит в течение минуты",
    });
    setMessage('');
  };

  return (
    <header className="bg-gradient-to-r from-black via-gray-900 to-black border-b-4 border-yellow-400 sticky top-0 z-50 py-4 px-4 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4 lg:mb-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <Icon name="Sparkles" size={24} className="text-black" />
            </div>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              p9&clean
            </h2>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <Button 
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold px-3 py-2 rounded-xl"
              onClick={() => window.location.href = 'tel:+79141965172'}
            >
              <Icon name="Phone" size={18} />
            </Button>
            <Button 
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold px-3 py-2 rounded-xl"
              onClick={() => setIsConsultationOpen(!isConsultationOpen)}
            >
              <Icon name="MessageCircle" size={18} />
            </Button>
            <Button 
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold px-4 rounded-xl"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Записаться
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
          <div className="w-full lg:w-auto flex items-center gap-3">
            <div className="flex-1 lg:flex-none bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 backdrop-blur-md px-5 py-4 rounded-2xl border-2 border-yellow-400 shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform">
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger className="w-full lg:w-[140px] h-9 border-0 bg-transparent text-white font-medium">
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
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                onClick={onInfoClick}
              >
                <Icon name="Info" size={18} />
              </Button>
            </div>
            
            <div className="flex-1 lg:flex-none bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 backdrop-blur-md px-5 py-4 rounded-2xl border-2 border-yellow-400 shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform">
              <Input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                min="20"
                max="500"
                className="w-full lg:w-24 h-10 border-0 bg-transparent text-white text-center font-bold text-lg"
              />
              <span className="text-yellow-400 font-bold text-lg">м²</span>
            </div>
          </div>
          
          <div className="w-full lg:w-auto flex items-center gap-4">
            <div className="flex-1 lg:flex-none bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 px-8 py-4 rounded-2xl shadow-2xl border-2 border-yellow-300 hover:scale-105 transition-transform">
              <div className="flex items-center justify-center gap-3">
                <Icon name="Calculator" size={24} className="text-black" />
                <span className="text-black font-bold text-2xl lg:text-3xl">{calculatePrice()}₽</span>
              </div>
            </div>
            
            <Button 
              className="hidden lg:flex items-center gap-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-black hover:scale-105 transition-transform font-bold px-8 py-6 rounded-2xl shadow-2xl border-2 border-yellow-300"
              onClick={() => window.location.href = 'tel:+79141965172'}
            >
              <Icon name="Phone" size={22} />
              +7 (914) 196-51-72
            </Button>
            
            <Button 
              className="hidden lg:flex items-center gap-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-black hover:scale-105 transition-transform font-bold px-8 py-6 rounded-2xl shadow-2xl border-2 border-yellow-300"
              onClick={() => setIsConsultationOpen(!isConsultationOpen)}
            >
              <Icon name="MessageCircle" size={22} />
              Консультация
            </Button>
            
            <Button 
              className="hidden lg:block bg-gradient-to-br from-white to-gray-100 text-black hover:scale-105 transition-transform font-bold px-10 py-6 rounded-2xl shadow-2xl border-2 border-gray-300"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Записаться
            </Button>
          </div>
        </div>
      </div>

      {isConsultationOpen && (
        <div className="absolute top-full right-4 mt-2 w-96 bg-white rounded-2xl shadow-2xl border-2 border-yellow-400 overflow-hidden animate-in slide-in-from-top-5 z-50">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
                  <Icon name="Headphones" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Онлайн консультация</h3>
                  <p className="text-xs text-black/80">Ответим на все вопросы</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-black/10"
                onClick={() => setIsConsultationOpen(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          <div className="p-4 max-h-[400px] overflow-y-auto">
            {!isStarted ? (
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <Icon name="Sparkles" size={18} className="text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-yellow-600 font-semibold">p9&clean</p>
                      <p className="text-sm text-gray-700 mt-1">
                        Здравствуйте! 👋 Мы онлайн и готовы помочь с выбором клининговых услуг. Оставьте контакты, и консультант ответит на все вопросы!
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Ваше имя
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Введите имя"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Телефон
                  </label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (914) 196-51-72"
                    type="tel"
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={handleStart}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold"
                >
                  Начать консультацию
                  <Icon name="Send" className="ml-2" size={18} />
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Icon name="User" size={18} className="text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-yellow-600 font-semibold">Консультант</p>
                      <p className="text-sm text-gray-700 mt-1">
                        Здравствуйте, {name}! Я подключился. Чем могу помочь?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Напишите ваш вопрос..."
                    className="w-full min-h-[80px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold"
                  >
                    Отправить
                    <Icon name="Send" className="ml-2" size={18} />
                  </Button>
                </div>

                <div className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                      setIsConsultationOpen(false);
                    }}
                    className="text-yellow-600 hover:text-yellow-700"
                  >
                    <Icon name="Calendar" className="mr-2" size={16} />
                    Или записаться сразу
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;