import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { em } from '@/lib/utils';
import { Jurusan } from '@/types/jurusan';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft, Trash2, Undo2 } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';

type Props = {
  jurusans: Jurusan[];
};

const ArchivedJurusanList: FC<Props> = ({ jurusans }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const handleRestore = (id: Jurusan['id']) => {
    router.put(
      route('jurusan.restore', id),
      {},
      {
        preserveScroll: true,
        onSuccess: () => toast.success('Data berhasil di restore!'),
        onError: (e) => toast.error(em(e)),
      },
    );
  };

  const handleForceDelete = (id: Jurusan['id']) => {
    router.delete(route('jurusan.force-delete', id), {
      preserveScroll: true,
      onSuccess: () => toast.success('Data berhasil di hapus permanen!'),
      onError: (e) => toast.error(em(e)),
    });
  };

  return (
    <AppLayout
      title="Jurusans"
      description="Manage your jurusans"
      actions={
        <Button variant={'secondary'} asChild>
          <Link href={route('jurusan.index')}>
            <ArrowLeft />
            Kembali ke list
          </Link>
        </Button>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search jurusans..." value={cari} onChange={(e) => setCari(e.target.value)} />
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={ids.length === jurusans.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(jurusans.map((jurusan) => jurusan.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jurusans
            .filter((jurusan) => JSON.stringify(jurusan).toLowerCase().includes(cari.toLowerCase()))
            .map((jurusan) => (
              <TableRow key={jurusan.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(jurusan.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, jurusan.id]);
                          } else {
                            setIds(ids.filter((id) => id !== jurusan.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{jurusan.name}</TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} onClick={() => handleRestore(jurusan.id)}>
                    <Undo2 />
                  </Button>
                  <Button variant={'ghost'} size={'icon'} onClick={() => handleForceDelete(jurusan.id)}>
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default ArchivedJurusanList;