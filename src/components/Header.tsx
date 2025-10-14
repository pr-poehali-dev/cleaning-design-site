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
    <header className="bg-black border-b border-yellow-400/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-bold text-yellow-400 shrink-0">
            p9&clean
          </h2>

          <div className="hidden lg:flex items-center gap-3 flex-1 justify-center">
            <div className="bg-white/10 px-4 py-2 rounded-lg border border-yellow-400/50 flex items-center gap-2">
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger className="w-[140px] border-0 bg-transparent text-white">
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
                className="h-8 w-8 p-0 text-yellow-400 hover:text-yellow-300 hover:bg-white/10"
                onClick={onInfoClick}
              >
                <Icon name="Info" size={16} />
              </Button>
            </div>
            
            <div className="bg-white/10 px-4 py-2 rounded-lg border border-yellow-400/50 flex items-center gap-2">
              <Input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                min="20"
                max="500"
                className="w-20 border-0 bg-transparent text-white text-center"
              />
              <span className="text-yellow-400">м²</span>
            </div>

            <div className="bg-yellow-400 px-5 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="Calculator" size={18} className="text-black" />
                <span className="text-black font-bold text-xl">{calculatePrice()}₽</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button 
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold"
              onClick={() => window.location.href = 'tel:+79141965172'}
            >
              <Icon name="Phone" size={18} />
              <span className="hidden xl:inline ml-2">+7 (914) 196-51-72</span>
            </Button>
            
            <Button 
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold hidden lg:flex"
              onClick={() => setIsConsultationOpen(!isConsultationOpen)}
            >
              <Icon name="MessageCircle" size={18} />
              <span className="ml-2">Консультация</span>
            </Button>
            
            <Button 
              className="bg-white text-black hover:bg-gray-100 font-semibold hidden lg:flex"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Записаться
            </Button>
          </div>
        </div>

        <div className="lg:hidden mt-3 flex items-center gap-2">
          <div className="flex-1 bg-white/10 px-3 py-2 rounded-lg border border-yellow-400/50 flex items-center gap-2">
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger className="flex-1 border-0 bg-transparent text-white text-sm">
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
              className="h-6 w-6 p-0 text-yellow-400 hover:text-yellow-300"
              onClick={onInfoClick}
            >
              <Icon name="Info" size={14} />
            </Button>
          </div>
          
          <div className="bg-white/10 px-3 py-2 rounded-lg border border-yellow-400/50 flex items-center gap-2">
            <Input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              min="20"
              max="500"
              className="w-14 border-0 bg-transparent text-white text-center text-sm"
            />
            <span className="text-yellow-400 text-sm">м²</span>
          </div>

          <div className="bg-yellow-400 px-3 py-2 rounded-lg">
            <span className="text-black font-bold">{calculatePrice()}₽</span>
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