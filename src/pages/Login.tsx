import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/cbe5600c-ad2e-4510-857f-ad0cc70d5411', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        toast({
          title: 'Вход выполнен',
          description: `Добро пожаловать, ${data.user.full_name}!`,
        });

        if (data.user.role === 'admin') {
          navigate('/admin');
        } else if (data.user.role === 'senior_cleaner') {
          navigate('/senior-cleaner');
        } else {
          navigate('/maid');
        }
      } else {
        toast({
          title: 'Ошибка входа',
          description: data.error || 'Неверный email или пароль',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось подключиться к серверу',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center px-3 py-4 sm:px-4 sm:py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-4 shadow-lg shadow-yellow-500/50">
            <Icon name="Sparkles" size={32} className="text-black sm:w-10 sm:h-10" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent mb-2">
            p9 clean
          </h1>
          <p className="text-sm sm:text-base text-gray-400">Личный кабинет персонала</p>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 sm:p-8 border border-gray-700/50 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base font-semibold mb-2 flex items-center gap-2">
                <Icon name="Mail" size={18} className="text-yellow-400" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ваш@email.ru"
                className="h-12 sm:h-14 bg-gray-700/50 border-gray-600 text-white text-base sm:text-lg rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                autoComplete="email"
                inputMode="email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base font-semibold mb-2 flex items-center gap-2">
                <Icon name="Lock" size={18} className="text-yellow-400" />
                Пароль
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 sm:h-14 bg-gray-700/50 border-gray-600 text-white text-base sm:text-lg rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all"
                autoComplete="current-password"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 sm:h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-bold text-base sm:text-lg rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Icon name="Loader2" size={22} className="animate-spin mr-2" />
                  <span>Вход...</span>
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={22} className="mr-2" />
                  <span>Войти в систему</span>
                </>
              )}
            </Button>
          </form>

          <div className="mt-5 sm:mt-6 pt-4 border-t border-gray-700/50">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="w-full text-gray-400 hover:text-yellow-400 text-sm sm:text-base h-11 sm:h-12 rounded-xl hover:bg-gray-700/50 transition-all"
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Вернуться на главную
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;