'use client';

import { use } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, MapPin, Clock, Thermometer, Droplets, Wind, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { stations, generateHistoricalData, getAQILabel, getAQIBgColor, getAQIColor } from '@/lib/mockData';

export default async function StationDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;  
  const station = stations.find((s) => s.id === id);


  if (!station) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Station Non Trouvée</h1>
        <Link href="/dashboard">
          <Button>Retour au Dashboard</Button>
        </Link>
      </div>
    );
  }

  const historicalData = generateHistoricalData(station.id, 24);

  const handleExport = (format: 'json' | 'csv') => {
    const data = format === 'json' 
      ? JSON.stringify({ station, historicalData }, null, 2)
      : 'timestamp,temperature,humidity,pm25,pm10,aqi\n' + 
        historicalData.map(d => `${d.timestamp},${d.temperature},${d.humidity},${d.pm25},${d.pm10},${d.aqi}`).join('\n');
    
    const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `station-${station.id}-data.${format}`;
    a.click();
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold">{station.name}</h1>
            <div className="flex items-center text-muted-foreground mt-2">
              <MapPin className="h-4 w-4 mr-1" />
              {station.location.address}
            </div>
          </div>
        </div>
        <Badge className={`${getAQIBgColor(station.status)} text-white text-lg px-4 py-2`}>
          {getAQILabel(station.status)}
        </Badge>
      </div>

      {/* Current Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Thermometer className="h-4 w-4 mr-2 text-orange-500" />
              Température
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{station.metrics.temperature.toFixed(1)}°C</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Droplets className="h-4 w-4 mr-2 text-blue-500" />
              Humidité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{station.metrics.humidity}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Wind className="h-4 w-4 mr-2 text-purple-500" />
              PM2.5
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{station.metrics.pm25}</div>
            <p className="text-xs text-muted-foreground">µg/m³</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Wind className="h-4 w-4 mr-2 text-pink-500" />
              PM10
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{station.metrics.pm10}</div>
            <p className="text-xs text-muted-foreground">µg/m³</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2 text-emerald-500" />
              Indice AQI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold font-mono ${getAQIColor(station.status)}`}>
              {station.metrics.aqi}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Last Update */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              Dernière mise à jour : {new Date(station.lastUpdate).toLocaleString('fr-FR')}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleExport('json')}>
                <Download className="h-4 w-4 mr-2" />
                Export JSON
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <Tabs defaultValue="aqi" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="aqi">AQI</TabsTrigger>
          <TabsTrigger value="temperature">Température</TabsTrigger>
          <TabsTrigger value="humidity">Humidité</TabsTrigger>
          <TabsTrigger value="particles">Particules</TabsTrigger>
        </TabsList>

        <TabsContent value="aqi" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution de l&apos;Indice AQI (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(value) => new Date(value).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    stroke="#999"
                  />
                  <YAxis stroke="#999" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    labelFormatter={(value) => new Date(value).toLocaleString('fr-FR')}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="aqi" stroke="#10B981" strokeWidth={2} name="AQI" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="temperature" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution de la Température (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(value) => new Date(value).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    stroke="#999"
                  />
                  <YAxis stroke="#999" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    labelFormatter={(value) => new Date(value).toLocaleString('fr-FR')}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="temperature" stroke="#F97316" strokeWidth={2} name="Température (°C)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="humidity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution de l&apos;Humidité (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(value) => new Date(value).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    stroke="#999"
                  />
                  <YAxis stroke="#999" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    labelFormatter={(value) => new Date(value).toLocaleString('fr-FR')}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="humidity" stroke="#3B82F6" strokeWidth={2} name="Humidité (%)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="particles" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Particules Fines (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(value) => new Date(value).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    stroke="#999"
                  />
                  <YAxis stroke="#999" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                    labelFormatter={(value) => new Date(value).toLocaleString('fr-FR')}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="pm25" stroke="#A855F7" strokeWidth={2} name="PM2.5 (µg/m³)" />
                  <Line type="monotone" dataKey="pm10" stroke="#EC4899" strokeWidth={2} name="PM10 (µg/m³)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Station Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informations sur la Station</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Identifiant</p>
              <p className="font-mono">{station.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Statut</p>
              <Badge className={`${getAQIBgColor(station.status)} text-white`}>
                {getAQILabel(station.status)}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Coordonnées GPS</p>
              <p className="font-mono">{station.location.lat.toFixed(4)}, {station.location.lng.toFixed(4)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Adresse</p>
              <p>{station.location.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}