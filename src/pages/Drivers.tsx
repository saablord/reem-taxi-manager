
import React, { useState } from 'react';
import { useTaxi } from '../contexts/TaxiContext';
import DriverForm from '../components/DriverForm';
import DriversList from '../components/DriversList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Users } from 'lucide-react';

const Drivers: React.FC = () => {
  const { drivers } = useTaxi();
  const [showForm, setShowForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  const handleNewDriver = () => {
    setEditingDriver(null);
    setShowForm(true);
  };

  const handleEditDriver = (driver: any) => {
    setEditingDriver(driver);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingDriver(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="bg-amber-500 text-white p-3 rounded-full">
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">إدارة السائقين</h1>
            <p className="text-gray-600">إضافة وإدارة سائقي التاكسي</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-blue-600 text-white px-6 py-3 rounded-lg">
          <span className="text-lg font-bold">عدد السائقين: {drivers.length}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 space-x-reverse">
        <Button 
          onClick={handleNewDriver}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
        >
          <Plus className="ml-2" size={20} />
          إضافة سائق جديد
        </Button>
      </div>

      {/* Driver Form */}
      {showForm && (
        <Card className="shadow-lg border-2 border-amber-200">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-blue-600 text-white">
            <CardTitle>
              {editingDriver ? 'تعديل السائق' : 'إضافة سائق جديد'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <DriverForm 
              driver={editingDriver} 
              onClose={handleCloseForm}
            />
          </CardContent>
        </Card>
      )}

      {/* Drivers List */}
      <DriversList onEditDriver={handleEditDriver} />
    </div>
  );
};

export default Drivers;
