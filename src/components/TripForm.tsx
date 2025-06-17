
import React, { useState, useEffect } from 'react';
import { useTaxi, Trip } from '../contexts/TaxiContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Save, RotateCcw } from 'lucide-react';

interface TripFormProps {
  trip?: Trip | null;
  onClose: () => void;
}

const TripForm: React.FC<TripFormProps> = ({ trip, onClose }) => {
  const { drivers, addTrip, updateTrip } = useTaxi();
  const [formData, setFormData] = useState({
    driverName: '',
    customerName: '',
    destination: '',
    price: '',
    departureTime: '',
    departureDate: '',
    customerPhone: '',
    notes: '',
  });

  useEffect(() => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const currentDate = now.toISOString().slice(0, 10);
    
    if (trip) {
      setFormData({
        driverName: trip.driverName,
        customerName: trip.customerName,
        destination: trip.destination,
        price: trip.price.toString(),
        departureTime: trip.departureTime,
        departureDate: trip.departureDate,
        customerPhone: trip.customerPhone,
        notes: trip.notes,
      });
    } else {
      setFormData(prev => ({
        ...prev,
        departureTime: currentTime,
        departureDate: currentDate,
      }));
    }
  }, [trip]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.driverName || !formData.customerName || !formData.destination || !formData.price) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const tripData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    if (trip) {
      updateTrip(trip.id, tripData);
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث بيانات الرحلة بنجاح",
      });
    } else {
      addTrip(tripData);
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم إضافة الرحلة الجديدة بنجاح",
      });
    }
    
    onClose();
  };

  const handleReset = () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const currentDate = now.toISOString().slice(0, 10);
    
    setFormData({
      driverName: '',
      customerName: '',
      destination: '',
      price: '',
      departureTime: currentTime,
      departureDate: currentDate,
      customerPhone: '',
      notes: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Driver Name */}
        <div className="space-y-2">
          <Label htmlFor="driverName" className="text-right">اسم السائق *</Label>
          <Select value={formData.driverName} onValueChange={(value) => setFormData(prev => ({ ...prev, driverName: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="اختر السائق" />
            </SelectTrigger>
            <SelectContent>
              {drivers.map((driver) => (
                <SelectItem key={driver.id} value={driver.name}>
                  {driver.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Customer Name */}
        <div className="space-y-2">
          <Label htmlFor="customerName" className="text-right">اسم الزبون *</Label>
          <Input
            id="customerName"
            value={formData.customerName}
            onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
            placeholder="أدخل اسم الزبون"
            className="text-right"
          />
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-right">مكان الذهاب *</Label>
          <Input
            id="destination"
            value={formData.destination}
            onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
            placeholder="أدخل مكان الذهاب"
            className="text-right"
          />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label htmlFor="price" className="text-right">السعر *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            placeholder="أدخل السعر"
            className="text-right"
          />
        </div>

        {/* Departure Time */}
        <div className="space-y-2">
          <Label htmlFor="departureTime" className="text-right">ساعة الذهاب</Label>
          <Input
            id="departureTime"
            type="time"
            value={formData.departureTime}
            onChange={(e) => setFormData(prev => ({ ...prev, departureTime: e.target.value }))}
            className="text-right"
          />
        </div>

        {/* Departure Date */}
        <div className="space-y-2">
          <Label htmlFor="departureDate" className="text-right">تاريخ الذهاب</Label>
          <Input
            id="departureDate"
            type="date"
            value={formData.departureDate}
            onChange={(e) => setFormData(prev => ({ ...prev, departureDate: e.target.value }))}
            className="text-right"
          />
        </div>

        {/* Customer Phone */}
        <div className="space-y-2">
          <Label htmlFor="customerPhone" className="text-right">رقم هاتف الزبون</Label>
          <Input
            id="customerPhone"
            value={formData.customerPhone}
            onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
            placeholder="أدخل رقم الهاتف"
            className="text-right"
          />
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes" className="text-right">ملاحظات</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="أدخل أي ملاحظات إضافية"
          className="text-right"
          rows={3}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between space-x-4 space-x-reverse">
        <div className="flex space-x-4 space-x-reverse">
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            <Save className="ml-2" size={16} />
            حفظ
          </Button>
          <Button type="button" onClick={handleReset} variant="outline">
            <RotateCcw className="ml-2" size={16} />
            جديد
          </Button>
        </div>
        <Button type="button" onClick={onClose} variant="secondary">
          إلغاء
        </Button>
      </div>
    </form>
  );
};

export default TripForm;
