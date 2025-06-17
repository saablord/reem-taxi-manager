
import React from 'react';
import { useTaxi } from '../contexts/TaxiContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Phone, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DriversListProps {
  onEditDriver: (driver: any) => void;
}

const DriversList: React.FC<DriversListProps> = ({ onEditDriver }) => {
  const { drivers, deleteDriver } = useTaxi();

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من حذف السائق ${name}؟`)) {
      deleteDriver(id);
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف السائق بنجاح",
      });
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gray-50">
        <CardTitle>قائمة السائقين ({drivers.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {drivers.map((driver) => (
            <div key={driver.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <User size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {driver.name}
                    </h3>
                    {driver.phone && (
                      <div className="flex items-center space-x-2 space-x-reverse text-gray-600 mt-1">
                        <Phone size={16} />
                        <span>{driver.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 space-x-reverse">
                  <Button
                    onClick={() => onEditDriver(driver)}
                    size="sm"
                    variant="outline"
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Edit size={16} />
                    تعديل
                  </Button>
                  <Button
                    onClick={() => handleDelete(driver.id, driver.name)}
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                    حذف
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DriversList;
