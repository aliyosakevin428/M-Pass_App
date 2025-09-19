import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Kelas } from '@/types/kelas';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Image, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import KelasDeleteDialog from './components/kelas-delete-dialog';
import KelasFilterSheet from './components/kelas-filter-sheet';
import KelasFormSheet from './components/kelas-form-sheet';
import KelasBulkEditSheet from './components/kelas-bulk-edit-sheet';
import KelasBulkDeleteDialog from './components/kelas-bulk-delete-dialog';
import KelasUploadMediaSheet from './components/kelas-upload-sheet';

type Props = {
  kelas: Kelas[];
  query: { [key: string]: string };
};

const KelasList: FC<Props> = ({ kelas, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Kelass"
      description="Manage your kelas"
      actions={
        <>
          {permissions?.canAdd && (
            <KelasFormSheet purpose="create">
              <Button>
                <Plus />
                Create new kelas
              </Button>
            </KelasFormSheet>
          )}
          <Button variant={'destructive'} size={'icon'} asChild>
    <Link href={route('kelas.archived')}>
        <FolderArchive />
    </Link>
</Button>
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search kelas..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <KelasFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </KelasFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <KelasBulkEditSheet kelasIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </KelasBulkEditSheet>
            <KelasBulkDeleteDialog kelasIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </KelasBulkDeleteDialog>
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
                    checked={ids.length === kelas.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(kelas.map((kelas) => kelas.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Walikelas</TableHead>
            <TableHead>Jurusan</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kelas
            .filter((kelas) => JSON.stringify(kelas).toLowerCase().includes(cari.toLowerCase()))
            .map((kelas) => (
              <TableRow key={kelas.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(kelas.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, kelas.id]);
                          } else {
                            setIds(ids.filter((id) => id !== kelas.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{ kelas.name }</TableCell>
                <TableCell>{ kelas.guru.name }</TableCell>
                <TableCell>{ kelas.jurusan?.name }</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('kelas.show', kelas.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>

                      <KelasFormSheet purpose="edit" kelas={kelas}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </KelasFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <KelasDeleteDialog kelas={kelas}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </KelasDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default KelasList;
