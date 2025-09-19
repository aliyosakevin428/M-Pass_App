import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Siswa } from '@/types/siswa';
import { FC } from 'react';

type Props = {
  siswa: Siswa;
};

const ShowSiswa: FC<Props> = ({ siswa }) => {
  return (
    <AppLayout title="Detail Siswa" description="Detail siswa">
      <Card>
        <CardHeader>
          <CardTitle>{ siswa.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowSiswa;
