import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Kelas } from '@/types/kelas';
import { FC } from 'react';

type Props = {
  kelas: Kelas;
};

const ShowKelas: FC<Props> = ({ kelas }) => {
  return (
    <AppLayout title="Detail Kelas" description="Detail kelas">
      <Card>
        <CardHeader>
          <CardTitle>{ kelas.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowKelas;
