
import React from 'react';
import { useTaxi } from '../contexts/TaxiContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const StatisticsCharts: React.FC = () => {
  const { trips, drivers } = useTaxi();

  // Monthly trips data
  const last6Months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = date.toISOString().slice(0, 7);
    const monthName = date.toLocaleDateString('ar', { month: 'long', year: 'numeric' });
    const monthTrips = trips.filter(trip => trip.departureDate.startsWith(monthKey));
    const monthRevenue = monthTrips.reduce((sum, trip) => sum + trip.price, 0);
    
    last6Months.push({
      month: monthName,
      trips: monthTrips.length,
      revenue: monthRevenue,
    });
  }

  // Driver performance data
  const driverData = drivers.map(driver => {
    const driverTrips = trips.filter(trip => trip.driverName === driver.name);
    const driverRevenue = driverTrips.reduce((sum, trip) => sum + trip.price, 0);
    return {
      name: driver.name,
      trips: driverTrips.length,
      revenue: driverRevenue,
    };
  }).filter(driver => driver.trips > 0);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Trips Chart */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>إحصائيات الرحلات الشهرية</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={last6Months}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  value, 
                  name === 'trips' ? 'عدد الرحلات' : 'الإيرادات (ريال)'
                ]}
                labelFormatter={(label) => `الشهر: ${label}`}
              />
              <Bar dataKey="trips" fill="#3B82F6" name="trips" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Driver Performance Chart */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>أداء السائقين</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={driverData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, trips }) => `${name}: ${trips}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="trips"
              >
                {driverData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [value, 'عدد الرحلات']}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCharts;
