
import React, { useState } from 'react';
import { useTaxi } from '../contexts/TaxiContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';

const SearchTrips: React.FC = () => {
  const { searchTrips } = useTaxi();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    const results = searchTrips(query);
    setSearchResults(results);
  };

  const clearSearch = () => {
    setQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gray-50">
        <CardTitle className="flex items-center space-x-2 space-x-reverse">
          <Search size={20} />
          <span>البحث في الرحلات</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex space-x-4 space-x-reverse mb-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="ابحث باسم الزبون، السائق، المكان، رقم الهاتف أو الملاحظات..."
            className="text-right flex-1"
          />
          <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
            <Search size={16} />
          </Button>
          {isSearching && (
            <Button onClick={clearSearch} variant="outline">
              <X size={16} />
            </Button>
          )}
        </div>

        {isSearching && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">نتائج البحث</h3>
              <Badge variant="secondary">
                {searchResults.length} نتيجة
              </Badge>
            </div>

            {searchResults.length === 0 ? (
              <p className="text-gray-500 text-center py-4">لم يتم العثور على نتائج</p>
            ) : (
              <div className="space-y-3">
                {searchResults.map((trip) => (
                  <div key={trip.id} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">الزبون:</span>
                        <p className="text-gray-800">{trip.customerName}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">السائق:</span>
                        <p className="text-gray-800">{trip.driverName}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">المكان:</span>
                        <p className="text-gray-800">{trip.destination}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">السعر:</span>
                        <p className="text-gray-800 font-bold">{trip.price} ريال</p>
                      </div>
                    </div>
                    {trip.notes && (
                      <div className="mt-2">
                        <span className="font-medium text-gray-600">ملاحظات:</span>
                        <p className="text-gray-800 mt-1">{trip.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchTrips;
