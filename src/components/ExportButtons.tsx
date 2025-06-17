
import React, { useState } from 'react';
import { useTaxi } from '../contexts/TaxiContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Download, Calendar, FileSpreadsheet, Calculator } from 'lucide-react';

const ExportButtons: React.FC = () => {
  const { trips, drivers } = useTaxi();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      toast({
        title: "لا توجد بيانات للتصدير",
        description: "لا توجد بيانات متاحة في النطاق المحدد",
        variant: "destructive",
      });
      return;
    }

    const headers = Object.keys(data[0]).join(',');
    const csvContent = [
      headers,
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "تم التصدير بنجاح",
      description: `تم تصدير البيانات إلى ملف ${filename}.csv`,
    });
  };

  const calculateDayRevenue = () => {
    const dayTrips = trips.filter(trip => trip.departureDate === selectedDate);
    const totalRevenue = dayTrips.reduce((sum, trip) => sum + trip.price, 0);
    
    toast({
      title: "إجمالي إيرادات اليوم",
      description: `التاريخ: ${selectedDate}\nعدد الرحلات: ${dayTrips.length}\nالإجمالي: ${totalRevenue} ريال`,
    });
  };

  const calculatePeriodRevenue = () => {
    if (!startDate || !endDate) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى تحديد تاريخ البداية والنهاية",
        variant: "destructive",
      });
      return;
    }

    const periodTrips = trips.filter(trip => 
      trip.departureDate >= startDate && trip.departureDate <= endDate
    );
    const totalRevenue = periodTrips.reduce((sum, trip) => sum + trip.price, 0);
    
    toast({
      title: "إجمالي إيرادات الفترة",
      description: `من: ${startDate} إلى: ${endDate}\nعدد الرحلات: ${periodTrips.length}\nالإجمالي: ${totalRevenue} ريال`,
    });
  };

  const calculateDriverDayRevenue = () => {
    const dayTrips = trips.filter(trip => trip.departureDate === selectedDate);
    const driverRevenue = drivers.map(driver => {
      const driverDayTrips = dayTrips.filter(trip => trip.driverName === driver.name);
      const revenue = driverDayTrips.reduce((sum, trip) => sum + trip.price, 0);
      return {
        name: driver.name,
        trips: driverDayTrips.length,
        revenue: revenue,
      };
    }).filter(driver => driver.trips > 0);

    let message = `إيرادات السائقين ليوم ${selectedDate}:\n`;
    driverRevenue.forEach(driver => {
      message += `${driver.name}: ${driver.trips} رحلة - ${driver.revenue} ريال\n`;
    });

    toast({
      title: "إيرادات السائقين اليومية",
      description: message,
    });
  };

  const calculateDriverPeriodRevenue = () => {
    if (!startDate || !endDate) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى تحديد تاريخ البداية والنهاية",
        variant: "destructive",
      });
      return;
    }

    const periodTrips = trips.filter(trip => 
      trip.departureDate >= startDate && trip.departureDate <= endDate
    );
    
    const driverRevenue = drivers.map(driver => {
      const driverPeriodTrips = periodTrips.filter(trip => trip.driverName === driver.name);
      const revenue = driverPeriodTrips.reduce((sum, trip) => sum + trip.price, 0);
      return {
        name: driver.name,
        trips: driverPeriodTrips.length,
        revenue: revenue,
      };
    }).filter(driver => driver.trips > 0);

    let message = `إيرادات السائقين من ${startDate} إلى ${endDate}:\n`;
    driverRevenue.forEach(driver => {
      message += `${driver.name}: ${driver.trips} رحلة - ${driver.revenue} ريال\n`;
    });

    toast({
      title: "إيرادات السائقين للفترة",
      description: message,
    });
  };

  const exportDailyTrips = () => {
    const dayTrips = trips.filter(trip => trip.departureDate === selectedDate);
    const exportData = dayTrips.map(trip => ({
      'اسم الزبون': trip.customerName,
      'اسم السائق': trip.driverName,
      'المكان': trip.destination,
      'السعر': trip.price,
      'ساعة الذهاب': trip.departureTime,
      'تاريخ الذهاب': trip.departureDate,
      'رقم الهاتف': trip.customerPhone,
      'ملاحظات': trip.notes,
    }));

    exportToCSV(exportData, `رحلات_${selectedDate}`);
  };

  const exportAllTrips = () => {
    const exportData = trips.map(trip => ({
      'اسم الزبون': trip.customerName,
      'اسم السائق': trip.driverName,
      'المكان': trip.destination,
      'السعر': trip.price,
      'ساعة الذهاب': trip.departureTime,
      'تاريخ الذهاب': trip.departureDate,
      'رقم الهاتف': trip.customerPhone,
      'ملاحظات': trip.notes,
      'تاريخ الإنشاء': trip.createdAt,
    }));

    exportToCSV(exportData, 'جميع_الرحلات');
  };

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <Card className="shadow-lg">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <Calendar size={20} />
            <span>تحديد التواريخ</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="selectedDate">تاريخ محدد</Label>
              <Input
                id="selectedDate"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">تاريخ البداية</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">تاريخ النهاية</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculation Buttons */}
      <Card className="shadow-lg">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <Calculator size={20} />
            <span>حساب الإيرادات</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={calculateDayRevenue}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Calculator className="ml-2" size={16} />
              حساب مبلغ الرحلات في اليوم
            </Button>
            <Button 
              onClick={calculatePeriodRevenue}
              className="bg-green-600 hover:bg-green-700"
            >
              <Calculator className="ml-2" size={16} />
              حساب المبلغ بين تاريخين
            </Button>
            <Button 
              onClick={calculateDriverDayRevenue}
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Calculator className="ml-2" size={16} />
              حساب مبلغ كل سائق في اليوم
            </Button>
            <Button 
              onClick={calculateDriverPeriodRevenue}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Calculator className="ml-2" size={16} />
              حساب مبلغ كل سائق بين تاريخين
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export Buttons */}
      <Card className="shadow-lg">
        <CardHeader className="bg-amber-50">
          <CardTitle className="flex items-center space-x-2 space-x-reverse">
            <FileSpreadsheet size={20} />
            <span>تصدير البيانات</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={exportDailyTrips}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Download className="ml-2" size={16} />
              تصدير رحلات اليوم
            </Button>
            <Button 
              onClick={exportAllTrips}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Download className="ml-2" size={16} />
              تصدير كافة البيانات
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportButtons;
