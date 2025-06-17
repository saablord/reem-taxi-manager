
import React, { useState, useEffect } from 'react';
import { useTaxi, Driver } from '../contexts/TaxiContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Save, RotateCcw } from 'lucide-react';

interface DriverFormProps {
  driver?: Driver | null;
  onClose: () => void;
}

const DriverForm: React.FC<DriverFormProps> = ({ driver, onClose }) => {
  const { addDriver, updateDriver } = useTaxi();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    if (driver) {
      setFormData({
        name: driver.name,
        phone: driver.phone,
      });
    }
  }, [driver]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال اسم السائق",
        variant: "destructive",
      });
      return;
    }

    if (driver) {
      updateDriver(driver.id, formData);
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث بيانات السائق بنجاح",
      });
    } else {
      addDriver(formData);
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم إضافة السائق الجديد بنجاح",
      });
    }
    
    onClose();
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Driver Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-right">اسم السائق *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="أدخل اسم السائق"
            className="text-right"
          />
        </div>

        {/* Driver Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-right">رقم الهاتف</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="أدخل رقم الهاتف"
            className="text-right"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between space-x-4 space-x-reverse">
        <div className="flex space-x-4 space-x-reverse">
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            <Save className="ml-2" size={16} />
            {driver ? 'تحديث' : 'إضافة'}
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

export default DriverForm;
