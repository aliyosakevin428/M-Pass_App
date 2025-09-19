import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { Siswa } from '@/types/siswa';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Filter, Folder, FolderArchive, Image, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import SiswaBulkDeleteDialog from './components/siswa-bulk-delete-dialog';
import SiswaBulkEditSheet from './components/siswa-bulk-edit-sheet';
import SiswaDeleteDialog from './components/siswa-delete-dialog';
import SiswaFilterSheet from './components/siswa-filter-sheet';
import SiswaFormSheet from './components/siswa-form-sheet';
import SiswaUploadMediaSheet from './components/siswa-upload-sheet';

type Props = {
  siswas: Siswa[];
  query: { [key: string]: string };
};

const SiswaList: FC<Props> = ({ siswas, query }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  const { permissions } = usePage<SharedData>().props;

  return (
    <AppLayout
      title="Siswas"
      description="Manage your siswas"
      actions={
        <>
          {permissions?.canAdd && (
            <SiswaFormSheet purpose="create">
              <Button>
                <Plus />
                Create new siswa
              </Button>
            </SiswaFormSheet>
          )}
          <Button variant={'destructive'} size={'icon'} asChild>
            <Link href={route('siswa.archived')}>
              <FolderArchive />
            </Link>
          </Button>
        </>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search siswas..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <SiswaFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {Object.values(query).filter((val) => val && val !== '').length > 0 && (
              <Badge variant="secondary">{Object.values(query).filter((val) => val && val !== '').length}</Badge>
            )}
          </Button>
        </SiswaFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <SiswaBulkEditSheet siswaIds={ids}>
              <Button>
                <Edit /> Edit selected
              </Button>
            </SiswaBulkEditSheet>
            <SiswaBulkDeleteDialog siswaIds={ids}>
              <Button variant={'destructive'}>
                <Trash2 /> Delete selected
              </Button>
            </SiswaBulkDeleteDialog>
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
                    checked={ids.length === siswas.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(siswas.map((siswa) => siswa.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>No Telepon</TableHead>
            <TableHead>Jenis Kelamin</TableHead>
            <TableHead>Tanggal Lahir</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {siswas
            .filter((siswa) => JSON.stringify(siswa).toLowerCase().includes(cari.toLowerCase()))
            .map((siswa) => (
              <TableRow key={siswa.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(siswa.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, siswa.id]);
                          } else {
                            setIds(ids.filter((id) => id !== siswa.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{siswa.name}</TableCell>
                <TableCell>{siswa.email}</TableCell>
                <TableCell>{siswa.kelas.name}</TableCell>
                <TableCell>{siswa.no_telpon}</TableCell>
                <TableCell>{siswa.jenis_kelamin}</TableCell>
                <TableCell>{siswa.tanggal_lahir}</TableCell>
                <TableCell>{siswa.alamat}</TableCell>
                <TableCell>
                  {permissions?.canShow && (
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('siswa.show', siswa.id)}>
                        <Folder />
                      </Link>
                    </Button>
                  )}
                  {permissions?.canUpdate && (
                    <>
                      <SiswaUploadMediaSheet siswa={siswa}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Image />
                        </Button>
                      </SiswaUploadMediaSheet>
                      <SiswaFormSheet purpose="edit" siswa={siswa}>
                        <Button variant={'ghost'} size={'icon'}>
                          <Edit />
                        </Button>
                      </SiswaFormSheet>
                    </>
                  )}
                  {permissions?.canDelete && (
                    <SiswaDeleteDialog siswa={siswa}>
                      <Button variant={'ghost'} size={'icon'}>
                        <Trash2 />
                      </Button>
                    </SiswaDeleteDialog>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default SiswaList;
