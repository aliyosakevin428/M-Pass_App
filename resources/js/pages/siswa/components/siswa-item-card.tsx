import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FC } from 'react';
import { Siswa } from '@/types/siswa';

type Props = {
  siswa: Siswa;
  className?: string;
};

const SiswaItemCard: FC<Props> = ({ siswa, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{ siswa.name }</CardTitle>
        <CardDescription>
            ID: { siswa.id }
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default SiswaItemCard;
