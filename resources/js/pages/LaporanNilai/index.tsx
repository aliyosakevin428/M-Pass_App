import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { LaporanNilai } from '@/types/laporan_nilai';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Image, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import LaporanNilaiFormSheet from './components/laporan_nilai-form-sheet';
import LaporanNilaiFilterSheet from './components/laporan_nilai-filter-sheet';
import LaporanNilaiBulkEditSheet from './components/laporan_nilai-bulk-edit-sheet';
import LaporanNilaiBulkDeleteDialog from './components/laporan_nilai-bulk-delete-dialog';
import LaporanNilaiDeleteDialog from './components/laporan_nilai-delete-dialog';

type Props = {
  laporan_nilais: LaporanNilai[];
  query: { [key: string]: string };
};

const LaporanNilaiList: FC<Props> = ({ laporan_nilais, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="LaporanNilais"
      description="Manage your laporan_nilais"
      actions={
        <>
          {permissions?.canAdd && (
            <LaporanNilaiFormSheet purpose="create">
              <Button>
                <Plus />
                Create new laporan_nilai
              </Button>
            </LaporanNilaiFormSheet>
          )}
          
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search laporan_nilais..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <LaporanNilaiFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </LaporanNilaiFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <LaporanNilaiBulkEditSheet laporan_nilaiIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </LaporanNilaiBulkEditSheet>
            <LaporanNilaiBulkDeleteDialog laporan_nilaiIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </LaporanNilaiBulkDeleteDialog>
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
                    checked={ids.length === laporan_nilais.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(laporan_nilais.map((laporan_nilai) => laporan_nilai.id));
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
          {laporan_nilais
            .filter((laporan_nilai) => JSON.stringify(laporan_nilai).toLowerCase().includes(cari.toLowerCase()))
            .map((laporan_nilai) => (
              <TableRow key={laporan_nilai.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(laporan_nilai.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, laporan_nilai.id]);
                          } else {
                            setIds(ids.filter((id) => id !== laporan_nilai.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{ laporan_nilai.name }</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('laporan_nilai.show', laporan_nilai.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>
                      
                      <LaporanNilaiFormSheet purpose="edit" laporan_nilai={laporan_nilai}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </LaporanNilaiFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <LaporanNilaiDeleteDialog laporan_nilai={laporan_nilai}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </LaporanNilaiDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default LaporanNilaiList;
