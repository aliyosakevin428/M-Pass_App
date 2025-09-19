import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Jurusan } from '@/types/jurusan';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  jurusanIds: Jurusan['id'][];
};

const JurusanBulkEditSheet: FC<Props> = ({ children, jurusanIds }) => {
  const { data, put } = useForm({
    jurusan_ids: jurusanIds,
  });

  const handleSubmit = () => {
    put(route('jurusan.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Jurusan updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah jurusan</SheetTitle>
          <SheetDescription>Ubah data {data.jurusan_ids.length} jurusan</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan jurusan
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

export default JurusanBulkEditSheet;
