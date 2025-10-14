import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

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
  return (
    <header className="bg-black/80 backdrop-blur-lg border-b-2 border-yellow-400/30 sticky top-0 z-50 py-3 px-4 shadow-xl">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-3 lg:mb-0">
          <div>
            <h2 className="font-heading text-2xl lg:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Beauty & Clean
            </h2>
          </div>
          <Button 
            className="lg:hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold px-4 rounded-xl"
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Записаться
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-4">
          <div className="w-full lg:w-auto flex items-center gap-2">
            <div className="flex-1 lg:flex-none bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-sm px-4 py-3 rounded-xl border-2 border-yellow-400/50 shadow-lg flex items-center gap-2">
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
            
            <div className="flex-1 lg:flex-none bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur-sm px-4 py-3 rounded-xl border-2 border-yellow-400/50 shadow-lg flex items-center gap-2">
              <Input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                min="20"
                max="500"
                className="w-full lg:w-20 h-9 border-0 bg-transparent text-white text-center font-medium"
              />
              <span className="text-yellow-400 font-semibold">м²</span>
            </div>
          </div>
          
          <div className="w-full lg:w-auto flex items-center gap-3">
            <div className="flex-1 lg:flex-none bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-3 rounded-xl shadow-2xl border-2 border-yellow-300">
              <div className="flex items-center justify-center gap-2">
                <Icon name="Calculator" size={20} className="text-black" />
                <span className="text-black font-bold text-xl lg:text-2xl">{calculatePrice()}₽</span>
              </div>
            </div>
            
            <Button 
              className="hidden lg:block bg-white text-black hover:bg-gray-100 font-semibold px-8 py-6 rounded-xl shadow-lg"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Записаться
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
