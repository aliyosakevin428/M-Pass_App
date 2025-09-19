import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose, SharedData } from '@/types';
import { Guru } from '@/types/guru';
import { Jurusan } from '@/types/jurusan';
import { Kelas } from '@/types/kelas';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  kelas?: Kelas;
  purpose: FormPurpose;
};

const KelasFormSheet: FC<Props> = ({ children, kelas, purpose }) => {
  const [open, setOpen] = useState(false);

  const { gurus = [], jurusans = [] } = usePage<SharedData & { gurus: Guru[]; jurusans: Jurusan[] }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    name: kelas?.name ?? '',
    guru_id: kelas?.guru_id ?? '',
    jurusan_id: kelas?.jurusan_id ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('kelas.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Kelas created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('kelas.update', kelas?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Kelas updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data kelas</SheetTitle>
          <SheetDescription>Form untuk {purpose} data kelas</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama kelas">
              <Input type="text" placeholder="Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Guru">
              <Select value={data.guru_id.toString()} onValueChange={(e) => setData('guru_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih guru" />
                </SelectTrigger>
                <SelectContent>
                  {gurus.map((guru) => (
                    <SelectItem key={guru.id} value={guru.id.toString()}>
                      {guru.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="Jurusan">
              <Select value={data.jurusan_id.toString()} onValueChange={(e) => setData('jurusan_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jurusan" />
                </SelectTrigger>
                <SelectContent>
                  {jurusans.map((jurusan) => (
                    <SelectItem key={jurusan.id} value={jurusan.id.toString()}>
                      {jurusan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} kelas`} loading={processing} disabled={processing} />
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

export default KelasFormSheet;
