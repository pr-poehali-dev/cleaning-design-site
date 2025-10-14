import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface Service {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
  includes: string[];
}

interface AdditionalService {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface ServiceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedService: Service | null;
  modalArea: string;
  setModalArea: (area: string) => void;
  selectedAddons: string[];
  toggleAddon: (addonId: string) => void;
  additionalServices: AdditionalService[];
  calculateModalPrice: () => number;
}

const ServiceModal = ({
  isOpen,
  onOpenChange,
  selectedService,
  modalArea,
  setModalArea,
  selectedAddons,
  toggleAddon,
  additionalServices,
  calculateModalPrice,
}: ServiceModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="bg-yellow-50 w-12 h-12 rounded-full flex items-center justify-center">
              <Icon name={selectedService?.icon as any} size={24} className="text-yellow-600" />
            </div>
            {selectedService?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 overflow-y-auto pr-2">
          <div>
            <p className="text-gray-600 mb-4">{selectedService?.description}</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Icon name="CheckCircle" size={20} className="text-yellow-600" />
              Что включено:
            </h4>
            <ul className="space-y-2">
              {selectedService?.includes?.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Icon name="Calculator" size={20} className="text-yellow-600" />
              Рассчитать стоимость:
            </h4>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="modal-area" className="text-sm font-medium mb-2 block">
                  Площадь помещения (м²)
                </Label>
                <Input
                  id="modal-area"
                  type="number"
                  value={modalArea}
                  onChange={(e) => setModalArea(e.target.value)}
                  min="10"
                  max="500"
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Дополнительные услуги:
                </Label>
                <div className="space-y-4">
                  {['Уборка', 'Чистка', 'Обработка'].map((category) => (
                    <div key={category}>
                      <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2 flex items-center gap-2">
                        <Icon name={category === 'Уборка' ? 'Home' : category === 'Чистка' ? 'Sparkles' : 'Shield'} size={14} />
                        {category}
                      </h5>
                      <div className="space-y-2">
                        {additionalServices
                          .filter((addon) => addon.category === category)
                          .map((addon) => (
                            <div key={addon.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                              <Checkbox
                                id={`addon-${addon.id}`}
                                checked={selectedAddons.includes(addon.id)}
                                onCheckedChange={() => toggleAddon(addon.id)}
                                className="mt-0.5"
                              />
                              <label
                                htmlFor={`addon-${addon.id}`}
                                className="flex-1 cursor-pointer"
                              >
                                <div className="flex justify-between items-start gap-2">
                                  <span className="text-sm font-medium text-gray-900">{addon.name}</span>
                                  <span className="text-sm font-semibold text-yellow-600 whitespace-nowrap">+{addon.price}₽</span>
                                </div>
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-6 rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium mb-1 opacity-80">Итоговая стоимость</p>
                    <p className="text-4xl font-bold">{calculateModalPrice().toLocaleString()}₽</p>
                  </div>
                  <Icon name="Sparkles" size={40} className="opacity-50" />
                </div>
              </div>
            </div>
          </div>

        </div>
        
        <div className="flex-shrink-0 pt-4 border-t">
          <Button 
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold py-6"
            onClick={() => {
              onOpenChange(false);
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Записаться на эту услугу
            <Icon name="ArrowRight" className="ml-2" size={20} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;