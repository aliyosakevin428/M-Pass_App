import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Kelas } from '@/types/kelas';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  kelasIds: Kelas['id'][];
};

const KelasBulkEditSheet: FC<Props> = ({ children, kelasIds }) => {
  const { data, put } = useForm({
    kelas_ids: kelasIds,
  });

  const handleSubmit = () => {
    put(route('kelas.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Kelas updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah kelas</SheetTitle>
          <SheetDescription>Ubah data {data.kelas_ids.length} kelas</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan kelas
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

export default KelasBulkEditSheet;
