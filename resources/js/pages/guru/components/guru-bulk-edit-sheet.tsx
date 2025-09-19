import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Guru } from '@/types/guru';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  guruIds: Guru['id'][];
};

const GuruBulkEditSheet: FC<Props> = ({ children, guruIds }) => {
  const { data, put } = useForm({
    guru_ids: guruIds,
  });

  const handleSubmit = () => {
    put(route('guru.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Guru updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah guru</SheetTitle>
          <SheetDescription>Ubah data {data.guru_ids.length} guru</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan guru
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X /> Batalin
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default GuruBulkEditSheet;
