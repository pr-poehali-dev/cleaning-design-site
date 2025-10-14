import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PriceCalculator from '@/components/PriceCalculator';
import BookingForm from '@/components/BookingForm';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ServiceModal from '@/components/ServiceModal';
import ScrollToTop from '@/components/ScrollToTop';
import OnlineConsultation from '@/components/OnlineConsultation';
import { services, additionalServices, Service } from '@/data/servicesData';

const Index = () => {
  const [area, setArea] = useState('50');
  const [serviceType, setServiceType] = useState('basic');
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalArea, setModalArea] = useState('50');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const calculatePrice = () => {
    const basePrice = services.find(s => s.id === serviceType)?.price || 10000;
    const areaMultiplier = parseInt(area) / 50;
    return Math.round(basePrice * areaMultiplier);
  };

  const openServiceModal = (service: Service) => {
    setSelectedService(service);
    setModalArea('50');
    setSelectedAddons([]);
    setIsServiceModalOpen(true);
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const calculateModalPrice = () => {
    if (!selectedService) return 0;
    const basePrice = selectedService.price;
    const areaMultiplier = parseInt(modalArea) / 50;
    const servicePrice = Math.round(basePrice * areaMultiplier);
    
    const addonsPrice = selectedAddons.reduce((sum, addonId) => {
      const addon = additionalServices.find(a => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);
    
    return servicePrice + addonsPrice;
  };

  return (
    <div className="min-h-screen">
      <Header
        serviceType={serviceType}
        setServiceType={setServiceType}
        area={area}
        setArea={setArea}
        services={services}
        calculatePrice={calculatePrice}
        onInfoClick={() => openServiceModal(services.find(s => s.id === serviceType)!)}
      />
      
      <HeroSection />
      
      <ServicesSection
        services={services}
        onServiceClick={openServiceModal}
      />
      
      <PriceCalculator
        serviceType={serviceType}
        setServiceType={setServiceType}
        area={area}
        setArea={setArea}
        services={services}
        calculatePrice={calculatePrice}
      />
      
      <BookingForm />
      
      <ContactSection />
      
      <Footer />

      <ServiceModal
        isOpen={isServiceModalOpen}
        onOpenChange={setIsServiceModalOpen}
        selectedService={selectedService}
        modalArea={modalArea}
        setModalArea={setModalArea}
        selectedAddons={selectedAddons}
        toggleAddon={toggleAddon}
        additionalServices={additionalServices}
        calculateModalPrice={calculateModalPrice}
      />

      <ScrollToTop />
      <OnlineConsultation />
    </div>
  );
};

export default Index;