import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose } from '@/types';
import { Absensi } from '@/types/absensi';
import { Siswa } from '@/types/siswa';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  absensi?: Absensi;
  purpose: FormPurpose;
};

const AbsensiFormSheet: FC<Props> = ({ children, absensi, purpose }) => {
  const [open, setOpen] = useState(false);

  const { siswa = [] } = usePage<{ siswa: Siswa[] }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    siswa_id: absensi?.siswa_id?.toString() ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('absensi.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Absensi created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('absensi.update', absensi?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Absensi updated successfully');
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{capitalizeWords(purpose)} data absensi</SheetTitle>
          <SheetDescription>Form untuk {purpose} data absensi</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama Siswa">
              <Select value={data.siswa_id?.toString() || ''} onValueChange={(value) => setData('siswa_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Siswa" />
                </SelectTrigger>
                <SelectContent>
                  {siswa && Array.isArray(siswa) ? (
                    siswa.map((siswas) => (
                      <SelectItem key={siswas.id} value={siswas.id.toString()}>
                        {siswas.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      {!siswa ? 'Loading...' : 'Tidak ada data siswa'}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} absensi`} loading={processing} disabled={processing} />
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

export default AbsensiFormSheet;
