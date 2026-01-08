import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { LaporanNilai } from '@/types/laporan_nilai';
import { FC } from 'react';

type Props = {
  laporan_nilai: LaporanNilai;
};

const ShowLaporanNilai: FC<Props> = ({ laporan_nilai }) => {
  return (
    <AppLayout title="Detail LaporanNilai" description="Detail laporan_nilai">
      <Card>
        <CardHeader>
          <CardTitle>{ laporan_nilai.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowLaporanNilai;
