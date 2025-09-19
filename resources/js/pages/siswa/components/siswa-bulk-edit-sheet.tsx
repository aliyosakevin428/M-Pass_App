import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Siswa } from '@/types/siswa';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  siswaIds: Siswa['id'][];
};

const SiswaBulkEditSheet: FC<Props> = ({ children, siswaIds }) => {
  const { data, put } = useForm({
    siswa_ids: siswaIds,
  });

  const handleSubmit = () => {
    put(route('siswa.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Siswa updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah siswa</SheetTitle>
          <SheetDescription>Ubah data {data.siswa_ids.length} siswa</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan siswa
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

export default SiswaBulkEditSheet;
