import { Alert } from '@/lib/mockData';
import { AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AlertBadgeProps {
  alert: Alert;
}

export default function AlertBadge({ alert }: AlertBadgeProps) {
  const getIcon = () => {
    switch (alert.severity) {
      case 'danger':
        return <AlertCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getColorClass = () => {
    switch (alert.severity) {
      case 'danger':
        return 'border-red-500/50 bg-red-500/10';
      case 'warning':
        return 'border-amber-500/50 bg-amber-500/10';
      default:
        return 'border-blue-500/50 bg-blue-500/10';
    }
  };

  const getTextColor = () => {
    switch (alert.severity) {
      case 'danger':
        return 'text-red-500';
      case 'warning':
        return 'text-amber-500';
      default:
        return 'text-blue-500';
    }
  };

  const getTypeLabel = () => {
    switch (alert.type) {
      case 'sanitaire':
        return 'Sanitaire';
      case 'technique':
        return 'Technique';
      case 'preventive':
        return 'Préventive';
      default:
        return 'Informative';
    }
  };

  return (
    <Card className={`${getColorClass()} border-2`}>
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <div className={getTextColor()}>{getIcon()}</div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{alert.title}</h3>
              {alert.resolved && (
                <Badge variant="outline" className="border-green-500 text-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Résolu
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{alert.message}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <Badge variant="secondary">{getTypeLabel()}</Badge>
              <span>{new Date(alert.timestamp).toLocaleString('fr-FR')}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}