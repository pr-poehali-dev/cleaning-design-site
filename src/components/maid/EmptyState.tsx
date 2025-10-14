import Icon from '@/components/ui/icon';

const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <Icon name="Inbox" size={64} className="text-gray-600 mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-gray-400 mb-2">Нет заданий</h3>
      <p className="text-gray-500">Пока что вам не назначено ни одного задания</p>
    </div>
  );
};

export default EmptyState;
