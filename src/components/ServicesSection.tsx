import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Service {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
  includes: string[];
}

interface ServicesSectionProps {
  services: Service[];
  onServiceClick: (service: Service) => void;
}

const ServicesSection = ({ services, onServiceClick }: ServicesSectionProps) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-4xl font-bold text-center mb-12 text-gray-900">
          Наши услуги
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.id}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-yellow-400 flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-yellow-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Icon name={service.icon as any} size={32} className="text-yellow-600" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2 text-gray-900">{service.name}</h3>
              <p className="text-3xl font-bold text-yellow-600 mb-2">от {service.price}₽</p>
              <p className="text-gray-600 text-sm mb-4">за 50 м²</p>
              <Button 
                variant="outline" 
                className="mt-auto w-full border-yellow-400 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 font-semibold"
                onClick={() => onServiceClick(service)}
              >
                Подробнее
                <Icon name="ArrowRight" className="ml-2" size={16} />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
