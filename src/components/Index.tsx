'use client';
import  Link  from '@/components/SafeLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, TrendingUp, Database, Bell, ArrowRight, Activity, MapPin } from 'lucide-react';
import StationCard from '@/components/StationCard';
import { stations } from '@/lib/mockData';

export default function Index() {
  const featuredStations = stations.slice(0, 3);
  const totalStations = stations.length;
  const activeAlerts = 2;
  const dataPoints = 1250000;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero-environmental-monitoring.jpg"
            alt="Environmental Monitoring"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>

        <div className="container relative z-10 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 bg-clip-text text-transparent">
              AirPublic
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Système de Surveillance Environnementale Sécurisée
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transformer les données techniques en informations citoyennes utiles, tout en garantissant une sécurité maximale et une transparence totale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="gradient-blue text-white">
                  Voir le Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/open-data">
                <Button size="lg" variant="outline">
                  Explorer les Données
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Stations Actives</p>
                  <p className="text-4xl font-bold font-mono mt-2">{totalStations}</p>
                </div>
                <MapPin className="h-12 w-12 text-blue-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Points de Données</p>
                  <p className="text-4xl font-bold font-mono mt-2">{dataPoints.toLocaleString()}</p>
                </div>
                <Activity className="h-12 w-12 text-emerald-500 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Alertes Actives</p>
                  <p className="text-4xl font-bold font-mono mt-2">{activeAlerts}</p>
                </div>
                <Bell className="h-12 w-12 text-amber-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Objectifs Stratégiques</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Quatre piliers pour une surveillance environnementale efficace et transparente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg gradient-blue flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Sécuriser</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Protéger l&apos;intégrité et la confidentialité des données collectées avec des protocoles de sécurité avancés.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg gradient-green flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Valoriser</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Rendre les données compréhensibles et actionnables pour le grand public sans expertise technique.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg gradient-orange flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Ouvrir</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Publier les données dans un format réutilisable par tous, favorisant l&apos;innovation et la transparence.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg gradient-red flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Alerter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Prévenir en temps réel des situations à risque pour protéger la santé publique.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Stations */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Stations en Vedette</h2>
            <p className="text-muted-foreground">Surveillance en temps réel de la qualité de l&apos;air</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">
              Voir Toutes les Stations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStations.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <Card className="bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-blue-500/10 border-blue-500/20">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à Explorer les Données ?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Accédez à notre API Open Data, consultez la documentation complète et rejoignez notre communauté de développeurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/open-data">
                <Button size="lg" className="gradient-blue text-white">
                  Accéder à l&apos;API
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  En Savoir Plus
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}