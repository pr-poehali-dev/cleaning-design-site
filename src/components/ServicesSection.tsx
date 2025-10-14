import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Service } from '@/data/servicesData';

interface ServicesSectionProps {
  services: Service[];
  onServiceClick: (service: Service) => void;
}

const ServicesSection = ({ services, onServiceClick }: ServicesSectionProps) => {
  return (
    <section id="services" className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Наши услуги
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Выберите идеальное решение для вашего пространства
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.id}
              className="group relative overflow-hidden p-8 hover:shadow-glow transition-all duration-500 border-2 border-gray-100 hover:border-primary/50 flex flex-col bg-white animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-primary/20 to-accent/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Icon name={service.icon as any} size={36} className="text-primary" />
                </div>
                
                <h3 className="font-heading text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                
                <div className="mb-6">
                  <span className="text-sm text-gray-500">от</span>
                  <p className="text-4xl font-bold gradient-text inline-block ml-2">
                    {service.price.toLocaleString('ru-RU')}₽
                  </p>
                  <p className="text-sm text-gray-500 mt-1">за 50 м²</p>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {service.description}
                </p>
                
                <Button 
                  variant="outline" 
                  className="mt-auto w-full border-2 border-primary/30 text-primary hover:bg-primary hover:text-white font-semibold group/btn transition-all"
                  onClick={() => onServiceClick(service)}
                >
                  Подробнее
                  <Icon name="ArrowRight" className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
