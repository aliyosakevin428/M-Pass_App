import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FC } from 'react';
import { LaporanNilai } from '@/types/laporan_nilai';

type Props = {
  laporan_nilai: LaporanNilai;
  className?: string;
};

const LaporanNilaiItemCard: FC<Props> = ({ laporan_nilai, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{ laporan_nilai.name }</CardTitle>
        <CardDescription>
            ID: { laporan_nilai.id }
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default LaporanNilaiItemCard;
