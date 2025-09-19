import FormControl from '@/components/form-control';
import SubmitButton from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { capitalizeWords, em } from '@/lib/utils';
import { FormPurpose, SharedData } from '@/types';
import { Orangtua } from '@/types/orangtua';
import { Siswa } from '@/types/siswa';
import { useForm, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  orangtua?: Orangtua;
  purpose: FormPurpose;
};

const OrangtuaFormSheet: FC<Props> = ({ children, orangtua, purpose }) => {
  const [open, setOpen] = useState(false);

  const { siswas = [] } = usePage<SharedData & { siswas: Siswa[] }>().props;

  const { data, setData, put, post, reset, processing } = useForm({
    name: orangtua?.name ?? '',
    no_telpon: orangtua?.no_telpon ?? '',
    siswa_id: orangtua?.siswa_id ?? '',
  });

  const handleSubmit = () => {
    if (purpose === 'create' || purpose === 'duplicate') {
      post(route('orangtua.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Orangtua created successfully');
          reset();
          setOpen(false);
        },
        onError: (e) => toast.error(em(e)),
      });
    } else {
      put(route('orangtua.update', orangtua?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Orangtua updated successfully');
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
          <SheetTitle>{capitalizeWords(purpose)} data orangtua</SheetTitle>
          <SheetDescription>Form untuk {purpose} data orangtua</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-y-auto">
          <form
            className="space-y-6 px-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl label="Nama orangtua">
              <Input type="text" placeholder="Nama orangtua" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>

            <FormControl label="No HP">
              <Input type="text" placeholder="No HP" value={data.no_telpon} onChange={(e) => setData('no_telpon', e.target.value)} />
            </FormControl>

            <FormControl label="Murid yang didiki">
              <Select value={data.siswa_id.toString()} onValueChange={(e) => setData('siswa_id', e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Murid" />
                </SelectTrigger>
                <SelectContent>
                  {siswas.map((siswa) => (
                    <SelectItem key={siswa.id} value={siswa.id.toString()}>
                      {siswa.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </form>
        </ScrollArea>
        <SheetFooter>
          <SubmitButton onClick={handleSubmit} label={`${capitalizeWords(purpose)} orangtua`} loading={processing} disabled={processing} />
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

export default OrangtuaFormSheet;
