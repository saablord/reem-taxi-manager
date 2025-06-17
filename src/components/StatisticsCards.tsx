
import React from 'react';
import { useTaxi } from '../contexts/TaxiContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Calendar, DollarSign, Users } from 'lucide-react';

const StatisticsCards: React.FC = () => {
  const { trips, drivers } = useTaxi();

  const today = new Date().toISOString().slice(0, 10);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const currentYear = new Date().getFullYear().toString();

  const todayTrips = trips.filter(trip => trip.departureDate === today);
  const monthTrips = trips.filter(trip => trip.departureDate.startsWith(currentMonth));
  const yearTrips = trips.filter(trip => trip.departureDate.startsWith(currentYear));

  const todayRevenue = todayTrips.reduce((sum, trip) => sum + trip.price, 0);
  const monthRevenue = monthTrips.reduce((sum, trip) => sum + trip.price, 0);
  const yearRevenue = yearTrips.reduce((sum, trip) => sum + trip.price, 0);

  const driverStats = drivers.map(driver => {
    const driverTrips = trips.filter(trip => trip.driverName === driver.name);
    const driverRevenue = driverTrips.reduce((sum, trip) => sum + trip.price, 0);
    return {
      name: driver.name,
      trips: driverTrips.length,
      revenue: driverRevenue,
    };
  }).sort((a, b) => b.trips - a.trips);

  const topDriver = driverStats[0];

  const statsCards = [
    {
      title: 'رحلات اليوم',
      value: todayTrips.length.toString(),
      icon: Car,
      color: 'bg-blue-600',
      revenue: `${todayRevenue} ريال`,
    },
    {
      title: 'رحلات الشهر',
      value: monthTrips.length.toString(),
      icon: Calendar,
      color: 'bg-green-600',
      revenue: `${monthRevenue} ريال`,
    },
    {
      title: 'رحلات السنة',
      value: yearTrips.length.toString(),
      icon: Calendar,
      color: 'bg-purple-600',
      revenue: `${yearRevenue} ريال`,
    },
    {
      title: 'أفضل سائق',
      value: topDriver ? topDriver.name : 'لا يوجد',
      icon: Users,
      color: 'bg-amber-600',
      revenue: topDriver ? `${topDriver.trips} رحلة` : '',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`${stat.color} text-white p-2 rounded-full`}>
              <stat.icon size={20} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {stat.value}
            </div>
            {stat.revenue && (
              <p className="text-sm text-gray-600">{stat.revenue}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCards;
