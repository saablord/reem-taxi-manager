
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Trip {
  id: string;
  driverName: string;
  customerName: string;
  destination: string;
  price: number;
  departureTime: string;
  departureDate: string;
  customerPhone: string;
  notes: string;
  createdAt: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
}

interface TaxiContextType {
  trips: Trip[];
  drivers: Driver[];
  addTrip: (trip: Omit<Trip, 'id' | 'createdAt'>) => void;
  updateTrip: (id: string, trip: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  addDriver: (driver: Omit<Driver, 'id' | 'createdAt'>) => void;
  updateDriver: (id: string, driver: Partial<Driver>) => void;
  deleteDriver: (id: string) => void;
  searchTrips: (query: string) => Trip[];
}

const TaxiContext = createContext<TaxiContextType | undefined>(undefined);

export const TaxiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: '1', name: 'أحمد محمد', phone: '0123456789', createdAt: new Date().toISOString() },
    { id: '2', name: 'محمد علي', phone: '0123456790', createdAt: new Date().toISOString() },
    { id: '3', name: 'عبدالله أحمد', phone: '0123456791', createdAt: new Date().toISOString() },
    { id: '4', name: 'خالد محمود', phone: '0123456792', createdAt: new Date().toISOString() },
    { id: '5', name: 'يوسف إبراهيم', phone: '0123456793', createdAt: new Date().toISOString() },
  ]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTrips = localStorage.getItem('taxi-trips');
    const savedDrivers = localStorage.getItem('taxi-drivers');
    
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    }
    
    if (savedDrivers) {
      setDrivers(JSON.parse(savedDrivers));
    }
  }, []);

  // Save trips to localStorage whenever trips change
  useEffect(() => {
    localStorage.setItem('taxi-trips', JSON.stringify(trips));
  }, [trips]);

  // Save drivers to localStorage whenever drivers change
  useEffect(() => {
    localStorage.setItem('taxi-drivers', JSON.stringify(drivers));
  }, [drivers]);

  const addTrip = (trip: Omit<Trip, 'id' | 'createdAt'>) => {
    const newTrip: Trip = {
      ...trip,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTrips(prev => [...prev, newTrip]);
  };

  const updateTrip = (id: string, updatedTrip: Partial<Trip>) => {
    setTrips(prev => prev.map(trip => 
      trip.id === id ? { ...trip, ...updatedTrip } : trip
    ));
  };

  const deleteTrip = (id: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== id));
  };

  const addDriver = (driver: Omit<Driver, 'id' | 'createdAt'>) => {
    const newDriver: Driver = {
      ...driver,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setDrivers(prev => [...prev, newDriver]);
  };

  const updateDriver = (id: string, updatedDriver: Partial<Driver>) => {
    setDrivers(prev => prev.map(driver => 
      driver.id === id ? { ...driver, ...updatedDriver } : driver
    ));
  };

  const deleteDriver = (id: string) => {
    setDrivers(prev => prev.filter(driver => driver.id !== id));
  };

  const searchTrips = (query: string): Trip[] => {
    if (!query.trim()) return trips;
    
    const lowercaseQuery = query.toLowerCase();
    return trips.filter(trip => 
      trip.customerName.toLowerCase().includes(lowercaseQuery) ||
      trip.driverName.toLowerCase().includes(lowercaseQuery) ||
      trip.destination.toLowerCase().includes(lowercaseQuery) ||
      trip.customerPhone.includes(query) ||
      trip.notes.toLowerCase().includes(lowercaseQuery)
    );
  };

  return (
    <TaxiContext.Provider value={{
      trips,
      drivers,
      addTrip,
      updateTrip,
      deleteTrip,
      addDriver,
      updateDriver,
      deleteDriver,
      searchTrips,
    }}>
      {children}
    </TaxiContext.Provider>
  );
};

export const useTaxi = () => {
  const context = useContext(TaxiContext);
  if (context === undefined) {
    throw new Error('useTaxi must be used within a TaxiProvider');
  }
  return context;
};
