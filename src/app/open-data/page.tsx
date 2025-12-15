'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Code, Download, Book, Users, FileJson, FileSpreadsheet, Terminal } from 'lucide-react';

export default function OpenData() {
  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/stations',
      description: 'Liste de toutes les stations de surveillance',
      response: '200 OK',
    },
    {
      method: 'GET',
      path: '/api/stations/:id',
      description: 'Détails d\'une station spécifique',
      response: '200 OK',
    },
    {
      method: 'GET',
      path: '/api/stations/:id/data',
      description: 'Données historiques d\'une station',
      response: '200 OK',
    },
    {
      method: 'GET',
      path: '/api/alerts',
      description: 'Liste des alertes actives',
      response: '200 OK',
    },
  ];

  const datasets = [
    {
      name: 'Données Temps Réel',
      description: 'Mesures en temps réel de toutes les stations',
      format: 'JSON, CSV',
      size: '2.5 MB',
      updated: 'Il y a 5 minutes',
    },
    {
      name: 'Historique 30 Jours',
      description: 'Données agrégées sur les 30 derniers jours',
      format: 'JSON, CSV',
      size: '45 MB',
      updated: 'Quotidien',
    },
    {
      name: 'Historique Annuel',
      description: 'Archive complète de l\'année en cours',
      format: 'JSON, CSV',
      size: '520 MB',
      updated: 'Mensuel',
    },
  ];

  const codeExamples = {
    javascript: `// Exemple JavaScript avec Fetch API
fetch('https://api.airpublic.fr/api/stations')
  .then(response => response.json())
  .then(data => {
    console.log('Stations:', data);
    data.forEach(station => {
      console.log(\`\${station.name}: AQI \${station.metrics.aqi}\`);
    });
  })
  .catch(error => console.error('Erreur:', error));`,
    python: `# Exemple Python avec requests
import requests

response = requests.get('https://api.airpublic.fr/api/stations')
data = response.json()

for station in data:
    print(f"{station['name']}: AQI {station['metrics']['aqi']}")`,
    curl: `# Exemple cURL
curl -X GET https://api.airpublic.fr/api/stations \\
  -H "Accept: application/json"

# Avec paramètres
curl -X GET "https://api.airpublic.fr/api/stations/station-001/data?range=24h" \\
  -H "Accept: application/json"`,
  };

  const communityProjects = [
    {
      title: 'AirQuality Widget',
      author: 'Jean Dupont',
      description: 'Widget web personnalisable pour afficher la qualité de l\'air en temps réel',
      tech: ['React', 'TypeScript'],
    },
    {
      title: 'Mobile Alert App',
      author: 'Marie Martin',
      description: 'Application mobile pour recevoir des notifications d\'alertes',
      tech: ['React Native', 'Node.js'],
    },
    {
      title: 'Data Visualization Dashboard',
      author: 'Pierre Bernard',
      description: 'Tableau de bord avancé avec analyses prédictives',
      tech: ['Python', 'Plotly', 'ML'],
    },
  ];

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Open Data API</h1>
        <p className="text-xl text-muted-foreground">
          Accédez librement aux données environnementales pour créer vos propres applications
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <FileJson className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">4</div>
            <p className="text-sm text-muted-foreground">Endpoints API</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Download className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Jeux de Données</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Code className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Exemples de Code</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-amber-500" />
            <div className="text-2xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Projets Communauté</p>
          </CardContent>
        </Card>
      </div>

      {/* API Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Book className="h-5 w-5 mr-2" />
            Documentation API
          </CardTitle>
          <CardDescription>
            Endpoints RESTful pour accéder aux données en temps réel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiEndpoints.map((endpoint, index) => (
              <div key={index} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="font-mono">
                      {endpoint.method}
                    </Badge>
                    <code className="text-sm">{endpoint.path}</code>
                  </div>
                  <Badge variant="secondary">{endpoint.response}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{endpoint.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button className="gradient-blue text-white">
              <Terminal className="h-4 w-4 mr-2" />
              Documentation Complète
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="h-5 w-5 mr-2" />
            Exemples de Code
          </CardTitle>
          <CardDescription>
            Intégrez facilement l&apos;API dans vos projets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="javascript">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
            </TabsList>
            {Object.entries(codeExamples).map(([lang, code]) => (
              <TabsContent key={lang} value={lang} className="mt-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm">{code}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => navigator.clipboard.writeText(code)}
                  >
                    Copier
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Datasets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Jeux de Données
          </CardTitle>
          <CardDescription>
            Téléchargez les données brutes au format JSON ou CSV
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {datasets.map((dataset, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{dataset.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{dataset.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <FileJson className="h-4 w-4 mr-1" />
                      JSON
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileSpreadsheet className="h-4 w-4 mr-1" />
                      CSV
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Taille: {dataset.size}</span>
                  <span>•</span>
                  <span>Mis à jour: {dataset.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Projets de la Communauté
          </CardTitle>
          <CardDescription>
            Découvrez ce que d&apos;autres développeurs ont créé avec notre API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {communityProjects.map((project, index) => (
              <Card key={index} className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>Par {project.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline">Soumettre Votre Projet</Button>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-blue-500/10 border-blue-500/20">
        <CardContent className="py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Commencer ?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rejoignez notre communauté de développeurs et créez des applications innovantes avec nos données ouvertes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-blue text-white">
              <Terminal className="h-5 w-5 mr-2" />
              Commencer Maintenant
            </Button>
            <Button size="lg" variant="outline">
              <Book className="h-5 w-5 mr-2" />
              Lire la Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}