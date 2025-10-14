import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Service, AdditionalService } from '@/data/servicesData';

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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-3xl font-heading">
            <div className="bg-gradient-to-br from-primary/30 to-accent/30 w-16 h-16 rounded-2xl flex items-center justify-center">
              <Icon name={selectedService?.icon as any} size={32} className="text-primary" />
            </div>
            {selectedService?.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="glass-effect p-6 rounded-2xl border-2 border-primary/20">
            <p className="text-gray-700 text-lg leading-relaxed">{selectedService?.description}</p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
              <Icon name="CheckCircle" size={24} className="text-primary" />
              Что включено:
            </h4>
            <div className="grid gap-3">
              {selectedService?.includes?.map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-3 glass-effect p-4 rounded-xl border border-primary/10">
                  <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-primary/20 pt-6">
            <h4 className="font-heading font-bold text-2xl mb-6 flex items-center gap-2 gradient-text">
              <Icon name="Calculator" size={24} />
              Рассчитать стоимость
            </h4>
            
            <div className="space-y-6">
              <div className="glass-effect p-6 rounded-2xl border-2 border-primary/20">
                <Label className="text-lg font-semibold mb-4 block flex items-center gap-2">
                  <Icon name="Maximize2" size={20} className="text-primary" />
                  Площадь помещения: <span className="text-primary">{modalArea} м²</span>
                </Label>
                <Slider 
                  value={[parseInt(modalArea)]} 
                  onValueChange={(v) => setModalArea(v[0].toString())}
                  min={20}
                  max={500}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>20 м²</span>
                  <span>500 м²</span>
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block flex items-center gap-2">
                  <Icon name="Plus" size={20} className="text-primary" />
                  Дополнительные услуги:
                </Label>
                <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2">
                  {['Уборка', 'Чистка', 'Обработка'].map((category) => (
                    <div key={category}>
                      <h5 className="text-sm font-bold text-gray-700 uppercase mb-3 flex items-center gap-2">
                        <Icon name={category === 'Уборка' ? 'Home' : category === 'Чистка' ? 'Sparkles' : 'Shield'} size={16} className="text-primary" />
                        {category}
                      </h5>
                      <div className="space-y-2">
                        {additionalServices
                          .filter((addon) => addon.category === category)
                          .map((addon) => (
                            <div key={addon.id} className="flex items-start gap-3 p-4 rounded-xl hover:bg-primary/5 transition-all border-2 border-gray-100 hover:border-primary/30">
                              <Checkbox
                                id={`addon-${addon.id}`}
                                checked={selectedAddons.includes(addon.id)}
                                onCheckedChange={() => toggleAddon(addon.id)}
                                className="mt-1"
                              />
                              <label
                                htmlFor={`addon-${addon.id}`}
                                className="flex-1 cursor-pointer"
                              >
                                <div className="flex justify-between items-start gap-2">
                                  <span className="font-medium text-gray-900">{addon.name}</span>
                                  <span className="font-bold text-primary whitespace-nowrap">+{addon.price.toLocaleString()}₽</span>
                                </div>
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl blur-xl opacity-50"></div>
                <div className="relative bg-gradient-to-r from-primary to-accent p-8 rounded-2xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-white/80 mb-2">Итоговая стоимость</p>
                      <p className="text-5xl font-bold font-heading text-white">{calculateModalPrice().toLocaleString('ru-RU')}₽</p>
                    </div>
                    <Icon name="Sparkles" size={48} className="text-white/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow text-white font-bold text-lg py-7 rounded-xl group transition-all"
            onClick={() => {
              onOpenChange(false);
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Записаться на эту услугу
            <Icon name="ArrowRight" className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
