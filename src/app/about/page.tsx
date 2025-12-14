'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, TrendingUp, Database, Bell, Cpu, Server, Lock, Zap } from 'lucide-react';

export default function About() {
  const objectives = [
    {
      icon: Shield,
      title: 'Sécuriser',
      description: 'Protéger l\'intégrité et la confidentialité des données collectées',
      features: [
        'Authentification forte par signature cryptographique',
        'Chiffrement TLS point-à-point',
        'Validation en temps réel des signatures',
        'Logs de sécurité consultables',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Valoriser',
      description: 'Rendre les données compréhensibles et actionnables pour le public',
      features: [
        'Interface intuitive et auto-explicative',
        'Visualisations interactives et accessibles',
        'Indices de qualité simplifiés',
        'Informations sans expertise technique requise',
      ],
    },
    {
      icon: Database,
      title: 'Ouvrir',
      description: 'Publier les données dans un format réutilisable par tous',
      features: [
        'API REST bien documentée',
        'Formats standards (JSON, CSV)',
        'Données anonymisées et agrégées',
        'Licence Open Data',
      ],
    },
    {
      icon: Bell,
      title: 'Alerter',
      description: 'Prévenir en temps réel des situations à risque',
      features: [
        'Système d\'alertes automatiques',
        'Notifications multi-canaux',
        'Seuils personnalisables',
        'Détection d\'anomalies',
      ],
    },
  ];

  const techStack = [
    {
      category: 'Frontend',
      icon: Zap,
      technologies: [
        { name: 'React', description: 'Bibliothèque UI moderne' },
        { name: 'TypeScript', description: 'Typage statique' },
        { name: 'Tailwind CSS', description: 'Framework CSS utilitaire' },
        { name: 'Shadcn/UI', description: 'Composants UI cohérents' },
      ],
    },
    {
      category: 'Backend',
      icon: Server,
      technologies: [
        { name: 'Node.js', description: 'Runtime JavaScript' },
        { name: 'Express.js', description: 'Framework web' },
        { name: 'PostgreSQL', description: 'Base de données' },
        { name: 'Redis', description: 'Cache en mémoire' },
      ],
    },
    {
      category: 'IoT',
      icon: Cpu,
      technologies: [
        { name: 'ESP32', description: 'Microcontrôleur' },
        { name: 'Capteurs', description: 'Température, humidité, PM' },
        { name: 'MQTT', description: 'Protocol IoT' },
        { name: 'TLS', description: 'Sécurité des transmissions' },
      ],
    },
    {
      category: 'Sécurité',
      icon: Lock,
      technologies: [
        { name: 'HMAC', description: 'Signature des données' },
        { name: 'TLS/SSL', description: 'Chiffrement transport' },
        { name: 'RGPD', description: 'Conformité données' },
        { name: 'WAF', description: 'Protection web' },
      ],
    },
  ];

  return (
    <div className="container py-8 space-y-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">À Propos d&apos;AirPublic</h1>
        <p className="text-xl text-muted-foreground">
          Un projet hackathon innovant pour sécuriser et valoriser les données environnementales publiques
        </p>
      </div>

      {/* Vision */}
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent">
        <CardContent className="py-12">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-bold">Notre Vision</h2>
            <p className="text-lg text-muted-foreground">
              Transformer les données techniques en informations citoyennes utiles, tout en garantissant une sécurité maximale et une transparence totale.
            </p>
            <div className="flex justify-center items-center space-x-2 pt-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Hackathon 2025
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                Données Publiques
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Objectives */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Objectifs Stratégiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {objectives.map((objective, index) => {
            const Icon = objective.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-lg gradient-blue flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{objective.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{objective.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {objective.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <span className="text-emerald-500 mt-1">✓</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Architecture */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Architecture Technique</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((stack, index) => {
            const Icon = stack.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{stack.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {stack.technologies.map((tech, idx) => (
                      <li key={idx}>
                        <div className="font-semibold text-sm">{tech.name}</div>
                        <div className="text-xs text-muted-foreground">{tech.description}</div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Data Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Flux de Données</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="h-16 w-16 rounded-full gradient-green mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="font-semibold">Collecte</h3>
              <p className="text-sm text-muted-foreground">
                Stations IoT mesurent l&apos;environnement et signent les données
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-16 w-16 rounded-full gradient-blue mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="font-semibold">Traitement</h3>
              <p className="text-sm text-muted-foreground">
                Agrégation, analyse et calcul des indices de qualité
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-16 w-16 rounded-full gradient-orange mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="font-semibold">Diffusion</h3>
              <p className="text-sm text-muted-foreground">
                Publication des données via dashboard et API Open Data
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="h-16 w-16 rounded-full gradient-red mx-auto flex items-center justify-center">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="font-semibold">Alertes</h3>
              <p className="text-sm text-muted-foreground">
                Notifications en temps réel des situations à risque
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Image */}
      <Card className="overflow-hidden">
        <div className="relative h-96">
          <img
            src="/assets/data-visualization-bg.jpg"
            alt="Data Visualization"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Innovation & Transparence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un système complet de surveillance environnementale au service des citoyens
            </p>
          </div>
        </div>
      </Card>

      {/* Hackathon Info */}
      <Card className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/20">
        <CardContent className="py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Projet Hackathon 2025</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            &quot;Sécuriser et Valoriser le Potentiel de Nos Données Publiques&quot;
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="text-sm px-3 py-1">Open Source</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">Open Data</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">IoT</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">Sécurité</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">Environnement</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}