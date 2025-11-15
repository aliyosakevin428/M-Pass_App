import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { LaporanNilai } from '@/types/laporan_nilai';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  laporan_nilaiIds: LaporanNilai['id'][];
};

const LaporanNilaiBulkEditSheet: FC<Props> = ({ children, laporan_nilaiIds }) => {
  const { data, put } = useForm({
    laporan_nilai_ids: laporan_nilaiIds,
  });

  const handleSubmit = () => {
    put(route('laporan_nilai.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('LaporanNilai updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah laporan_nilai</SheetTitle>
          <SheetDescription>Ubah data {data.laporan_nilai_ids.length} laporan_nilai</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan laporan_nilai
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

export default LaporanNilaiBulkEditSheet;
