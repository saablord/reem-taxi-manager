
import React from 'react';
import { useTaxi } from '../contexts/TaxiContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Phone, MapPin, Clock, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TripsListProps {
  onEditTrip: (trip: any) => void;
}

const TripsList: React.FC<TripsListProps> = ({ onEditTrip }) => {
  const { trips, deleteTrip } = useTaxi();

  const handleDelete = (id: string, customerName: string) => {
    if (window.confirm(`هل أنت متأكد من حذف رحلة ${customerName}؟`)) {
      deleteTrip(id);
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف الرحلة بنجاح",
      });
    }
  };

  if (trips.length === 0) {
    return (
      <Card className="shadow-md">
        <CardContent className="p-8 text-center">
          <p className="text-gray-500 text-lg">لا توجد رحلات مسجلة بعد</p>
          <p className="text-gray-400 mt-2">قم بإضافة رحلة جديدة للبدء</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gray-50">
        <CardTitle>قائمة الرحلات ({trips.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {trips.map((trip) => (
            <div key={trip.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  {/* Main Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {trip.driverName}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {trip.customerName}
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                        <MapPin size={16} />
                        <span>{trip.destination}</span>
                      </div>
                      {trip.customerPhone && (
                        <div className="flex items-center space-x-2 space-x-reverse text-gray-600">
                          <Phone size={16} />
                          <span>{trip.customerPhone}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-green-600">
                        {trip.price} ريال
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Calendar size={14} />
                          <span>{trip.departureDate}</span>
                        </div>
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Clock size={14} />
                          <span>{trip.departureTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {trip.notes && (
                    <div className="bg-yellow-50 p-3 rounded-lg border-r-4 border-yellow-400">
                      <p className="text-gray-700">{trip.notes}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 space-x-reverse mr-4">
                  <Button
                    onClick={() => onEditTrip(trip)}
                    size="sm"
                    variant="outline"
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    onClick={() => handleDelete(trip.id, trip.customerName)}
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
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

export default TripsList;
