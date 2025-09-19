import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Guru } from '@/types/guru';
import { FC } from 'react';

type Props = {
  guru: Guru;
};

const ShowGuru: FC<Props> = ({ guru }) => {
  return (
    <AppLayout title="Detail Guru" description="Detail guru">
      <Card>
        <CardHeader>
          <CardTitle>{ guru.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowGuru;
