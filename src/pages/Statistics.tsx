
import React from 'react';
import { useTaxi } from '../contexts/TaxiContext';
import StatisticsCards from '../components/StatisticsCards';
import StatisticsCharts from '../components/StatisticsCharts';
import ExportButtons from '../components/ExportButtons';
import { BarChart3 } from 'lucide-react';

const Statistics: React.FC = () => {
  const { trips } = useTaxi();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="bg-green-600 text-white p-3 rounded-full">
            <BarChart3 size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">الإحصائيات والتقارير</h1>
            <p className="text-gray-600">عرض إحصائيات الرحلات والسائقين</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <StatisticsCards />

      {/* Charts */}
      <StatisticsCharts />

      {/* Export Buttons */}
      <ExportButtons />
    </div>
  );
};

export default Statistics;
