import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Service } from '@/data/servicesData';

interface PriceCalculatorProps {
  serviceType: string;
  setServiceType: (type: string) => void;
  area: string;
  setArea: (area: string) => void;
  services: Service[];
  calculatePrice: () => number;
}

const PriceCalculator = ({
  serviceType,
  setServiceType,
  area,
  setArea,
  services,
  calculatePrice,
}: PriceCalculatorProps) => {
  return (
    <section id="calculator" className="py-24 px-4 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(77,209,194,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(184,169,255,0.15),transparent_50%)]"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Калькулятор стоимости
          </h2>
          <p className="text-gray-300 text-lg">
            Узнайте точную стоимость уборки за 30 секунд
          </p>
        </div>
        
        <Card className="glass-effect p-10 shadow-glow border-2 border-primary/20 backdrop-blur-2xl">
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <Label htmlFor="service" className="text-lg font-semibold mb-3 block text-white flex items-center gap-2">
                <Icon name="ListChecks" size={20} className="text-primary" />
                Тип уборки
              </Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger id="service" className="h-14 text-lg border-2 border-primary/30 bg-white/10 text-white backdrop-blur-xl">
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
              <Label htmlFor="area" className="text-lg font-semibold mb-3 block text-white flex items-center gap-2">
                <Icon name="Maximize2" size={20} className="text-primary" />
                Площадь: <span className="text-primary">{area} м²</span>
              </Label>
              <div className="pt-4">
                <Slider 
                  value={[parseInt(area)]} 
                  onValueChange={(v) => setArea(v[0].toString())}
                  min={20}
                  max={500}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>20 м²</span>
                  <span>500 м²</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-50"></div>
            <div className="relative bg-gradient-to-r from-primary to-accent p-8 rounded-3xl text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Icon name="Calculator" size={24} className="text-white" />
                <p className="text-lg font-semibold text-white">Стоимость уборки</p>
              </div>
              <p className="text-6xl md:text-7xl font-bold font-heading text-white">
                {calculatePrice().toLocaleString('ru-RU')} ₽
              </p>
              <p className="text-sm text-white/80 mt-2">Финальная цена может отличаться после осмотра</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default PriceCalculator;
