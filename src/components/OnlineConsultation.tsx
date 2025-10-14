import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const OnlineConsultation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const { toast } = useToast();

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
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="Онлайн консультация"
      >
        <Icon name={isOpen ? "X" : "MessageCircle"} size={28} />
      </Button>

      {isOpen && (
        <div className="fixed bottom-44 right-8 z-50 w-96 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="Headphones" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Онлайн консультация</h3>
                <p className="text-xs text-white/90">Ответим на все вопросы</p>
              </div>
            </div>
          </div>

          <div className="p-4 max-h-[400px] overflow-y-auto">
            {!isStarted ? (
              <div className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Здравствуйте! 👋 Оставьте свои контакты, и наш консультант свяжется с вами для ответов на все вопросы.
                </p>
                
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
                    placeholder="+7 (999) 123-45-67"
                    type="tel"
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={handleStart}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                >
                  Начать консультацию
                  <Icon name="Send" className="ml-2" size={18} />
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Icon name="User" size={18} className="text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-green-600 font-semibold">Консультант</p>
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
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
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
                      setIsOpen(false);
                    }}
                    className="text-green-600 hover:text-green-700"
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
    </>
  );
};

export default OnlineConsultation;
