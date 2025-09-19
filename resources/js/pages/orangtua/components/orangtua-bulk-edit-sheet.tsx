import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { em } from '@/lib/utils';
import { Orangtua } from '@/types/orangtua';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  orangtuaIds: Orangtua['id'][];
};

const OrangtuaBulkEditSheet: FC<Props> = ({ children, orangtuaIds }) => {
  const { data, put } = useForm({
    orangtua_ids: orangtuaIds,
  });

  const handleSubmit = () => {
    put(route('orangtua.bulk.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Orangtua updated successfully');
      },
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ubah orangtua</SheetTitle>
          <SheetDescription>Ubah data {data.orangtua_ids.length} orangtua</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button type="submit" onClick={handleSubmit}>
            <Check /> Simpan orangtua
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

export default OrangtuaBulkEditSheet;
