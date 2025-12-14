'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AlertBadge from '@/components/AlertBadge';
import { alerts, Alert } from '@/lib/mockData';
import { AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';

export default function Alerts() {
  const [filter, setFilter] = useState<'all' | Alert['type']>('all');

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === filter);

  const activeAlerts = alerts.filter(a => !a.resolved);
  const resolvedAlerts = alerts.filter(a => a.resolved);

  const severityCounts = {
    danger: alerts.filter(a => a.severity === 'danger' && !a.resolved).length,
    warning: alerts.filter(a => a.severity === 'warning' && !a.resolved).length,
    info: alerts.filter(a => a.severity === 'info' && !a.resolved).length,
  };

  const typeCounts = {
    sanitaire: alerts.filter(a => a.type === 'sanitaire').length,
    technique: alerts.filter(a => a.type === 'technique').length,
    preventive: alerts.filter(a => a.type === 'preventive').length,
    informative: alerts.filter(a => a.type === 'informative').length,
  };

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Système d&apos;Alertes</h1>
        <p className="text-muted-foreground">
          Surveillance en temps réel des situations nécessitant une attention
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-red-500/20 bg-gradient-to-br from-red-500/10 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes Critiques</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{severityCounts.danger}</div>
            <p className="text-xs text-muted-foreground mt-1">Nécessitent une action immédiate</p>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avertissements</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{severityCounts.warning}</div>
            <p className="text-xs text-muted-foreground mt-1">Surveillance renforcée</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Informations</CardTitle>
            <Info className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">{severityCounts.info}</div>
            <p className="text-xs text-muted-foreground mt-1">Notifications générales</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert Types */}
      <Card>
        <CardHeader>
          <CardTitle>Types d&apos;Alertes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-red-500">{typeCounts.sanitaire}</div>
              <p className="text-sm text-muted-foreground mt-1">Sanitaires</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-amber-500">{typeCounts.technique}</div>
              <p className="text-sm text-muted-foreground mt-1">Techniques</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-orange-500">{typeCounts.preventive}</div>
              <p className="text-sm text-muted-foreground mt-1">Préventives</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold font-mono text-blue-500">{typeCounts.informative}</div>
              <p className="text-sm text-muted-foreground mt-1">Informatives</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="grid w-full max-w-2xl grid-cols-5">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="sanitaire">Sanitaires</TabsTrigger>
          <TabsTrigger value="technique">Techniques</TabsTrigger>
          <TabsTrigger value="preventive">Préventives</TabsTrigger>
          <TabsTrigger value="informative">Informatives</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Active Alerts */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <h2 className="text-2xl font-bold">Alertes Actives</h2>
          <Badge variant="destructive">{activeAlerts.length}</Badge>
        </div>
        {activeAlerts.length > 0 ? (
          <div className="space-y-4">
            {activeAlerts
              .filter(alert => filter === 'all' || alert.type === filter)
              .map((alert) => (
                <AlertBadge key={alert.id} alert={alert} />
              ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-emerald-500" />
              <p className="text-muted-foreground">Aucune alerte active pour le moment</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-2xl font-bold">Alertes Résolues</h2>
            <Badge variant="secondary">{resolvedAlerts.length}</Badge>
          </div>
          <div className="space-y-4 opacity-60">
            {resolvedAlerts
              .filter(alert => filter === 'all' || alert.type === filter)
              .map((alert) => (
                <AlertBadge key={alert.id} alert={alert} />
              ))}
          </div>
        </div>
      )}

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border-blue-500/20">
        <CardContent className="py-8">
          <div className="flex items-start space-x-4">
            <Info className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">À propos du Système d&apos;Alertes</h3>
              <p className="text-sm text-muted-foreground">
                Notre système surveille en continu la qualité de l&apos;air et génère automatiquement des alertes lorsque des seuils critiques sont dépassés ou que des anomalies sont détectées. Les alertes sanitaires concernent la santé publique, les alertes techniques signalent des problèmes de capteurs, les alertes préventives indiquent des tendances inquiétantes, et les alertes informatives fournissent des mises à jour générales.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}