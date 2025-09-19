import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em, capitalizeWords } from '@/lib/utils';
import { FormPurpose, SharedData } from '@/types';
import { Kelas } from '@/types/kelas';
import { Siswa } from '@/types/siswa';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, use, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  siswa?: Siswa;
  purpose: FormPurpose;
};

const SiswaFormSheet: FC<Props> = ({ children, siswa, purpose }) => {
  const [open, setOpen] = useState(false);

  const { kelas = []} = usePage<SharedData & { kelas: Kelas[] }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    name: siswa?.name ?? '',
    alamat: siswa?.alamat ?? '',
    kelas_id: siswa?.kelas_id ?? '',
    no_telpon: siswa?.no_telpon ?? '',
    email: siswa?.email ?? '',
    tanggal_lahir: siswa?.tanggal_lahir ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('siswa.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Siswa created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('siswa.update', siswa?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Siswa updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data siswa</SheetTitle>
          <SheetDescription>Form untuk {purpose} data siswa</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama siswa">
              <Input type="text" placeholder="Nama siswa" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat Siswa">
              <Input type="text" placeholder="Alamat" value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} />
            </FormControl>
            <FormControl label="Kelas">
              <Select value={data.kelas_id.toString()} onValueChange={(e) => setData('kelas_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  {kelas.map((kelas) => (
                    <SelectItem key={kelas.id} value={kelas.id.toString()}>
                      {kelas.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormControl label="No Telpon">
              <Input type="text" placeholder="No Telpon" value={data.no_telpon} onChange={(e) => setData('no_telpon', e.target.value)} />
            </FormControl>
            <FormControl label="Email">
              <Input type="email" placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
            </FormControl>
            <FormControl label="Tanggal Lahir">
              <Input type="date" placeholder="Tanggal Lahir" value={data.tanggal_lahir} onChange={(e) => setData('tanggal_lahir', e.target.value)} />
            </FormControl>
            <FormControl label="Jenis Kelamin">
              <Select value={data.jenis_kelamin ?? ''} onValueChange={(value) => setData('jenis_kelamin', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} siswa`} loading={processing} disabled={processing} />
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

export default SiswaFormSheet;
