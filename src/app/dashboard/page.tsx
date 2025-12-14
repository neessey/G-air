'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import StationCard from '@/components/StationCard';
import AlertBadge from '@/components/AlertBadge';
import { stations, alerts, getAQILabel, getAQIBgColor } from '@/lib/mockData';
import { Activity, Thermometer, Droplets, Wind, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('24h');

  const activeAlerts = alerts.filter((a) => !a.resolved);
  const avgTemp = stations.reduce((acc, s) => acc + s.metrics.temperature, 0) / stations.length;
  const avgHumidity = stations.reduce((acc, s) => acc + s.metrics.humidity, 0) / stations.length;
  const avgAQI = stations.reduce((acc, s) => acc + s.metrics.aqi, 0) / stations.length;

  const statusCounts = stations.reduce((acc, station) => {
    acc[station.status] = (acc[station.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard de Surveillance</h1>
        <p className="text-muted-foreground">
          Visualisation en temps réel de la qualité de l&apos;air dans les espaces publics
        </p>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Température Moyenne</CardTitle>
            <Thermometer className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{avgTemp.toFixed(1)}°C</div>
            <p className="text-xs text-muted-foreground mt-1">Toutes les stations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Humidité Moyenne</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{avgHumidity.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Toutes les stations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indice AQI Moyen</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{avgAQI.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground mt-1">Qualité de l&apos;air globale</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes Actives</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{activeAlerts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Nécessitent une attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>État Global de la Qualité de l&apos;Air</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center space-x-2">
                <Badge className={`${getAQIBgColor(status as any)} text-white`}>
                  {getAQILabel(status as any)}
                </Badge>
                <span className="text-2xl font-bold font-mono">{count}</span>
                <span className="text-sm text-muted-foreground">
                  {count === 1 ? 'station' : 'stations'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Time Range Selector */}
      <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="24h">24 Heures</TabsTrigger>
          <TabsTrigger value="7d">7 Jours</TabsTrigger>
          <TabsTrigger value="30d">30 Jours</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Carte Interactive des Stations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 rounded-lg overflow-hidden bg-muted">
            <img
              src="/assets/city-map-aerial.jpg"
              alt="Carte des stations"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Wind className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">
                  Carte interactive avec {stations.length} stations de surveillance
                </p>
                <p className="text-sm text-muted-foreground">
                  Cliquez sur une station ci-dessous pour voir les détails
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Alertes Actives</h2>
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <AlertBadge key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      )}

      {/* Stations Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Toutes les Stations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </div>
    </div>
  );
}