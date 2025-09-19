import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FC } from 'react';
import { Orangtua } from '@/types/orangtua';

type Props = {
  orangtua: Orangtua;
  className?: string;
};

const OrangtuaItemCard: FC<Props> = ({ orangtua, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{ orangtua.name }</CardTitle>
        <CardDescription>
            ID: { orangtua.id }
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default OrangtuaItemCard;
