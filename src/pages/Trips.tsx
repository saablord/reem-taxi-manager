
import React, { useState } from 'react';
import { useTaxi } from '../contexts/TaxiContext';
import TripForm from '../components/TripForm';
import TripsList from '../components/TripsList';
import SearchTrips from '../components/SearchTrips';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Car } from 'lucide-react';

const Trips: React.FC = () => {
  const { trips } = useTaxi();
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  const handleNewTrip = () => {
    setEditingTrip(null);
    setShowForm(true);
  };

  const handleEditTrip = (trip: any) => {
    setEditingTrip(trip);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTrip(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="bg-blue-600 text-white p-3 rounded-full">
            <Car size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">إدارة الرحلات</h1>
            <p className="text-gray-600">إضافة وإدارة رحلات التاكسي</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-amber-500 text-white px-6 py-3 rounded-lg">
          <span className="text-lg font-bold">إجمالي الرحلات: {trips.length}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 space-x-reverse">
        <Button 
          onClick={handleNewTrip}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          <Plus className="ml-2" size={20} />
          رحلة جديدة
        </Button>
      </div>

      {/* Trip Form */}
      {showForm && (
        <Card className="shadow-lg border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-amber-500 text-white">
            <CardTitle>
              {editingTrip ? 'تعديل الرحلة' : 'إضافة رحلة جديدة'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <TripForm 
              trip={editingTrip} 
              onClose={handleCloseForm}
            />
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <SearchTrips />

      {/* Trips List */}
      <TripsList onEditTrip={handleEditTrip} />
    </div>
  );
};

export default Trips;
