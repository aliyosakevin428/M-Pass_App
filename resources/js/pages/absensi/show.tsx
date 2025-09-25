import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Absensi } from '@/types/absensi';
import { FC } from 'react';

type Props = {
  absensi: Absensi;
};

const ShowAbsensi: FC<Props> = ({ absensi }) => {
  return (
    <AppLayout title="Detail Absensi" description="Detail absensi">
      <Card>
        <CardHeader>
          <CardTitle>{ absensi.siswa?.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowAbsensi;
