import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Jurusan } from '@/types/jurusan';
import { FC } from 'react';

type Props = {
  jurusan: Jurusan;
};

const ShowJurusan: FC<Props> = ({ jurusan }) => {
  return (
    <AppLayout title="Detail Jurusan" description="Detail jurusan">
      <Card>
        <CardHeader>
          <CardTitle>{ jurusan.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowJurusan;
