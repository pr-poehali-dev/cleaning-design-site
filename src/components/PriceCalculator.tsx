import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Service {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
  includes: string[];
}

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
  );
};

export default PriceCalculator;
