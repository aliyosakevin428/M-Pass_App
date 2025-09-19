import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FC } from 'react';
import { Jurusan } from '@/types/jurusan';

type Props = {
  jurusan: Jurusan;
  className?: string;
};

const JurusanItemCard: FC<Props> = ({ jurusan, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{ jurusan.name }</CardTitle>
        <CardDescription>
            ID: { jurusan.id }
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default JurusanItemCard;
