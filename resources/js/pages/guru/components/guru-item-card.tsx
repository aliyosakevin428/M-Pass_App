import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FC } from 'react';
import { Guru } from '@/types/guru';

type Props = {
  guru: Guru;
  className?: string;
};

const GuruItemCard: FC<Props> = ({ guru, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{ guru.name }</CardTitle>
        <CardDescription>
            ID: { guru.id }
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default GuruItemCard;
