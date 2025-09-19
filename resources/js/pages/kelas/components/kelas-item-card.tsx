import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FC } from 'react';
import { Kelas } from '@/types/kelas';

type Props = {
  kelas: Kelas;
  className?: string;
};

const KelasItemCard: FC<Props> = ({ kelas, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{ kelas.name }</CardTitle>
        <CardDescription>
            ID: { kelas.id }
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default KelasItemCard;
