import Icon from '@/components/ui/icon';

interface StatsCardsProps {
  todayCount: number;
  upcomingCount: number;
  completedCount: number;
}

const StatsCards = ({ todayCount, upcomingCount, completedCount }: StatsCardsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-2 border-blue-500 rounded-lg p-6">
        <Icon name="Calendar" size={32} className="text-blue-400 mb-2" />
        <div className="text-3xl font-bold text-white">{todayCount}</div>
        <div className="text-sm text-gray-300">Заданий на сегодня</div>
      </div>
      <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-2 border-yellow-500 rounded-lg p-6">
        <Icon name="Clock" size={32} className="text-yellow-400 mb-2" />
        <div className="text-3xl font-bold text-white">{upcomingCount}</div>
        <div className="text-sm text-gray-300">Предстоящих заданий</div>
      </div>
      <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-2 border-green-500 rounded-lg p-6">
        <Icon name="CheckCircle" size={32} className="text-green-400 mb-2" />
        <div className="text-3xl font-bold text-white">{completedCount}</div>
        <div className="text-sm text-gray-300">Выполнено всего</div>
      </div>
    </div>
  );
};

export default StatsCards;
