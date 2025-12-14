export interface Station {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'excellent' | 'good' | 'moderate' | 'poor' | 'dangerous' | 'offline';
  lastUpdate: string;
  metrics: {
    temperature: number;
    humidity: number;
    pm25: number;
    pm10: number;
    aqi: number;
  };
}

export interface Alert {
  id: string;
  type: 'sanitaire' | 'technique' | 'preventive' | 'informative';
  severity: 'info' | 'warning' | 'danger';
  title: string;
  message: string;
  stationId: string;
  timestamp: string;
  resolved: boolean;
}

export interface HistoricalData {
  timestamp: string;
  temperature: number;
  humidity: number;
  pm25: number;
  pm10: number;
  aqi: number;
}

// Mock stations data
export const stations: Station[] = [
 {
  id: 'station-001',
  name: 'Plateau – Centre Administratif',
  location: {
    lat: 5.3235,
    lng: -4.0266,
    address: 'Plateau, Abidjan',
  },
  status: 'good',
  lastUpdate: new Date().toISOString(),
  metrics: {
    temperature: 29.4,
    humidity: 78,
    pm25: 18,
    pm10: 32,
    aqi: 62,
  },
},
{
  id: 'station-002',
  name: 'Cocody – Riviera',
  location: {
    lat: 5.3600,
    lng: -3.9800,
    address: 'Riviera, Cocody, Abidjan',
  },
  status: 'excellent',
  lastUpdate: new Date(Date.now() - 5 * 60000).toISOString(),
  metrics: {
    temperature: 28.6,
    humidity: 80,
    pm25: 10,
    pm10: 20,
    aqi: 45,
  },
},
{
  id: 'station-003',
  name: 'Yopougon Industriel',
  location: {
    lat: 5.3380,
    lng: -4.0963,
    address: 'Zone industrielle, Yopougon',
  },
  status: 'moderate',
  lastUpdate: new Date(Date.now() - 10 * 60000).toISOString(),
  metrics: {
    temperature: 30.8,
    humidity: 74,
    pm25: 38,
    pm10: 60,
    aqi: 82,
  },
},
{
  id: 'station-004',
  name: 'Port Autonome d’Abidjan',
  location: {
    lat: 5.3020,
    lng: -4.0120,
    address: 'Port Autonome, Treichville',
  },
  status: 'poor',
  lastUpdate: new Date(Date.now() - 3 * 60000).toISOString(),
  metrics: {
    temperature: 31.2,
    humidity: 72,
    pm25: 72,
    pm10: 110,
    aqi: 135,
  },
},
{
  id: 'station-005',
  name: 'Adjamé – Grand Marché',
  location: {
    lat: 5.3530,
    lng: -4.0225,
    address: 'Adjamé, Abidjan',
  },
  status: 'dangerous',
  lastUpdate: new Date(Date.now() - 2 * 60000).toISOString(),
  metrics: {
    temperature: 32.0,
    humidity: 70,
    pm25: 140,
    pm10: 190,
    aqi: 190,
  },
},
{
  id: 'station-006',
  name: 'Parc National du Banco',
  location: {
    lat: 5.3750,
    lng: -4.0700,
    address: 'Parc National du Banco, Abidjan',
  },
  status: 'excellent',
  lastUpdate: new Date(Date.now() - 1 * 60000).toISOString(),
  metrics: {
    temperature: 27.5,
    humidity: 85,
    pm25: 6,
    pm10: 14,
    aqi: 40,
  },
},
];

// Mock alerts data
export const alerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'sanitaire',
    severity: 'danger',
    title: 'Qualité de l\'air dangereuse',
    message: 'Les niveaux de particules fines (PM2.5) ont dépassé le seuil critique à la station Boulevard Périphérique Sud. Évitez les activités extérieures prolongées.',
    stationId: 'station-005',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    resolved: false,
  },
  {
    id: 'alert-002',
    type: 'preventive',
    severity: 'warning',
    title: 'Tendance inquiétante détectée',
    message: 'La qualité de l\'air se dégrade progressivement dans la Zone Industrielle Nord. Surveillance renforcée activée.',
    stationId: 'station-004',
    timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    resolved: false,
  },
  {
    id: 'alert-003',
    type: 'technique',
    severity: 'warning',
    title: 'Données aberrantes détectées',
    message: 'Le capteur d\'humidité de la station Place de la République présente des valeurs inhabituelles. Vérification en cours.',
    stationId: 'station-002',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    resolved: true,
  },
  {
    id: 'alert-004',
    type: 'informative',
    severity: 'info',
    title: 'Rapport hebdomadaire disponible',
    message: 'Le rapport de qualité de l\'air de la semaine dernière est maintenant disponible en téléchargement.',
    stationId: 'all',
    timestamp: new Date(Date.now() - 24 * 3600000).toISOString(),
    resolved: false,
  },
];

// Generate historical data for charts
export const generateHistoricalData = (stationId: string, hours: number = 24): HistoricalData[] => {
  const station = stations.find((s) => s.id === stationId);
  if (!station) return [];

  const data: HistoricalData[] = [];
  const now = Date.now();

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now - i * 3600000).toISOString();
    const variance = Math.random() * 0.2 - 0.1; // ±10% variance

    data.push({
      timestamp,
      temperature: station.metrics.temperature * (1 + variance),
      humidity: station.metrics.humidity * (1 + variance),
      pm25: Math.max(0, station.metrics.pm25 * (1 + variance * 2)),
      pm10: Math.max(0, station.metrics.pm10 * (1 + variance * 2)),
      aqi: Math.max(0, station.metrics.aqi * (1 + variance * 1.5)),
    });
  }

  return data;
};

// AQI calculation and status
export const getAQIStatus = (aqi: number): Station['status'] => {
  if (aqi <= 50) return 'excellent';
  if (aqi <= 100) return 'good';
  if (aqi <= 150) return 'moderate';
  if (aqi <= 200) return 'poor';
  return 'dangerous';
};

export const getAQIColor = (status: Station['status']): string => {
  switch (status) {
    case 'excellent':
      return 'text-emerald-500';
    case 'good':
      return 'text-green-500';
    case 'moderate':
      return 'text-amber-500';
    case 'poor':
      return 'text-orange-500';
    case 'dangerous':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export const getAQIBgColor = (status: Station['status']): string => {
  switch (status) {
    case 'excellent':
      return 'bg-emerald-500';
    case 'good':
      return 'bg-green-500';
    case 'moderate':
      return 'bg-amber-500';
    case 'poor':
      return 'bg-orange-500';
    case 'dangerous':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export const getAQILabel = (status: Station['status']): string => {
  switch (status) {
    case 'excellent':
      return 'Excellent';
    case 'good':
      return 'Bon';
    case 'moderate':
      return 'Moyen';
    case 'poor':
      return 'Mauvais';
    case 'dangerous':
      return 'Dangereux';
    default:
      return 'Hors ligne';
  }
};