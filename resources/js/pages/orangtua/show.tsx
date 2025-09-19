import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Orangtua } from '@/types/orangtua';
import { FC } from 'react';

type Props = {
  orangtua: Orangtua;
};

const ShowOrangtua: FC<Props> = ({ orangtua }) => {
  return (
    <AppLayout title="Detail Orangtua" description="Detail orangtua">
      <Card>
        <CardHeader>
          <CardTitle>{ orangtua.name }</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, quo impedit cupiditate voluptas culpa magnam itaque distinctio at ullam,
            beatae perferendis doloremque facilis mollitia, quod corporis. Autem voluptatum ipsum placeat.
          </CardDescription>
        </CardHeader>
      </Card>
    </AppLayout>
  );
};

export default ShowOrangtua;
