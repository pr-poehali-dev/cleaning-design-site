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
    <header className="bg-black border-b border-yellow-400/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          <h2 className="font-heading text-2xl font-bold text-yellow-400 shrink-0">
            p9&clean
          </h2>

          <div className="hidden lg:flex items-center gap-3 flex-1 justify-end">
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

            <Button 
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold"
              onClick={() => window.location.href = 'tel:+79141965172'}
            >
              <Icon name="Phone" size={18} />
              <span className="ml-2">+7 (914) 196-51-72</span>
            </Button>
          </div>

          <Button 
            className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold lg:hidden"
            onClick={() => window.location.href = 'tel:+79141965172'}
          >
            <Icon name="Phone" size={18} />
          </Button>
        </div>

        <div className="lg:hidden mt-3 flex flex-wrap items-center gap-2">
          <div className="flex-1 min-w-[120px] bg-white/10 px-3 py-2 rounded-lg border border-yellow-400/50 flex items-center gap-2">
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
            <div className="flex items-center gap-2">
              <Icon name="Calculator" size={16} className="text-black" />
              <span className="text-black font-bold">{calculatePrice()}₽</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
