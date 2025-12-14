'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Thermometer, Droplets, Wind } from 'lucide-react';
import { Station, getAQILabel, getAQIBgColor } from '@/lib/mockData';
import Link  from '@/components/SafeLink';

interface StationCardProps {
  station: Station;
}

export default function StationCard({ station }: StationCardProps) {
  return (
    <Link href={`/station/${station.id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{station.name}</CardTitle>
            <Badge className={`${getAQIBgColor(station.status)} text-white`}>
              {getAQILabel(station.status)}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <MapPin className="h-4 w-4 mr-1" />
            {station.location.address}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Température</p>
                <p className="font-mono font-semibold">{station.metrics.temperature.toFixed(1)}°C</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Humidité</p>
                <p className="font-mono font-semibold">{station.metrics.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">PM2.5</p>
                <p className="font-mono font-semibold">{station.metrics.pm25} µg/m³</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="h-4 w-4 text-pink-500" />
              <div>
                <p className="text-xs text-muted-foreground">AQI</p>
                <p className="font-mono font-semibold">{station.metrics.aqi}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            Dernière mise à jour : {new Date(station.lastUpdate).toLocaleTimeString('fr-FR')}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}